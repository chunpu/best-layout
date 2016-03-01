var bestLayout = require('./')

var markdown = '## h1\n\n > quote\n\npppp'

var html = bestLayout.getHTML(markdown)

console.log(html)
