var IGNORE_NODES  = ['A', 'SCRIPT', 'TEXTAREA']
var ISBN_RE = /\b[-0-9X]{10,}\b/ig

var node

var walker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_TEXT,
  function(node) {
    return (IGNORE_NODES.indexOf(node.parentNode.tagName) > -1) ?
      NodeFilter.FILTER_REJECT :
      NodeFilter.FILTER_ACCEPT
  }
)

while (node = walker.nextNode()) {
  node.nodeValue.replace(ISBN_RE, function(isbn) {
    if (isISBN(isbn)) {
      appendISBNLink(isbn)
    }
  })
}

function isISBN(isbn) {
  var length = isbn.replace(/[^\d]/g, '').length
  return length == 10 || length == 13
}

function appendISBNLink(isbn) {
  var span = document.createElement('span')
  span.style.backgroundColor = '#ccc'
  span.style.fontSize = 'x-small'
  span.innerHTML = '[' +
    '<a href="http://isbndb.com/search-all.html?kw=' + isbn + '">' +
      isbn + ' @ ISBNdb' +
    '</a>' +
  ']'

  var parent = node.parentNode
  parent.appendChild(document.createTextNode(' '))
  parent.appendChild(span)
}
