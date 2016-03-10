var SimpleMarkdown = require('simple-markdown')
var _ = require('lodash')
var debug = require('debug')('best-layout')

var mdParse = SimpleMarkdown.defaultBlockParse
var mdOutput = SimpleMarkdown.defaultOutput
var rules = SimpleMarkdown.defaultRules

var lineHeight = 1.6
var textFontSize = '16px'
var headFontSize = '20px'
var textColor = '#ccc'
var fontFamily = "'Helvetica Neue', Arial, 'Hiragino Sans GB', STHeiti, 'Microsoft YaHei', 'WenQuanYi Micro Hei', SimSun, Song, sans-serif"
var codeFontFamily = "Consolas, 'Liberation Mono', Menlo, Courier, monospace"

// https://github.com/Khan/simple-markdown/blob/master/simple-markdown.js#L546
// heading hr codeBlock blockQuote list table newline paragraph link image strong u em del inlineCode br text
// important: heading paragraph strong inlineCode blockQuote

var modernRules = {
	// weixin mail?
	paragraph: {
		html: function(node, output, state) {
			return htmlTag('p', output(node.content, state), {style: 'font-size: 16px'})
		}
	}
	, heading: {
		html: function(node, output, state) {
			return htmlTag('h' + node.level, output(node.content, state), {style: 'font-size: 20px'})
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
			return htmlTag('blockquote', output(node.content, state), {style: getCSSText({'border': '1px solid red'})})
		}
	}

}

// var aaa = getCSSText({'border': '1px solid red'})
// console.log(aaa)

rules = getBestRules(rules, oldRules)
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

function htmlTag(tagName, content, attributes, isClosed) {
	// copy from simple-markdown
    attributes = attributes || {};
    isClosed = typeof isClosed !== 'undefined' ? isClosed : true;

    var attributeString = "";
    for (var attr in attributes) {
        // Removes falsey attributes
        if (Object.prototype.hasOwnProperty.call(attributes, attr) &&
                attributes[attr]) {
            attributeString += " " + attr + '="' + attributes[attr] + '"';
        }
    }

    var unclosedTag = "<" + tagName + attributeString + ">";

    if (isClosed) {
        return unclosedTag + content + "</" + tagName + ">";
    } else {
        return unclosedTag;
    }
};
