# 蚁逅@1.0
> 代码仅供学习参考与合法的研究测试。

> note:
> 访问触发，产生记录
> 
> Docker git: https://github.com/Joeeyy/ant.git
> 
> 下载后部署，需要添加环境变量实现钉钉机器人告警：
> 
> export ANT_DINGTALK_ROBOT_KEYWORD=xxx
> export ANT_DINGTALK_ROBOT_AK=xxx
> 或者直接使用xss目录下的docker-compose.yml进行部署：
> 
> docker-compose -f docker-compose.yml up -d

## 使用 Docker 

```
$ wget https://raw.githubusercontent.com/AntSwordProject/ant/master/docker-compose.yml
$ docker-compose -f docker-compose.yml up -d 
```

如果需要配置邮件, 只需要修改 `docker-compose.yml` 中部分环境变量

```
- ANT_MAIL_HOST=smtp.qq.com
- ANT_MAIL_PORT=465
- ANT_MAIL_SECURE=true
- ANT_MAIL_EMAIL=email@user.com
- ANT_MAIL_PASSWORD=email-password
```

## 手动安装与布署

### 0. 依赖环境

* [nodejs](https://nodejs.org/en/download)
* [mongodb](http://dl.mongodb.org/downloads)

**本人使用测试环境**

| 应用 | 版本 |
| :-- | :-- |
| Ubuntu | 14.04 |
| Nodejs | 0.12.x |
| Mongodb | 2.6.7 |

> 提示：高版本也可正常使用

所需环境请自行安装。

### 1. 获取代码

``` sh
$ git clone https://github.com/antoor/ant.git
```

或者使用下面的链接下载源码并解压：

``` sh
$ wget https://github.com/antoor/ant/archive/master.zip
```

### 2. 安装必要模块

```
$ cd web
$ npm install

```

### 3. 安装数据库

 1. 启动数据库

	``` sh
	$ cd database
	$ mongod -f db.conf
	```

 2. 导入数据

	``` sh
	$ mongorestore
	```

### 4. 启动程序

``` sh
$ cd web
$ node app
```

启动成功后访问 

```
http://127.0.0.1:3000
```

默认管理账号 `i@root.cool` ，密码 `123456`


## 其它配置

### 1. 邮箱账号

这个功能采用了`nodemailer`模块，目前个人使用的是QQ邮箱的SMTP功能，用户可自行更改

设置以下环境变量, 然后启动即可

```
export ANT_MAIL_NAME='ANT' \
  ANT_MAIL_HOST='smtp.qq.com' \
  ANT_MAIL_PORT=465 \
  ANT_MAIL_SECURE=true \
  ANT_MAIL_EMAIL='email@user.com' \
  ANT_MAIL_PASSWORD='email-password'
```

### 2. 扩展功能

本程序采用了模块化的插件设计，你可以进入 `addons` 目录，根据名称寻找对应的插件进行更改即可。

`route.js`为服务端脚本，`client.js`为未压缩客户端脚本，**请编辑后使用`uglifyjs`进行压缩成`client.min.js`文件覆盖原文件。**

## 注意事项

1. Chrome 70 之后，非 https 环境下不能访问 applicationCache, 请务必配置 https 后访问后台。客户端不受影响。

2. 建议在前面配置 nginx 反向代理，同时开启 http 和 https

## 说明

开发一个有用的程序很简单，能坚持维护下去却很难。 
   
我把此代码开源出来，目的很简单：**能与同样有兴趣的朋友一起学习分享**。    

> 代码写得很烂，现在看来惨不忍睹～不过也算是自己学习中的小作品，你可以参考参考，也可以搭建玩耍玩耍。

**本项目不再更新维护。**    
如果你有兴趣，可以进行修改优化增强，**但不能用于盈利以及非法用途**

- - -

欢迎关注本人[GitHub](http://github.com/antoor)以及[微博](http://weibo.com/antoor)，不定时更新新鲜好玩作品！    
> 再次感谢大家的支持！
