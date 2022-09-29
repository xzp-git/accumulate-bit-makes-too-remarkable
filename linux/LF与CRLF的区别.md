# LF 与 CRLF 的区别

首先，要了解 `\n` 与 `\r\n` 的区别，在 [Difference between \n and \r?](https://stackoverflow.com/questions/15433188/r-n-r-and-n-what-is-the-difference-between-them) 中有这样的示意：

- `\r` = CR (Carriage Return) → Used as a new line character in Mac OS before X
- `\n` = LF (Line Feed) → Used as a new line character in Unix/Mac OS X
- `\r\n` = CR + LF → Used as a new line character in Windows

简单而言，现在除了 `Windows` 把 `\r\n` 作为换行符，其他系统都是把 `\n` 作为了换行符。

也可以在山月自制的小工具 [ASCII Table](https://devtool.tech/ascii/13) 中查看二者的 ASCII 编码。