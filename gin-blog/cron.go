package main

import (
	"gin-blog/models"
	"gin-blog/pkg/logging"
	"time"

	"github.com/robfig/cron"
)

func main() {
	logging.Info("starting ...")
	c := cron.New()
	_ = c.AddFunc("* * * * * *", func() {
		logging.Info("Run models.CleanAllTag...")
		models.CleanAllTag()
		models.DeletedTag(38)
	})
	_ = c.AddFunc("* * * * * *", func() {
		logging.Info("Run models.CleanAllArticle")
		models.CleanAllArticle()
	})

	c.Start()

	t1 := time.NewTimer(time.Second * 10)
	for {
		select {
		case <-t1.C:
			t1.Reset(time.Second * 10)
		}
	}
}
