最佳排版实践

使用 markdown 作为输入是因为

- 可以通过 parser 转换成一个干净的数据结构
- 写 markdown 时不需要关注样式问题
- 通过复制粘贴的文字总是会有样式混乱的问题，因为微信使用了 copy as html 的复制

要解决的问题

- 解决 wordpress discuss 微信公众号排版问题，直接复制啥是啥

样式细节

- 正文
	- 行高 1.6 - 2.0
	- 大小 16px
	- 字体栈 `'Helvetica Neue', Arial, 'Hiragino Sans GB', STHeiti, 'Microsoft YaHei', 'WenQuanYi Micro Hei', SimSun, Song, sans-serif`
	- 颜色，深灰色 `rgb(70, 70, 70)` `#444;?`

- 标题
	- 大小 h1-h6 都是一种大小
	- 颜色为主题色，加粗
	- 可以有其他样式
	- 可以各种花式

- 代码
	- 字体栈
	- 字体大小

- 高亮
	- 加粗或变色

- 链接
	- `color: #105CB6;` 保持大家习惯，使用蓝色
	- 默认无下划线
	- hover 有下划线

- 引用块
	- 可以各种花式

- 分割线
	- 可以各种花式

其他样式

- `text-align: justify;`
- `word-break: break-word;`
- p `margin: 0 0 25px 0;`
