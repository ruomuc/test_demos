package app

import "github.com/gin-gonic/gin"

type Gin struct {
	C *gin.Context
}

func (g *Gin) Response(httpCode int, data interface{}, errCode int) {
	g.C.JSON(httpCode, gin.H{
		"data":    data,
		"errCode": errCode,
	})
}
