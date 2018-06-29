# webpack multi-page  
> 这是运用webpack打包传统jQuery开发的多页面网站 的一个配置，有简单demo供参考

* 项目运行
```
//clone the repository
git clone https://github.com/chaoyuwang/webpack-multipage.git

//install package
npm install

//development
npm run dev

//production
npm run build

//view
http://127.0.0.1:8081
```

* 目录

```
...
├── build                                    // webpack配置文件
├── ├── webpack.base.config.js               // 基础配置文件
├── ├── webpack.dev.config.js                // 开发环境配置文件
├── ├── webpack.prod.config.js               // 生产环境配置文件
├── └── webpack.rule.config.js               // module.rules统一配置文件
├── src                                      // 项目静态页
├── ├── style                                // 样式（css/scss）文件
├── ├── pages                                // html静态页面
├── ├── images                               // images文件
├── ├── js                                   // js脚本
├── └── temp                                 // 本项目模拟数据文件
├── postcss.config.js                        // postcss配置文件
├── package.json                             // package
...
```
可根据个人开发习惯调整src内结构，修改相应配置文件即可 

> `pages`目录内根据页面命名，将html，css和js文件都放进当前页面文件夹，统一管理
> 
> 项目较小，可以将多入口修改为单入口，即可打包成一个js和css引入网页