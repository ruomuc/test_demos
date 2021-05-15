CREATE TABLE iF NOT EXISTS blog.`blog_tag`
(
    `id`          int(10) unsigned NOT NULL AUTO_INCREMENT,
    `name`        varchar(100) DEFAULT '' COMMENT '标签名称',
    `created_on`  timestamp  DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `created_by`  int(10) NOT NULL COMMENT '创建人',
    `modified_on` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
    `modified_by` varchar(100) DEFAULT '' COMMENT '修改人',
    `is_deleted`  boolean DEFAULT false COMMENT '是否删除',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文章标签管理';

CREATE TABLE iF NOT EXISTS blog.`blog_article`
(
    `id`          int(10) unsigned NOT NULL AUTO_INCREMENT,
    `tag_id`      int(10) unsigned NOT NULL DEFAULT 0 COMMENT '标签ID',
    `title`       varchar(100) NOT NULL DEFAULT '' COMMENT '文章标题',
    `desc`        varchar(255) NOT NULL DEFAULT '' COMMENT '简述',
    `content`     text NOT NULL COMMENT '内容',
    `image`       varchar(100) NOT NULL DEFAULT '' COMMENT '创建人',
    `created_on`  timestamp  DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `created_by`  int(10) NOT NULL COMMENT '创建人',
    `modified_on` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
    `modified_by` varchar(100) DEFAULT '' COMMENT '修改人',
    `is_deleted`  boolean DEFAULT false COMMENT '是否删除',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文章管理';

CREATE TABLE iF NOT EXISTS blog.`blog_auth`
(
    `id`       int(10) unsigned NOT NULL AUTO_INCREMENT,
    `username` varchar(50) DEFAULT '' COMMENT '账号',
    `password` varchar(50) DEFAULT '' COMMENT '密码',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='账户表';


INSERT INTO `blog`.`blog_auth` (`id`, `username`, `password`) VALUES (null, 'test', 'test123456');
