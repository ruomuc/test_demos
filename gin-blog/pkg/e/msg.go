package e

const (
	SUCCESS        = 200 // ok
	ERROR          = 500 // 未知的错误
	INVALID_PARAMS = 400 // 错误的参数

	AUTHORIZATION_NOT_PASS = 10001 // 鉴权未通过
	TOKEN_TIMEOUT          = 10002 // token已过期
	GENERATE_TOKEN_FAIL    = 10003 // token生成失败
	USER_PWD_ERROR         = 10004 // 用户名或密码错误

	TAG_NAME_ALREADY_EXIST = 20001 // 已存在该标签名称
	TAG_ID_ALREADY_EXIST   = 20002 // 已存在该标签ID
	TAG_NOT_EXIST          = 20003 // 标签不存在

	FAIL_CHECK_ARTICLE_ID_ERR = 20004 // 检查文章是否存在时出错
	FAIL_GET_ARTICLE_ERR      = 20005 // 获取文章时出错
	ARTICLE_NOT_EXIST         = 20006 // 文章不存在
	FAIL_DELETE_ARTICLE_ERROR = 20007 // 删除文章时出错
	FAIL_GET_ARTICLES_ERR     = 20008 // 获取文章列表出错
	FAIL_COUNT_ARTICLES_ERR   = 20009 // 获取文章列表数量出错

	ERROR_UPLOAD_CHECK_IMAGE_FORMAT = 30001 // 校验图片错误，图片格式或大小有问题
	ERROR_UPLOAD_CHECK_IMAGE_FAIL   = 30002 // 校验图片错误，图片格式或大小有问题
	ERROR_UPLOAD_SAVE_IMAGE_FAIL    = 30003 // 校验图片错误，图片格式或大小有问题
)

//
//var MsgFlags = map[string]string{
//	"OK":             "ok",
//	"ERROR":          "未知的错误",
//	"INVALID_PARAMS": "错误的参数",
//
//	"TAG_NAME_ALREADY_EXIST": "已存在该标签名称",
//	"TAG_ID_ALREADY_EXIST":   "已存在该标签ID",
//	"TAG_NOT_EXIST":          "标签不存在",
//
//	"FAIL_CHECK_ARTICLE_ID_ERR": "检查文章是否存在时出错",
//	"FAIL_GET_ARTICLE_ERR":      "获取文章时出错",
//	"ARTICLE_NOT_EXIST":         "文章不存在",
//	"FAIL_DELETE_ARTICLE_ERROR": "删除文章时出错",
//
//	"AUTHORIZATION_NOT_PASS": "鉴权未通过",
//	"TOKEN_TIMEOUT":          "token已过期",
//	"GENERATE_TOKEN_FAIL":    "token生成失败",
//	"USER_PWD_ERROR":         "用户名或密码错误",
//
//	"ERROR_UPLOAD_CHECK_IMAGE_FORMAT": "校验图片错误，图片格式或大小有问题",
//	"ERROR_UPLOAD_CHECK_IMAGE_FAIL":   "检查图片失败",
//	"ERROR_UPLOAD_SAVE_IMAGE_FAIL":    "保存图片失败",
//}
//
//func GetMsg(msg string) string {
//	if m, ok := MsgFlags[msg]; ok {
//		return m
//	}
//	return MsgFlags["ERROR"]
//}
