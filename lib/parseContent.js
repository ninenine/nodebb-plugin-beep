'use strict';

var isLatin = /^\w+$/;

function parseContent(content, banned_words, banned_urls, censorWholeWord, symbol) {
  if (!content) {
    return content;
  }

  symbol = symbol || '*';

  function censor(match) {
    if (!isLatin.test(match)) {
      return '[censored]';
    }

    var l = match.length;
    var out = match[0];

    var i = l - 2;
    while (i) {
      out += symbol;
      i--;
    }

    return out + match[l - 1];
  }

  var replacement = censorWholeWord ? '[censored]' : censor;
  return content
    .replace(banned_words, replacement)
    .replace(banned_urls, '[link removed]');
}

module.exports = parseContent;
