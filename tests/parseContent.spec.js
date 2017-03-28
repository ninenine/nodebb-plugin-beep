'use strict';

var assert = require('assert');

var toRegExp = require('../lib/toRegExp');
var parseContent = require('../lib/parseContent');

var bannedWords = new RegExp('\\b(?:' + toRegExp(['poop', 'shit']) + ')\\b', 'ig');
var bannedUrls = new RegExp(toRegExp(['http://example.com', 'http://foo.bar']), 'ig');
var nil = '^(?!x)x';

assert.strictEqual(parseContent(
  'A whole lot of poop causes a ton of shit, shitzu, repoopulate',
  bannedWords,
  nil,
  false
), 'A whole lot of p**p causes a ton of s**t, shitzu, repoopulate');

assert.strictEqual(parseContent(
  'A whole lot of poop causes a ton of shit, shitzu, repoopulate',
  bannedWords,
  nil,
  true
), 'A whole lot of [censored] causes a ton of [censored], shitzu, repoopulate');

assert.strictEqual(parseContent(
  'My favorite website is http://example.com. I also love http://foo.bar.',
  nil,
  bannedUrls,
  false
), 'My favorite website is [link removed]. I also love [link removed].');
