package models

import (
	"github.com/jinzhu/gorm"
)

type Article struct {
	Model
	TagID int `json:"tagId" gorm:"index"`
	Tag   Tag `json:"tag"`

	Title      string `json:"title"`
	Desc       string `json:"desc"`
	Content    string `json:"content"`
	CreatedBy  string `json:"createdBy"`
	ModifiedBy string `json:"modifiedBy"`
	Image      string `json:"image"`
}

// 根据文章id 判断文章是否存在
func ExistArticleByID(id int) (bool, error) {
	var article Article
	err := db.Select("id").Where("id = ?", id).First(&article).Error
	if article.ID > 0 {
		return true, err
	}
	return false, nil
}

func GetArticleTotal(maps interface{}) (count int, err error) {
	err = db.Model(&Article{}).Where(maps).Count(&count).Error
	if err != nil {
		return 0, err
	}
	return count, nil
}

func GetArticles(limit int, offset int, maps interface{}) (articles []*Article, err error) {
	err = db.Preload("Tag").Where(maps).Offset(offset).Limit(limit).Find(&articles).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return nil, err
	}
	return articles, nil
}

func GetArticle(id int) (article *Article, err error) {
	err = db.Where("id = ?", id).First(&article).Model(&article).Related(&article.Tag).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return nil, err
	}
	return
}

func AddArticle(data map[string]interface{}) bool {
	db.Create(&Article{
		TagID:     data["tagId"].(int),
		Title:     data["title"].(string),
		Desc:      data["desc"].(string),
		Content:   data["content"].(string),
		CreatedBy: data["createdBy"].(string),
		Image:     data["convertImageUrl"].(string),
	})
	return true
}

func EditArticle(id int, data interface{}) bool {
	db.Model(&Article{}).Where("id = ?", id).Updates(data)
	return true
}

func DeleteArticle(id int) (err error) {
	err = db.Where("id = ?", id).Delete(Article{}).Error
	if err != nil {
		return err
	}
	return nil
}

func CleanAllArticle() bool {
	db.Unscoped().Where("deleted_on != ?", 0).Delete(&Article{})
	return true
}
