package util

import (
	"gin-blog/pkg/setting"

	"github.com/gin-gonic/gin"
	"github.com/unknwon/com"
)

func GetPageParams(c *gin.Context) (limit, offset int) {
	page, _ := com.StrTo(c.Query("page")).Int()
	pageSize, _ := com.StrTo(c.Query("pageSize")).Int()

	if pageSize < 0 {
		pageSize = setting.AppSetting.PageSize
	}

	if page > 0 {
		limit = (page - 1) * pageSize
	}
	offset = pageSize
	return
}
