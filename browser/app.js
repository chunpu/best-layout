var bestLayout = require('../')
var _ = require('lodash')
var Clipboard = require('clipboard')
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

	/*
	new Clipboard('#copy', {
		text: function(trigger) {
			console.log(trigger)
			debugger
			return '<h1>xxxx</h1>'
		}
	})
	*/

	var $doc = $(document)
	$doc.on('copy', function(e) {
		var df = e.originalEvent.clipboardData
		var selection = window.getSelection()
		var range = selection.getRangeAt(0)
		var fragment = range.cloneContents()
		var html = $('<div>').append(fragment).html()
		console.log(html)
		df.setData('text/html', html)
		return false
	})

}
