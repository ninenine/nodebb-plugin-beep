(function() {
    'use strict';
    var winston = module.parent.require('winston');
    var _ = require('underscore');
    var fs = require('fs');
    var path = require('path');
    var meta = module.parent.require('./meta');
    var utils = require.main.require('./public/src/utils');

    _.str = require('underscore.string');
    _.mixin(_.str.exports()); // Mix in non-conflict functions to Underscore namespace
    var Beep = {
        banned_words: undefined,
        banned_urls: undefined,
        illegal_words: undefined,
        init: function(params, callback) {
            var router = params.router;
            var middleware = params.middleware;

            function render(req, res, next) {
                res.render('admin/plugins/beep', {});
            }
            router.get('/admin/plugins/beep', middleware.admin.buildHeader, render);
            router.get('/api/admin/plugins/beep', render);
            router.get('/api/plugins/beep', function(req, res) {
                if (Beep.banned_words) {
                    res.status(200).send(Beep.banned_words);
                } else {
                    res.status(501);
                }
            });
            Beep.loadList();
            callback();
        },
        appendConfig: function(config, callback) {
            meta.settings.getOne('beep', 'censorWholeWord', function(err, censorWholeWord) {
                if (err) {
                    return callback(null, config);
                }

                config.beep = {
                    censorWholeWord: censorWholeWord === 'on'
                }

                callback(err, config);
            });
        },
        loadList: function() {
            // Load Banned Words from config
            meta.settings.get('beep', function(err, hash) {
                if (!err && hash.id && hash.id.length) {
                    Beep.banned_words = hash.id;
                } else {
                    Beep.banned_words = 'anal,anus,arse,ass,ballsack,balls,bastard,bitch,biatch,bloody,blowjob,blow job,bollock,bollok,boner,boob,bugger,bum,butt,buttplug,clitoris,cock,coon,crap,cunt,damn,dick,dildo,dyke,fag,feck,fellate,fellatio,felching,fuck,f u c k,fudgepacker,fudge packer,flange,homo,jerk,jizz,knobend,knob end,labia,muff,nigger,nigga,penis,piss,poop,prick,pube,pussy,queer,sex,shit,s hit,sh1t,slut,smegma,spunk,tit,tosser,turd,twat,vagina,wank,whore';
                    winston.info('Default list of Banned Words is enabled. Please go to administration panel to change the list.');
                }

                Beep.banned_urls = hash.urls || "";
                Beep.illegal_words = hash.illegal || "";
                Beep.censorWholeWord = hash.censorWholeWord === 'on';
            });
        },
        onListChange: function(hash) {
            if (hash === 'settings:beep') {
                Beep.loadList();
            }
        },
        parse: function(data, callback) {
            if (!data || !data.postData || !data.postData.content) {
                return callback(null, data);
            }

            data.postData.content = Beep.parseContent(data.postData.content);
            callback(null, data);
        },
        parseRaw: function(content, callback) {
            if (!content) {
                return callback(null, content);
            }

            content = Beep.parseContent(content);
            callback(null, content);
        },
        parseSignature: function(data, callback) {
            if (!data || !data.userData || !data.userData.signature) {
                return callback(null, data);
            }

            data.userData.signature = Beep.parseContent(data.userData.signature);
            callback(null, data);
        },
        parseContent: function(content) {

            var badwords = (Beep.banned_words ? Beep.banned_words.split(',') : []);
            badwords = _.map(badwords, function(word) {
                return utils.escapeRegexChars(_.trim(word));
            });

            var re = new RegExp('\\b(' + badwords.join('|') + ')\\b', 'ig');

            var badurls = (Beep.banned_urls ? Beep.banned_urls.split(',') : []);
            badurls = _.map(badurls, function(word) {
                return _.trim(word);
            });

            var censor = function(match) {
                if (!Beep.censorWholeWord) {
                    return match[0] + Array(match.length-1).join('*') + match[match.length-1];
                } else {
                    return '[censored]';
                }
            };

            content = content.replace(re, censor);

            for (var u in badurls) {
                //var re = new RegExp('!?\\[[\\s\\S]*?\\]\\([\\s\\S]*?' + badurls[u] + '[\\s\\S]*?\\)', 'ig')
                var re = new RegExp(badurls[u], 'ig'); //just werks :)
                content = content.replace(re, '[link removed]');
            }

            return content;
        },
        parseTopicData: function(data, callback) {
            data.topic.title = Beep.parseContent(data.topic.title);
            callback(null, data);
        },
        checkForIllegalWords: function(data, callback) {
            var postContent = data.content;
            var illegal_words = (Beep.illegal_words ? Beep.illegal_words.split(',') : []);
            illegal_words = _.map(illegal_words, function(word) {
                return _.trim(word);
            });

            for (var w in illegal_words) {
                if (postContent.toLowerCase().match(illegal_words[w])) {
                    return callback(new Error('You may not use the word "' + illegal_words[w] + '" in your post.'));
                }
            }

            callback(null, data);
        },
        admin: {
            menu: function(custom_header, callback) {
                custom_header.plugins.push({
                    'route': '/plugins/beep',
                    'icon': 'fa-microphone-slash',
                    'name': 'Censor Curse Words'
                });
                callback(null, custom_header);
            }
        }
    };
    module.exports = Beep;
})();
