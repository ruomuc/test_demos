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

type aliOss struct {
	name string
}

func (a aliOss) GetObject() error {
	fmt.Printf("Get object '%s' from aliOss\n", a.name)
	return nil
}

func (a aliOss) PutObject() error {
	fmt.Printf("Put object '%s' to aliOss\n", a.name)
	return nil
}