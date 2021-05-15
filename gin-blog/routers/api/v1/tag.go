package v1

import (
	"gin-blog/models"
	"gin-blog/pkg/app"
	"gin-blog/pkg/e"
	"gin-blog/pkg/setting"
	"gin-blog/pkg/util"
	"net/http"

	"github.com/astaxie/beego/validation"

	"github.com/gin-gonic/gin"
	"github.com/unknwon/com"
)

func GetTags(c *gin.Context) {
	g := app.Gin{c}
	name := c.Query("name")

	maps := make(map[string]interface{})
	data := make(map[string]interface{})

	if name != "" {
		maps["name"] = name
	}
	var state int = -1
	if arg := c.Query("state"); arg != "" {
		state = com.StrTo(arg).MustInt()
		maps["state"] = state
	}

	data["lists"] = models.GetTags(util.GetPage(c), setting.AppSetting.PageSize, maps)
	data["total"] = models.GetTagTotal(maps)
	g.Response(http.StatusOK, data)
}

func AddTag(c *gin.Context) {
	g := app.Gin{c}
	name := c.Query("name")
	state := com.StrTo(c.DefaultQuery("state", "0")).MustInt()
	createdBy := c.Query("createdBy")

	valid := validation.Validation{}
	valid.Required(name, "name").Message("名称不能为空")
	valid.MaxSize(name, 15, "nameMax")
	valid.Required(createdBy, "createdBy").Message("创建人不能为空")
	valid.MaxSize(createdBy, 100, "createdBy").Message(("创建人最长为100字符"))
	valid.Range(state, 0, 1, "state").Message("状态只允许0或1")

	if valid.HasErrors() {
		app.MakeErrors(valid.Errors)
	}
	if !models.ExistTagByName(name) {
		models.AddTag(name, state, createdBy)
	} else {
		panic(e.WebError(http.StatusInternalServerError, "TAG_NAME_ALREADY_EXIST"))
	}
	g.Response(http.StatusOK, make(map[string]string))
}

func EditTag(c *gin.Context) {
	g := app.Gin{c}
	id := com.StrTo(c.Param("id")).MustInt()
	name := c.Query("name")
	modifiedBy := c.Query("modifiedBy")

	valid := validation.Validation{}

	var state int = -1
	if arg := c.Query("state"); arg != "" {
		state = com.StrTo(arg).MustInt()
		valid.Range(state, 0, 1, "state").Message("状态只允许0或1")
	}

	valid.Required(id, "id").Message("ID不能为空")
	valid.Required(modifiedBy, "modifiedBy").Message("修改人不能为空")
	valid.MaxSize(modifiedBy, 100, "modifiedBy").Message("修改人最长为100字符")
	valid.MaxSize(name, 100, "name").Message("名称最长为100字符")

	if valid.HasErrors() {
		app.MakeErrors(valid.Errors)
	}
	if models.ExistTagById(id) {
		data := make(map[string]interface{})
		data["modifiedBy"] = modifiedBy
		if name != "" {
			data["name"] = name
		}
		if state != -1 {
			data["state"] = state
		}
		models.EditTag(id, data)
	} else {
		panic(e.WebError(http.StatusBadRequest, "TAG_NOT_EXIST"))
	}
	g.Response(http.StatusOK, make(map[string]string))
}

func DeleteTag(c *gin.Context) {
	g := app.Gin{c}
	id := com.StrTo(c.Param("id")).MustInt()

	valid := validation.Validation{}
	valid.Min(id, 1, "id").Message("ID必须大于0")

	if valid.HasErrors() {
		app.MakeErrors(valid.Errors)
	}
	if models.ExistTagById(id) {
		models.DeletedTag(id)
	} else {
		panic(e.WebError(http.StatusBadRequest, "TAG_NOT_EXIST"))
	}
	g.Response(http.StatusOK, make(map[string]string))
}
