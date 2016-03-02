var bestLayout = require('../')
var _ = require('lodash')
var debug = require('debug')('best-layout:app')

$(init)

function init() {

	var $input = $('#textarea')
	var $iframe = $('#iframe')

	debug('ready')

	var evName = 'keyup'

	var demoMarkdown = require('raw!./demo.md')
	var template = require('raw!./template.html')
	var css = require('raw!./default.css')
	console.log(css)

	$input.on(evName, _.debounce(function() {
		debug(evName)
		var markdown = $input.val()
		var html = bestLayout.getHTML(markdown)
		var doc = template.replace('{{html}}', html).replace('{{css}}', css)
		$iframe.attr('srcdoc', doc)
	}, 800, {leading: true, trailing: true, maxWait: 3000})).val(demoMarkdown).trigger(evName)

}
