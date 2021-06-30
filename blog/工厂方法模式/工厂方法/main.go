package main

import "factory-method/oss"

func main() {
	tencentOss, err := oss.TencentOssFactory("测试腾讯云OSS文件")
	if err != nil {
		panic(err)
	}
	_ = tencentOss.GetObject()
	_ = tencentOss.PutObject()

	native, err := oss.NativeFactory("测试本地文件")
	if err != nil {
		panic(err)
	}
	_ = native.GetObject()
	_ = native.PutObject()


	aliOss, err := oss.AliOssFactory("测试阿里云OSS文件")
	if err != nil {
		panic(err)
	}
	_ = aliOss.GetObject()
	_ = aliOss.PutObject()
}
