var bestLayout = require('./')

var markdown = `
## 微信不能自定义字体

> 微信不能自定义字体


ppppp \`code\` code
`

var markdown = `
京东 App 5.0 更新支持了 Apple Pay，是不是我们以后的支付方式要改变了呢？

根据网友实测京东支付的 MCC 为 4899，和京东原本走的银联在线支付一样

> MCC 表示商户类别代码，全称是 Merchant Category Code，由中国银联统一设置

查一下 4899 这个 MCC

> 商户类别码: 4899
> 类别名: 有线和其它付费电视服务
> 费率: 0.38%
> 积分概况: 有积分
> 无积分黑名单: 中国银行,中信银行,民生银行,招商银行,兴业银行,上海银行,平安银行

也就是说大部分信用卡在京东用 Apple Pay 都是没有积分的，因此它并不是我们首选的支付方法

那问题来了，怎样才是正确的支付姿势呢？

### 浦发卡

如果有浦发卡，且注册了财付通5倍积分，请选择**微信支付**，拿浦发的5倍积分

### 线下高回报卡

如果有线下支付高倍积分卡，比如中信4-8倍积分的悦卡，请选择**货到付款**，然后刷信用卡支付，货到付款的 MCC 一般为 5411

> 商户类别码: 5411
> 类别名: 大型仓储式超级市场
> 费率: 0.38%
> 积分概况: 有积分
> 无积分黑名单: 工商银行,中国银行

这是中信持卡者比较喜欢的 MCC

### 上述两者都没有

如果不仅没有浦发卡，也没有高倍积分卡，还可以选择京东白条支付，30天后，再用信用卡还款，账期最长可以做到80天（30 + 50）, 也就是说一次购物可以两个月后还

注意有些信用卡还京东白条也是有积分的，比如浦发信用卡

而中信持卡者还可以通过还款完成**中信9积分**任务，具体做法就是每次还款都凑满**299元**以上，然后分多次还款
`

var html = bestLayout.getHTML(markdown)

console.log(html)
