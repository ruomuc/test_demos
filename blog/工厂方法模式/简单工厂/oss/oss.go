package oss

import "fmt"

//OssImpl is ...
type OssImpl interface {
	GetObject() error
	PutObject() error
}

type tencentOss struct {
	name string
}

func (t tencentOss) GetObject() error {
	fmt.Printf("Get object '%s' from tencentOSS\n", t.name)
	return nil
}

func (t tencentOss) PutObject() error {
	fmt.Printf("Put object '%s' to tencentOSS\n", t.name)
	return nil
}

type native struct {
	name string
}

func (n native) GetObject() error {
	fmt.Printf("Get object '%s' from native\n", n.name)
	return nil
}

func (n native) PutObject() error {
	fmt.Printf("Put object '%s' to native\n", n.name)
	return nil
}

type ossType uint8

const (
	TencentOss = iota
	Native
)

func OssFactory(name string, t ossType) (OssImpl, error) {
	var res OssImpl
	if t == TencentOss {
		res = tencentOss{name}
	} else if t == Native {
		res = native{name}
	}
	return res, nil
}
