package extension

import (
	"fmt"
	"testing"
)

type Pet struct {
}

func (p *Pet) Speak(sp string) {
	fmt.Println(sp)
}

func (p *Pet) SpeakTo(sp string, host string) {
	p.Speak(sp)
	fmt.Println(" ", host)
}

type Dog struct {
	// p *Pet
	Pet
}

// func (d *Dog) Speak() {
// 	d.p.Speak("wang!")
// }

// func (d *Dog) SpeakTo(sp string, host string) {
// 	d.p.SpeakTo(sp, host)
// }

func TestDog(t *testing.T) {
	dog := new(Dog)
	dog.SpeakTo("wang!", "marin")
	dog.Speak("wang!")
}
