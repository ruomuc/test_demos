package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
	"strings"
)

func main()  {
	// 与服务器建立连接
	conn,err:=net.Dial("tcp",":9090")
	if err!=nil{
		fmt.Println("client connect failed err:",err)
		return
	}
	// 发送和接收数据
	input:=bufio.NewReader(os.Stdin)
	for {
		s,_:=input.ReadString('\n')
		s = strings.TrimSpace(s)
		// 使用q命令退出命令行输入状态
		if strings.ToUpper(s) == "Q"{
			return
		}

		// 发送消息
		_,err= conn.Write([]byte(s))
		if err!=nil{
			fmt.Println("client send failed err:",err)
			return
		}

		// 收到服务端的回复
		var buf [1024]byte
		n,err:=conn.Read(buf[:])
		if err!=nil{
			fmt.Println("read from server failed err:",err)
			return
		}
		fmt.Printf("收到服务端的回复: %v\n",string(buf[:n]))
	}
}