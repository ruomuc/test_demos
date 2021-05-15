package article_service

import (
	"encoding/json"
	"gin-blog/models"
	"gin-blog/pkg/gredis"
	"gin-blog/pkg/logging"
	cache_service "gin-blog/service/cache-service"
)

type Article struct {
	ID         int    `json:"id"`
	TagID      int    `json:"tagId"`
	Title      string `json:"title"`
	Desc       string `json:"desc"`
	Content    string `json:"content"`
	CreatedBy  string `json:"createdBy"`
	ModifiedBy string `json:"modifiedBy"`
	Image      string `json:"image"`

	Limit  int
	Offset int
}

func (article *Article) Exists() (bool, error) {
	return models.ExistArticleByID(article.ID)
}

func (article *Article) Get() (*models.Article, error) {
	var cacheArticle *models.Article

	cacheService := cache_service.Article{ID: article.ID}
	key := cacheService.GetArticleKey()
	if gredis.ExistsByKey(key) {
		data, err := gredis.Get(key)
		if err != nil {
			logging.Info(err)
		} else {
			_ = json.Unmarshal(data, &cacheArticle)
			return cacheArticle, nil
		}
	}
	data, err := models.GetArticle(article.ID)
	if err != nil {
		return nil, err
	}
	// 更新redis缓存
	_ = gredis.Set(key, data, 3600)
	return data, nil
}

func (article *Article) Count() (count int, err error) {
	count, err = models.GetArticleTotal(article.getMaps())
	return
}

func (article *Article) GetAll() (articles []*models.Article, err error) {

	cacheService := cache_service.Article{
		TagID: article.TagID,

		Limit:  article.Limit,
		Offset: article.Offset,
	}
	key := cacheService.GetArticlesKey()
	if gredis.ExistsByKey(key) {
		data, err := gredis.Get(key)
		if err != nil {
			logging.Info(err)
		} else {
			json.Unmarshal(data, &articles)
		}
		return articles, nil
	}

	articles, err = models.GetArticles(article.Limit, article.Offset, article.getMaps())
	if err != nil {
		return nil, err
	}
	return articles, nil
}

func (article *Article) getMaps() (maps map[string]interface{}) {
	maps = make(map[string]interface{})
	maps["tag_id"] = article.TagID
	return
}

func (article *Article) Delete() error {
	return models.DeleteArticle(article.ID)
}
