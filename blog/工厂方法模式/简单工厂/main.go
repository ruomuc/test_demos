package main

import (
	oss "simple-factory/oss"
)

func main() {
	tencentOss, err := oss.OssFactory("测试腾讯云OSS文件", oss.TencentOss)
	if err != nil {
		panic(err)
	}
	_ = tencentOss.GetObject()
	_ = tencentOss.PutObject()

	native, err := oss.OssFactory("测试本地文件", oss.Native)
	if err != nil {
		panic(err)
	}
	_ = native.GetObject()
	_ = native.PutObject()
}
