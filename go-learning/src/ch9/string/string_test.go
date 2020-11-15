package stringtest

import (
	"fmt"
	"testing"
)

func TestStringToRune(t *testing.T) {
	s := "中华人民共和国"
	fmt.Printf("%x\n", s)
	for i, c := range s {
		fmt.Printf("unicode=%[1]x ,rune=%[1]c, utf-8=%#[2]v%[3]x%[4]x \n", c, s[i], s[i+1], s[i+2])
	}
}
