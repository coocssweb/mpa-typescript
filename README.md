# html5
一个优雅的html5脚手架
a simple H5 scaffolding

## Getting Start
```bash
# install cli
npm install -g @coocss/cli

# 创建项目
coocss crate html5

# 安装依赖
npm install

# 开始你的表演，http://127.0.0.1:7777
npm start
```

## 关于微信jssdk
微信jssdk微信环境下会自动加载（其他环境不加载）

微信token需要，由服务端配合开发返回的json格式如下：（具体请查阅微信api文档）

```
{
	"appId": "xxxx",
	"nonceStr": "xxx",
	"timestamp": xxx,
	"jsapi_ticket": "xxxx",
	"signature": "xxx"
}
```

## Todo List
- 添加一些比较通用的动画
- 写一个手势插件
- 完善好文档
- 建议一个demo，在github.io下
-
-
-
- ......

## Support

Modern browsers and Internet Explorer 8+.


## LICENSE

**MIT**
