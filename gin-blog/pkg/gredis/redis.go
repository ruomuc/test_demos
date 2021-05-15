package gredis

import (
	"encoding/json"
	"gin-blog/pkg/setting"
	"time"

	"github.com/gomodule/redigo/redis"
)

var RedisConn *redis.Pool

func Setup() error {
	RedisConn = &redis.Pool{
		MaxIdle:     setting.RedisSetting.MaxIdle,
		MaxActive:   setting.RedisSetting.MaxActive,
		IdleTimeout: setting.RedisSetting.IdleTimeout,
		Dial: func() (redis.Conn, error) {
			c, err := redis.Dial("tcp", setting.RedisSetting.Host)
			if err != nil {
				return nil, err
			}
			if setting.RedisSetting.Password != "" {
				if _, err := c.Do("AUTH", setting.RedisSetting.Password); err != nil {
					_ = c.Close()
					return nil, err
				}
			}
			return c, err
		},
		TestOnBorrow: func(c redis.Conn, t time.Time) error {
			_, err := c.Do("PING")
			return err
		},
	}
	return nil
}

func ExistsByKey(rkey string) bool {
	conn := RedisConn.Get()
	defer conn.Close()

	exists, err := redis.Bool(conn.Do("EXISTS", rkey))
	if err != nil {
		return false
	}
	return exists
}

func Get(rkey string) ([]byte, error) {
	conn := RedisConn.Get()
	defer conn.Close()

	reply, err := redis.Bytes(conn.Do("GET", rkey))
	if err != nil {
		return nil, err
	}
	return reply, nil
}

func Set(rkey string, data interface{}, expire int) (err error) {
	conn := RedisConn.Get()
	defer conn.Close()

	value, err := json.Marshal(data)
	if err != nil {
		return
	}

	// 如果设置了过期时间，使用setex
	if expire > 0 {
		_, err = conn.Do("SETEX", rkey, expire, value)
	} else {
		_, err = conn.Do("SET", rkey, value)
	}
	if err != nil {
		return
	}
	return
}
