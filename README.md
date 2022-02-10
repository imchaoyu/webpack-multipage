# webpack multi-page  
> 这是运用webpack5打包传统jQuery开发的多页面网站 的一个配置，有简单demo供参考

* 项目运行
```bash
//clone the repository
git clone https://github.com/chaoyuwang/webpack-multipage.git

//install package
npm install

//development
npm run start

//production
npm run build

//view
http://127.0.0.1:8081
```

* 目录

```
...
├── config                                   // webpack配置文件
├── ├── page.config.js                       // 静态页面配置
├── └── webpack.config.js                    // 基础配置文件
├── src                                      // 项目静态页
├── ├── style                                // 样式（css/scss）文件
├── ├── pages                                // html静态页面
├── ├── images                               // images文件
├── ├── js                                   // js脚本
├── ├── temp                                 // 本项目模拟数据文件
├── └── index.js                             // 项目入口文件
├── postcss.config.js                        // postcss配置文件
├── babel.config.js                          // babel配置文件
├── package.json                             // package
...
```
可根据个人开发习惯调整src内结构，修改相应配置文件即可 

> `pages`目录内根据页面命名，将html，css和js文件都放进当前页面文件夹，统一管理
> 
> 项目较小，可以将多入口修改为单入口，即可打包成一个js和css引入网页

# ToDo

- [ ] devServer优化 
- [ ] 压缩图片
- [ ] css压缩
- [ ] ESLint等代码规范添加
- [ ] 开发环境和生产环境文件分离
- [ ] 开发文档编写
