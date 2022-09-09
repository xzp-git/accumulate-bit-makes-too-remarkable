# Webpack优化

## 1. 缩小范围

### 1.1extensions

指定 `extensions` 之后可以不用在 `require` 或是 `import` 的时候加文件扩展名，会依次尝试添加的扩展名进行匹配

- 默认值  `extensions:[".js", ".json"]`

```js
{
    resolve:{
        extensions:[".ts", ".tsx", ".json", ".css"]
    }
}
```

## 1.2 alias

配置别名可以加快webpac查找模块的速度

- 每当引入 `bootstrap` 模块的时候，它会直接引入 `bootstrap` , 而不需要从 `node_modules` 文件夹中按模块的查找规则查找

  ```js
  const bootstrap = path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css')
  {
      resolve:{
          alias:{
              bootstrap
          }
      }
  }
  ```

  

## 1.3 modules

- 对于直接声明依赖名的模块（如 `react`）, `webpack` 会类似 `Node.js` 一样进行路径搜索，搜索 `node_modules` 目录

- 这个目录就是使用 `resolve.modules` 字段进行配置的

  - 默认配置

    ```js
    {
        resolve:{
            modules:['node_module']
        }
    }
    ```

  - 如果项目中有自己的模块存放在 `/my_modules` 的话可以配置
  
    ```js
    {
        resolve:{
            modules:['my_modules', 'node_modules']
        }
    }
    ```

### 1.4 mainFields

默认情况下 `package.json` 文件则按照文件中 `main` 字段的文件名来查找文件

```js
{
    resolve:{
        // 当 target 属性设置为 webworker, web 或者没有指定：
        mainFields:['browser', 'module', 'main'],
        //对于其他任意的 target（包括 node），默认值为：
        mainFields: ['module', 'main'],
    }
}
```

### 1.5mainFiles

解析目录时要使用的文件名

```js
{
    resolve:{
        //默认是index   
        mainFiles:['index']
    }
}
```



## 2. noParse

- `module.noParse` 字段，可以用于配置哪些模块文件的内容不需要进行解析

- 不需要解析依赖（即无依赖）的第三方大型类库等，可以通过这个字段来配置，以提高整体的构建速度

  ```js
  module.exports = {
      module:{
          noParse:/jquery|lodash/, //正则表达式
          //或者使用函数
          noParse(content){
              return /jquery|lodash/.test(content)
          }
      }
  }
  ```

## 3.IgnorePlugin

`ignorePlugin` 用于忽略默写特定的模块，让`webpack`不把这些指定的模块打包进去





- 列如 `moment` 这个处理日期的库 中语言包的忽略

```js
const webpack = require('webpack')

module.exports = {
    plugins:[
        new webpack.IgnorePlugin({
            contextRegExp: /moment$/,//目录的正则
            resourceRegExp:/locale/ //请求的正则
        })
    ]
}
```



## 4. 费时分析

## 5. webpack-bundle-analyzer

