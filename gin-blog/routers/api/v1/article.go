package v1

import (
	"gin-blog/pkg/app"
	"gin-blog/pkg/e"
	"gin-blog/pkg/util"
	article_service "gin-blog/service/article-service"
	"net/http"

	"github.com/astaxie/beego/validation"
	"github.com/gin-gonic/gin"
	"github.com/unknwon/com"
)

// 获取单个文章
func GetArticle(c *gin.Context) {
	appG := app.Gin{c}
	id := com.StrTo(c.Param("id")).MustInt()
	valid := validation.Validation{}
	valid.Min(id, 1, "id").Message("ID必须大于0")
	if valid.HasErrors() {
		app.MakeErrors(valid.Errors)
		appG.Response(http.StatusBadRequest, nil, e.INVALID_PARAMS)
	}

	articleService := article_service.Article{ID: id}
	exists, err := articleService.Exists()
	if err != nil {
		appG.Response(http.StatusInternalServerError, nil, e.FAIL_CHECK_ARTICLE_ID_ERR)
	}
	if !exists {
		appG.Response(http.StatusBadRequest, nil, e.ARTICLE_NOT_EXIST)
		return
	}

	article, err := articleService.Get()
	if err != nil {
		appG.Response(http.StatusInternalServerError, nil, e.FAIL_GET_ARTICLE_ERR)
	}
	appG.Response(http.StatusOK, article, e.SUCCESS)
}

// 获取文章列表
func GetArticles(c *gin.Context) {
	appG := app.Gin{c}
	valid := validation.Validation{}

	var tagId = -1
	if arg := c.Query("tagId"); arg != "" {
		tagId = com.StrTo(arg).MustInt()
		valid.Min(tagId, 1, "tagId")
	}
	if valid.HasErrors() {
		app.MakeErrors(valid.Errors)
		appG.Response(http.StatusBadRequest, nil, e.INVALID_PARAMS)
	}

	limit, offset := util.GetPageParams(c)
	articleService := article_service.Article{
		TagID:  tagId,
		Limit:  limit,
		Offset: offset,
	}

	data := make(map[string]interface{})
	list, err := articleService.GetAll()
	if err != nil {
		appG.Response(http.StatusInternalServerError, nil, e.FAIL_GET_ARTICLES_ERR)
	}
	count, err := articleService.Count()
	if err != nil {
		appG.Response(http.StatusInternalServerError, nil, e.FAIL_COUNT_ARTICLES_ERR)
	}

	data["list"] = list
	data["count"] = count
	appG.Response(http.StatusOK, data, e.SUCCESS)
}

type AddArticleForm struct {
	TagID     int    `form:"tagId" valid:"Required;Min(1)"`
	Title     string `form:"title" valid:"Required;MaxSize(100)"`
	Desc      string `form:"desc" valid:"Required;MaxSize(255)"`
	Content   string `form:"desc" valid:"Required"`
	CreatedBy int    `form:"createdBy" valid:"Required"`
	Image     string `form:"image" valid:"Required;MaxSize(255)"`
}

// 新增文章
func AddArticles(c *gin.Context) {

}

// 修改文章
func EditArticle(c *gin.Context) {

}

// 删除文章
func DeleteArticle(c *gin.Context) {
	appG := app.Gin{c}
	valid := validation.Validation{}

	id := com.StrTo(c.Param("id")).MustInt()
	valid.Min(id, 1, "id").Message("ID必须大于1")

	if valid.HasErrors() {
		app.MakeErrors(valid.Errors)
		appG.Response(http.StatusBadRequest, nil, e.INVALID_PARAMS)
	}

	articleService := article_service.Article{ID: id}
	exists, err := articleService.Exists()
	if err != nil {
		appG.Response(http.StatusInternalServerError, nil, e.FAIL_CHECK_ARTICLE_ID_ERR)
	}
	if !exists {
		appG.Response(http.StatusBadRequest, nil, e.ARTICLE_NOT_EXIST)
	}

	err = articleService.Delete()
	if err != nil {
		appG.Response(http.StatusInternalServerError, nil, e.FAIL_DELETE_ARTICLE_ERROR)
	}
	appG.Response(http.StatusOK, nil, e.SUCCESS)
}
