'use strict';

var assert = require('assert');

var toRegExp = require('../lib/toRegExp');
var parseContent = require('../lib/parseContent');

var bannedWords = toRegExp(['poop', 'shit'], true);
var bannedUrls = toRegExp(['http://example.com', 'http://foo.bar']);
var nil = '^(?!x)x';
var symbol = '&#8270;';

assert.strictEqual(parseContent(
	'A whole lot of poop causes a ton of shit, shitzu, repoopulate',
	bannedWords,
	nil
), 'A whole lot of p**p causes a ton of s**t, shitzu, repoopulate');

assert.strictEqual(parseContent(
	'A whole lot of poop causes a ton of shit, shitzu, repoopulate',
	bannedWords,
	nil,
	false,
	symbol
), 'A whole lot of p&#8270;&#8270;p causes a ton of s&#8270;&#8270;t, shitzu, repoopulate');

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

var unicodeBannedWords = toRegExp(['今', '野'], true);
assert.strictEqual(parseContent(
	'載点代示早面通今就焼初哲野質',
	unicodeBannedWords,
	nil,
	false
), '載点代示早面通[censored]就焼初哲[censored]質');

console.log('parseContent passed');
