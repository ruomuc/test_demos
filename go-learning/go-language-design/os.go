// package main

// func main() {
// 	var s, sep string
// 	for i := 1; i < len(os.Args); i++ {
// 		s += sep + os.Args[i] // 和c++ 、 js一样，`+`表示字符串的连接
// 		sep = " "
// 	}
// 	fmt.Println(s)

// 	var s2, sep2 string
// 	for _, value := range os.Args[1:] {
// 		s2 += sep2 + value
// 		sep2 = " "
// 	}
// 	fmt.Println(s2)

// 	fmt.Println(os.Args[1:])
// 	fmt.Println(strings.Join(os.Args[1:], " "))

// 	for i, v := range os.Args {
// 		fmt.Println("index=", i, "value=", v)
// 	}
// }

// func main() {
// 	counts := make(map[string]int)
// 	input := bufio.NewScanner(os.Stdin)
// 	for input.Scan() {
// 		fmt.Println("input=", input.Text())
// 		counts[input.Text()]++
// 		if input.Text() == "exit" {
// 			break
// 		}
// 	}
// 	fmt.Println("counts = ", counts)
// 	for line, n := range counts {
// 		fmt.Println("item = ", line, n)
// 		if n > 1 {
// 			fmt.Printf("value=%d\t%s\n", n, line)
// 		}
// 	}
// }
