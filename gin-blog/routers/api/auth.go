package api

import (
	"gin-blog/models"
	"gin-blog/pkg/e"
	"gin-blog/pkg/logging"
	"gin-blog/pkg/util"
	"github.com/astaxie/beego/validation"
	"github.com/gin-gonic/gin"
	"net/http"
)

type auth struct {
	Username string `valid:"Required; MaxSize(50)"`
	Password string `valid:"Required;MaxSize(50)"`
}

func GetAuth(c *gin.Context) {
	username := c.Query("username")
	password := c.Query("password")

	valid := validation.Validation{}
	a := auth{Username: username, Password: password}
	ok, _ := valid.Valid(&a)

	data := make(map[string]interface{})

	if ok {
		isExist := models.CheckAuth(username, password)
		if isExist {
			token, err := util.GenerateToken(username)
			if err != nil {
				panic(e.WebError(http.StatusInternalServerError, "GENERATE_TOKEN_FAIL"))
			}
			data["token"] = token
		} else {
			panic(e.WebError(http.StatusUnauthorized, "USER_PWD_ERROR"))
		}
	} else {
		for _, err := range valid.Errors {
			logging.Info(err.Key, err.Message)
		}
		panic(map[interface{}]interface{}{
			"code": http.StatusBadRequest,
			"msg":  valid.Errors[0].Message,
		})
	}
	c.JSON(http.StatusOK, gin.H{
		"msg":  "ok",
		"data": data,
	})
}
