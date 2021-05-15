package cache_service

import (
	"gin-blog/pkg/gredis"
	"strconv"
	"strings"
)

type Article struct {
	ID    int
	TagID int

	Limit  int
	Offset int
}

func (a *Article) GetArticleKey() string {
	return gredis.CACHE_ARTICLE + "_" + strconv.Itoa(a.ID)
}

func (a *Article) GetArticlesKey() string {
	keys := []string{gredis.CACHE_ARTICLE, "LIST"}
	if a.ID > 0 {
		keys = append(keys, strconv.Itoa(a.ID))
	}
	if a.TagID > 0 {
		keys = append(keys, strconv.Itoa(a.TagID))
	}
	if a.Limit > 0 {
		keys = append(keys, strconv.Itoa(a.Limit))
	}
	if a.Offset > 0 {
		keys = append(keys, strconv.Itoa(a.Offset))
	}

	return strings.Join(keys, "_")
}
