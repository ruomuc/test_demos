package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// LoginForm ...
type LoginForm struct {
	Password string `form:"password" binding:"required"`
	User     string `form:"user" binding:"required"`
}

// func main() {
// 	r := gin.Default()
// 	r.GET("/ping", func(c *gin.Context) {
// 		c.JSON(200, gin.H{"message": "pong"})
// 	})
// 	r.Run("127.0.0.1:3000")
// }

func main() {
	r := SetupRouter()
	r.Run("127.0.0.1:3000")
}

// SetupRouter 设置路由
func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.Delims("[[[", "]]]")
	r.LoadHTMLGlob("templates/*")
	r.Static("assets", "./assets/")
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "pong"})
	})
	r.GET("/someJson", func(c *gin.Context) {
		data := map[string]interface{}{
			"lang": "GO语言",
			"tag":  "<br>",
		}
		c.AsciiJSON(http.StatusOK, data)
	})
	r.GET("/index", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": "Main website",
		})
	})
	// 没有https的证书，暂无法验证。。
	r.GET("/push", func(c *gin.Context) {
		if pusher := c.Writer.Pusher(); pusher != nil {
			if err := pusher.Push("/assets/app.js", nil); err != nil {
				log.Printf("Falied to push : %v", err)
			}
		}
		c.HTML(200, "push.html", gin.H{
			"status": "success",
		})
	})
	r.GET("/JSONP?callback=x", func(c *gin.Context) {
		data := map[string]interface{}{
			"foo": c.Query("callback"),
		}
		c.JSONP(http.StatusOK, data)
	})

	r.POST("/login", func(c *gin.Context) {
		var form LoginForm
		if c.ShouldBind(&form) == nil {
			if form.User == "user" && form.Password == "pwd" {
				c.JSON(200, gin.H{"status": "you are logged in"})
			} else {
				c.JSON(401, gin.H{"status": "unauthorized"})
			}
		}
	})

	r.POST("/form-post", func(c *gin.Context) {
		message := c.PostForm("message")
		nick := c.DefaultPostForm("nick", "anonymous")
		c.JSON(200, gin.H{
			"status":  "posted",
			"message": message,
			"nick":    nick,
		})
	})

	r.GET("/json", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"html": "<b>hello world!</b>",
		})
	})

	r.GET("/purejson", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"html": "<b>hello world!</b>",
		})
	})
	return r
}
