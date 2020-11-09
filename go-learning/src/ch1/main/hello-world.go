package main

import (
	"fmt"
	"os"
)

/**
* golang中的main函数无法传入参数，没有返回值
* 可以使用os.Args来传入参数
 */
func main() {
	if len(os.Args) >= 1 {
		fmt.Println("参数长度=", len(os.Args), os.Args)
	}
	fmt.Println("hello world!")
	os.Exit(-1)
}
