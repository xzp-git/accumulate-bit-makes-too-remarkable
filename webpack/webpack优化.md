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

## 8. 压缩JS、css、和HTML

> 如果 mode 是 production，会默认启用压缩插件，下面是的方式是当mode不为production时，自己配置压缩 

- [optimize-css-assets-webpack-plugin](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin) 是一个优化和压缩css资源的插件
- [terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin) 是一个优化和压缩JS资源的插件

```js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode:'none',
    optimization:{
        //启用压缩
        minimize: true,
        //压缩工具，用这个工具压缩js
        minimizer:[
            new TerserPlugin()
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify:{
                //坍塌空格
                collapseWhitespace:true,
                //移出注释
                removeComments:true
            }
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ]
}
```

## 9.CDN

- `cdn` 又叫内容分发网络，通过把资源部署到世界各地，用户在访问是按照就近原则从离用户最近的服务器获取资源，从而加速资源的获取速度

### 9.1 使用缓存

- HTML文件不缓存，放在自己的服务器上，关闭自己服务器的缓存，静态资源的URL变成指向CDN服务器的地址
- 静态的JavaScript、css、图片等文件开启CDN和缓存，并且文件名带上HASH值
- 为了并行加载不阻塞，把不同的静态资源分配到不同的cdn服务器上

### 9.2 域名限制

- 同一时刻针对同一个域名的资源并行请求是有限制的
- 可以把这些静态资源分散到不同的CDN服务器上去

- 多个域名后会增加域名解析时间
  - 可以通过在HTML HEAD标签中 加入 `<link rel="dns-prefetch" href="http://example.com">` 去预解析域名，以降低域名解析带来的延迟

### 9.3文件指纹

- 打包后输出的文件名和后缀

- `hash` 一般是结合 `CDN` 缓存来使用，通过 `webpack` 构建后，生成对应文件名自动带上对应的MD5值。如果文件内容改变的话，那么对应文件哈希值也会改变，对应的HTML引用的URL地址也会改变，触发CDN服务器从源服务器上拉去对应数据，进而更新本地缓存。

- 指纹占位符

  | 占位符名称  | 含义                                                   |
  | ----------- | ------------------------------------------------------ |
  | ext         | 资源后缀名                                             |
  | name        | 文件名称                                               |
  | path        | 文件的相对路径                                         |
  | folder      | 文件所在的文件夹                                       |
  | hash        | 每次webpack构建是生成一个唯一的hash值                  |
  | chunkhash   | 根据chunk生成hash值，来源于同一个chunk，则hash值就一样 |
  | contenthash | 根据内容生成hash值，文件内容相同hash值就相同           |

## 10.moduleIds & chunkIds的优化

### 10.1概念和选项

- module 每一个文件其实都可以看成一个 module
- chunk webpack打包最终生成的代码块，代码块会生成文件，一个文件对应一个chunk
- 在webpack5之前，没有从entry打包的chunk文件，都会以1、2、3、...的文件命名方式输出，删除某些文件可能会导致缓存失败
- 在生产模式下，默认启用这些功能 `chunkIds:"deterministic"` `moduleIds:"deterministic"` ，此算法采用确定性的方式将短数字ID（3或4个字符）短hash值分配给modules和chunks
- chunkId设置为deterministic，则output中chunkFilename里的[name]会被替换成确定性短数字ID
- 虽然chunkId不变(不管值是deterministic | natural | named)，但更改chunk内容，chunkhash还是会改变的

| 可选值        | 含义                         | 示例          |
| :------------ | :--------------------------- | :------------ |
| natural       | 按使用顺序的数字ID           | 1             |
| named         | 方便调试的高可读性id         | src_two_js.js |
| deterministic | 根据模块名称生成简短的hash值 | 915           |
| size          | 根据模块大小生成的数字id     | 0             |

### 10.2 webpack.config.js

```js
const path = require('path');
module.exports = {
    mode: 'development',
    devtool:false,
+   optimization:{
+       moduleIds:'deterministic',
+       chunkIds:'deterministic'
+   }
}
```

