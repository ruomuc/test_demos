package oss

func TencentOssFactory(name string) (OssImpl, error) {
	return tencentOss{name: name}, nil
}

func NativeFactory(name string) (OssImpl, error) {
	return native{name: name}, nil
}

func AliOssFactory(name string) (OssImpl, error) {
	return aliOss{name: name}, nil
}
