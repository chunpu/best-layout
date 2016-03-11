var SimpleMarkdown = require('simple-markdown')
var _ = require('lodash')
var debug = require('debug')('best-layout')

var mdParse = SimpleMarkdown.defaultBlockParse
var mdOutput = SimpleMarkdown.defaultOutput
var rules = SimpleMarkdown.defaultRules

var lineHeight = 1.6
var textFontSize = '16px'
var headFontSize = '20px'
var themeColor = 'green'
var textColor = '#333'
var lightTextColor = '#888'
var serif = ''
var sansSerif = 'Helvetica, Arial, 微软雅黑, SimSun, Song, sans-serif'
// var fontFamily = "'Helvetica Neue', Arial, 'Hiragino Sans GB', STHeiti, 'Microsoft YaHei', 'WenQuanYi Micro Hei', SimSun, Song, sans-serif"
var fontFamily = 'Helvetica Neue, Arial, Hiragino Sans GB, STHeiti, Microsoft YaHei, WenQuanYi Micro Hei, SimSun, Song, sans-serif'
var fontFamily = ""
var codeFontFamily = "Consolas, 'Liberation Mono', Menlo, Courier, monospace"

// https://github.com/Khan/simple-markdown/blob/master/simple-markdown.js#L546
// heading hr codeBlock blockQuote list table newline paragraph link image strong u em del inlineCode br text
// important: heading paragraph strong inlineCode blockQuote

var modernRules = {
	// weixin mail?
	paragraph: {
		html: function(node, output, state) {
			var style = {
				  color: textColor
				, 'line-height': lineHeight
				, 'font-size': textFontSize
				, 'font-family': fontFamily
				, 'font-weight': 'normal'
			}
			var raw = htmlTag('p', output(node.content, state), {style: getCSSText(style)})
			return raw
		}
	}
	, heading: {
		html: function(node, output, state) {
			var style = {
				  color: themeColor
				, 'line-height': lineHeight
				, 'font-size': headFontSize
				// , 'font-family': fontFamily + ", 'Helvetica Neue'"
				, 'font-weight': 'bold'
			}
			var raw = htmlTag('h' + node.level, output(node.content, state), {style: getCSSText(style)})
			// var raw = htmlTag('section', output(node.content, state), {style: getCSSText(style)})
			return raw
		}
	}
	, inlineCode: {
		html: function(node, output, state) {
			var style = {
				// 'font-family': codeFontFamily
			}
			return htmlTag('code', node.content, {style: getCSSText(style)})
		}
	}
	, blockQuote: {
		html: function(node, output, state) {
			var style = {
				border: '1px solid red'
			}
			return htmlTag('blockquote', output(node.content, state), {style: getCSSText(style)})
		}
	}
}

var oldRules = {
	// discuz
	// font support `style="background-color: xxx"`
	paragraph: {
		html: function(node, output, state) {
			var font = htmlTag('font', output(node.content, state), {face: fontFamily, size: 3, color: textColor})
			return htmlTag('div', font)
		}
	}
	, heading: {
		html: function(node, output, state) {
			return htmlTag('h' + node.level, output(node.content, state), {face: fontFamily, size: 2, color: textColor})
		}
	}
	, inlineCode: {
		html: function(node, output, state) {
			return htmlTag('font', node.content, {face: codeFontFamily})
		}
	}
	, blockQuote: {
		html: function(node, output, state) {
			return htmlTag('blockquote', output(node.content, state), {})
		}
	}
	, strong: {
		html: function(node, output, state) {
			return htmlTag('strong', output(node.content, state), {})
		}
	}
}

// var aaa = getCSSText({'border': '1px solid red'})
// console.log(aaa)

rules = getBestRules(rules, modernRules)
console.log(rules)
// console.log(rules.paragraph.html)

var htmlOutput = SimpleMarkdown.htmlFor(SimpleMarkdown.ruleOutput(rules, 'html'))

exports.getHTML = function(markdown) {
	var syntaxTree = mdParse(markdown)
	// console.log(JSON.stringify(syntaxTree, 0, 4))
	var html = htmlOutput(syntaxTree)
	return html
}

function getBestRules(rules, customRules) {
	var ret = {}
	_.forIn(rules, function(val, key) {
		ret[key] = _.extend({}, val, customRules[key])
	})
	return ret
}

function getCSSText(obj) {
	return _.map(_.keys(obj), function(key) {
		return key + ':' + obj[key]
	}).join(';')
}

function htmlTag(tagName, content, attr, isClosed) {
	// copy from simple-markdown
    isClosed = typeof isClosed !== 'undefined' ? isClosed : true;
	attr = _.map(_.keys(attr), function(key) {
		var val = attr[key]
		val = val.replace(/"/g, '\\"')
		return key + '="' + val + '"'
	}).join(' ')

    var unclosedTag = "<" + tagName + ' ' + attr + ">";

    if (isClosed) {
        return unclosedTag + content + "</" + tagName + ">";
    } else {
        return unclosedTag;
    }
};
