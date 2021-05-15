package jwt

import (
	"gin-blog/pkg/e"
	"gin-blog/pkg/util"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

func JWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("authorization")
		if token == "" {
			panic(e.WebError(http.StatusUnauthorized, "AUTHORIZATION_NOT_PASS"))
		} else {
			claims, err := util.ParseToken(token)
			if err != nil {
				panic(e.WebError(http.StatusUnauthorized, "AUTHORIZATION_NOT_PASS"))
			} else if time.Now().Unix() > claims.ExpiresAt {
				panic(e.WebError(http.StatusUnauthorized, "TOKEN_TIMEOUT"))
			}
		}
		c.Next()
	}
}
