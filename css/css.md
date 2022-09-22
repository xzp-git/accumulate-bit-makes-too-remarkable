# CSS 整理

## css variable

- `css` 变量减少样式重复定义，比如同一个颜色值要在多个地方重复使用，以前可以通过 `less` 和 `scss` 预处理去做，现在 `css` 变量也可以做到, 方便维护, 可高可读性

```css
:root {
  --bgcolor: blue;
  --color: red;
}
p {
  color: var(--color);
}
div {
  backgroung-color: var(--bgcolor);
  color: var(--color);
}
```

- 在媒体查询中使用, 精简代码, 减少冗余

```css
.box {
  --base-size: 10;
  width: calc(var(--base-size) * 10px);
  height: clac(var(--base-size) * 5px);
  padding: calc(var(--base-size) * 1px);
}
@media screen and (min-width: 1480px) {
  .box {
    --base-size: 8;
  }
}
```

- 方便在 js 中使用
  可以在运行时控制 `css` 逻辑, 与 `less/sass` 相比, 更加灵活, 因为它很容易通过 js 来控制

```js
// 设置变量
document.getElementById("box").style.setPropertyValue("--color", "pink");
// 读取变量
doucment.getElementById("box").style.getPropertyValue("--color").trim(); //pink
// 删除变量
document.getElementById("box").style.removeProperty("--color");
```

## css 如何匹配前 N 个子元素及最后 N 个子元素

- 最前三个子元素 `:nth-child(-n+3)`
- 最后三个子元素 `:nth-last-child(-n+3)`

## 如何使用 CSS 实现网站的暗黑模式 (Dark Mode)

```css
html[theme="dark-model"] {
  filter: invert(1) hue-rotate(180);
  transition: color 300ms, background-color 300ms; /*过渡动画*/
}
```

解释： css 的 filter 属性 是将用于图片上的过滤，颜色变化等图形效果应用与元素上， 上面所使用到的 invert 可以用来反转应用程序的颜色; hue-rotate 是用来改变图像上的应用色颜色 通过 invert(1)将白色变成黑色，那么为了适配颜色的变化，网页上的图像的颜色应该也做一个改变，这个改变就是通过 hue-rotate(180edg)来实现的 filter 属性 其他著名的应用还有: _ blur() 模糊图像 _ opacity() 图像透明程度 _ drop-shadow() 对图像应用阴影效果 _ ...

## 介绍 CSS 隐藏页面中某个元素的几种方法

- 01 display: none
  通过 CSS 操控 display，移出文档流

```css
display: none;
```

- #02 opacity: 0
  透明度为 0，仍在文档流中，当作用于其上的事件(如点击)仍有效

```css
opacity: 0;
```

- #03 visibility: hidden
  透明度为 0，仍在文档流中，但作用于其上的事件(如点击)无效，这也是 visibility:hidden 与 opacity: 0 的区别

```csss
visibility: hidden;
```

- #04 content-visibility
  移出文档流，但是再次显示时消耗性能低

```css
content-visibility: hidden;
```

- 05 绝对定位于当前页面的不可见位置
  ```csss
  position: absolute;
  top: -9000px;
  left: -9000px;
  ```
- 06 字体大小设置为 0
  ```css
  font-size: 0;
  ```

## css 如何实现响应式布局大屏幕三等分、中屏幕二等分、小屏幕一等分

- 终极解决方案
  Grid 布局可以自动判断容器大小，无论大小屏幕自动撑满并均分，请看以下属性

```css
.container {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
```

repeat: 用以 N 整分
auto-fill：表示自动填充
minmx: 即书面意思，最小宽度为 300px
