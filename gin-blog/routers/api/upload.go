package api

import (
	"gin-blog/pkg/e"
	"gin-blog/pkg/logging"
	"gin-blog/pkg/upload"
	"net/http"

	"github.com/gin-gonic/gin"
)

func UploadImage(c *gin.Context) {
	file, image, err := c.Request.FormFile("image")
	data := make(map[string]string)
	if err != nil {
		logging.Warn(err)
		panic(e.WebError(http.StatusBadRequest, "ERROR"))
	}
	if image == nil {
		panic(e.WebError(http.StatusBadRequest, "INVALID_PARAMS"))
	} else {
		imageName := upload.GetImageName(image.Filename)
		fullPath := upload.GetImageFullPath()
		savePath := upload.GetImagePath()

		src := fullPath + imageName
		if !upload.CheckImageExt(imageName) || !upload.CheckImageSize(file) {
			panic(e.WebError(http.StatusBadRequest, "ERROR_UPLOAD_CHECK_IMAGE_FORMAT"))
		} else {
			err := upload.CheckImage(fullPath)
			if err != nil {
				logging.Warn(err)
				panic(e.WebError(http.StatusBadRequest, "ERROR_UPLOAD_CHECK_IMAGE_FAIL"))
			} else if err := c.SaveUploadedFile(image, src); err != nil {
				logging.Warn(err)
				panic(e.WebError(http.StatusBadRequest, "ERROR_UPLOAD_SAVE_IMAGE_FAIL"))
			} else {
				data["image_url"] = upload.GetImageFullUrl(imageName)
				data["image_save_url"] = savePath + imageName
			}
		}
	}
	c.JSON(http.StatusOK, gin.H{
		"msg":  "ok",
		"data": data,
	})
}
