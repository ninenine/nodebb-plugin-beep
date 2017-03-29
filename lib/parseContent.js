'use strict';

var isLatin = /^\w+$/;

function parseContent(content, banned_words, banned_urls, censorWholeWord, is_topic) {
  if (!content) {
    return content;
  }
  // from http://htmlarrows.com/symbols/
  var sym = is_topic ? '*' : '&#8270;';

  function censor(match) {
    if (!isLatin.test(match)) {
      return '[censored]';
    }

    var l = match.length;
    var out = match[0];

    var i = l - 2;
    while (i) {
      out += sym;
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
