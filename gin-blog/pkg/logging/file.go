package logging

import (
	"fmt"
	"gin-blog/pkg/file"
	"gin-blog/pkg/setting"
	"os"
	"time"
)

func getLogFilePath() string {
	return fmt.Sprintf("%s%s", setting.AppSetting.RuntimeRootPath, setting.AppSetting.LogSavePath)
}

func getLogFileName() string {
	return fmt.Sprintf("%s%s.%s",
		setting.AppSetting.LogSaveName,
		time.Now().Format(setting.AppSetting.TimeFormat),
		setting.AppSetting.LogFileExt)
}

func openLogFile(fileName, filePath string) (*os.File, error) {
	dir, err := os.Getwd()
	if err != nil {
		return nil, fmt.Errorf("os.Getwd err : %v", err)
	}
	src := dir + "/" + filePath
	perm := file.CheckPermission(src)
	if perm {
		return nil, fmt.Errorf("file.Checkpermission Permission denied src: %v", src)
	}
	err = file.IsNotExistMkDir(src)
	if err != nil {
		return nil, fmt.Errorf("file.IsNotExistMkDir src: %v", src, err)
	}
	f, err := file.Open(src+fileName, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return nil, fmt.Errorf("Fail to OpenFile : %v", err)
	}
	return f, nil
}