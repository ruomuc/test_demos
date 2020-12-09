package main

import (
	"flag"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

func main() {
	file, _ := exec.LookPath(os.Args[0])
	path, _ := filepath.Abs(file)
	index := strings.LastIndex(path, string(os.PathSeparator))
	fmt.Println("第一种对于go run无效", path[:index])

	var appPath string
	flag.StringVar(&appPath, "app-path", "app-path", "xxx")
	flag.Parse()
	fmt.Println("App path:", appPath)
}
