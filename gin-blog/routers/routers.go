package routers

import (
	"gin-blog/pkg/setting"
	"gin-blog/pkg/upload"
	"gin-blog/routers/api"
	v1 "gin-blog/routers/api/v1"
	"net/http"

	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	gin.SetMode(setting.ServerSetting.RunMode)

	r.StaticFS("/upload/images", http.Dir(upload.GetImageFullPath()))
	// 获取token
	r.GET("/auth", api.GetAuth)
	r.POST("/upload", api.UploadImage)

	apiv1 := r.Group("/api/v1")
	//apiv1.Use(jwt.JWT())
	{
		// 获取标签列表
		apiv1.GET("/tags", v1.GetTags)
		// 新建标签
		apiv1.POST("/tags", v1.AddTag)
		// 更新指定标签
		apiv1.PUT("/tags/:id", v1.EditTag)
		// 删除指定标签
		apiv1.DELETE("/tags/:id", v1.DeleteTag)
		// 获取文章列表
		apiv1.GET("/articles", v1.GetArticles)
		// 获取指定文章
		apiv1.GET("/article/:id", v1.GetArticle)
		// 新建文章
		apiv1.POST("/articles", v1.AddArticles)
		// 更新指定文章
		apiv1.PUT("/article/:id", v1.EditArticle)
		// 删除指定文章
		apiv1.DELETE("/article/:id", v1.DeleteArticle)
	}
	return r
}
