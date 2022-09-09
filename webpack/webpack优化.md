# Webpack 优化

## 1. 缩小范围

### 1.1extensions

指定 `extensions` 之后可以不用在 `require` 或是 `import` 的时候加文件扩展名，会依次尝试添加的扩展名进行匹配

- 默认值 `extensions:[".js", ".json"]`

```js
{
  resolve: {
    extensions: [".ts", ".tsx", ".json", ".css"];
  }
}
```

## 1.2 alias

配置别名可以加快 webpac 查找模块的速度

- 每当引入 `bootstrap` 模块的时候，它会直接引入 `bootstrap` , 而不需要从 `node_modules` 文件夹中按模块的查找规则查找

  ```js
  const bootstrap = path.resolve(
    __dirname,
    "node_modules/bootstrap/dist/css/bootstrap.css"
  );
  {
    resolve: {
      alias: {
        bootstrap;
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
      resolve: {
        modules: ["node_module"];
      }
    }
    ```

  - 如果项目中有自己的模块存放在 `/my_modules` 的话可以配置

    ```js
    {
      resolve: {
        modules: ["my_modules", "node_modules"];
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
  resolve: {
    //默认是index
    mainFiles: ["index"];
  }
}
```

## 2. noParse

- `module.noParse` 字段，可以用于配置哪些模块文件的内容不需要进行解析

- 不需要解析依赖（即无依赖）的第三方大型类库等，可以通过这个字段来配置，以提高整体的构建速度

  ```js
  module.exports = {
    module: {
      noParse: /jquery|lodash/, //正则表达式
      //或者使用函数
      noParse(content) {
        return /jquery|lodash/.test(content);
      },
    },
  };
  ```

## 3.IgnorePlugin

`ignorePlugin` 用于忽略默写特定的模块，让`webpack`不把这些指定的模块打包进去

- 列如 `moment` 这个处理日期的库中语言包的忽略

```js
const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.IgnorePlugin({
      contextRegExp: /moment$/, //目录的正则
      resourceRegExp: /locale/, //请求的正则
    }),
  ],
};
```

- 忽略语言包的时候，会把中文语言也给忽略，我们使用的时候在单独引入中文就可以了

```js
import moment from 'moment'
import 'moment/locale/zh-cn'
```

## 4. 费时分析

- `speed-measure-webpack-plugin` 插件是用来分析构建时各个 `plugin` 和 `loader` 运行时长

```js
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smw = new SpeedMeasureWebpackPlugin();
module.exports =smw.wrap({
});
```

## 5. webpack-bundle-analyzer

- 是一个 `webpack` 的插件，需要配合 webpack 和 webpack-cli 一起使用，这个插件的主要功能是生成代码分析报告，可以看到打包出来哪些模块，各个模块的大小是多少

```js
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
module.exports={
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```

  ## 6. 提取css

- 因为css的下载和JS可以并行，当一个HTML文件很大的时候，我们可以把css单独提取出来加载

### 6.1 安装

```js
npm i mini-css-extract-plugin --save-dev
```

### 6.2 webpack.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
+const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
+    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
+      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
+      { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] },
+      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
       {
        test: /\.(jpg|png|gif|bmp|svg)$/,
        type:'asset/resource',
        generator:{
          filename:'images/[hash][ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
+   new MiniCssExtractPlugin({
    //指定css目录
+      filename: 'css/[name].css'
+   })
  ]
};
```

## 7.指定图片的目录

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
+const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
+    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
+      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
+      { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] },
+      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
       {
        test: /\.(jpg|png|gif|bmp|svg)$/,
        type:'asset/resource',
        generator:{
          filename:'images/[hash][ext]'
        },
        {
        test: /\.jpg$/,
        type: 'asset',//如果只写asset,不写/inline /resource 会自动根据文件大小进行选择处理
        parser: {//如果文件大于4K的话，就产出生成一个新的文件，并返回新的文件路径，如果小于4K的话返回内容的base64字符串
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        }
      }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
+   new MiniCssExtractPlugin({
    //指定css目录
+      filename: 'css/[name].css'
+   })
  ]
};
```

