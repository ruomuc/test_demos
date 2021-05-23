package main

import (
	"bufio"
	"fmt"
	"log"
	"net"
)

func main() {
	// 建立tcp服务
	listen, err := net.Listen("tcp", ":9090")
	if err != nil {
		log.Fatal("tcp server start err:", err)
	}
	log.Println("tcp listen at:",listen.Addr().String())
	for {
		conn, err := listen.Accept()
		if err != nil {
			fmt.Println("accept failed, err:", err)
		}
		// 每收到新的连接，启动一个协程去处理
		go process(conn)
	}
}

func process(conn net.Conn) {
	// 处理完后，关闭连接
	defer func() { _ = conn.Close() }()
	for {
		reader := bufio.NewReader(conn)
		var buf [128]byte
		n, err := reader.Read(buf[:])
		if err != nil {
			fmt.Println("read conn err:", err)
			return
		}

		receive := string(buf[:n])
		fmt.Printf("收到数据: %v\n", receive)

		// 返回数据给客户端
		_, err = conn.Write([]byte("ok"))
		if err != nil {
			fmt.Println("write from conn err:", err)
			return
		}
	}
}
