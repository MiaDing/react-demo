# 博客系统

一个类似微博(博客)系统的简单实现。使用react,node(express),mongoose编写。

## 功能

- 用户登录、注册
- 用户浏览、发布信息
- 用户检索热搜话题或关键字
- 管理员编辑热搜话题等

## 截图

![主页截图](/data/screenshot.png)

## 运行

```
git clone https://github.com/miading/react-demo
cd react-demo
npm install
npm run server
```
访问[http://localhost:3000](http://localhost:3000)即可看到主界面

## 目录结构

- [build]
- [data]
- [server]
    - [controller]
    - [schema]
    - router.js
- [source]
    - [css]
    - [js]
        - [common]
        - [component]
    - entry.js
    - index.html
- .babelrc
- app.js
- package.json
- webpack.config.js
- README.json

## TODO

- react服务器渲染
- 创建GraphQL服务、连接mongoose数据库
- 缓存
- 增加评论、点赞等功能