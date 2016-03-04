var SimpleMarkdown = require('simple-markdown')
var _ = require('lodash')
var debug = require('debug')('best-layout')

var mdParse = SimpleMarkdown.defaultBlockParse
var mdOutput = SimpleMarkdown.defaultOutput
var rules = SimpleMarkdown.defaultRules

var customRules = {
	// https://github.com/Khan/simple-markdown/blob/master/simple-markdown.js#L546
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


rules = getBestRules(rules)
console.log(rules)
// console.log(rules.paragraph.html)

var htmlOutput = SimpleMarkdown.htmlFor(SimpleMarkdown.ruleOutput(rules, 'html'))

exports.getHTML = function(markdown) {
	var syntaxTree = mdParse(markdown)
	// console.log(JSON.stringify(syntaxTree, 0, 4))
	var html = htmlOutput(syntaxTree)
	return html
}

function getBestRules(rules) {
	var ret = {}
	_.forIn(rules, function(val, key) {
		ret[key] = _.extend({}, val, customRules[key])
	})
	return ret
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
