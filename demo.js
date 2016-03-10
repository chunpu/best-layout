var bestLayout = require('./')

var markdown = `
## h1

> quote


ppppp \`code\` code
`

var html = bestLayout.getHTML(markdown)

console.log(html)
