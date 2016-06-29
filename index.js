(function() {
    'use strict';
    var winston = module.parent.require('winston'),
        _ = require('underscore'),
        fs = require('fs'),
        path = require('path'),
        meta = module.parent.require('./meta');

    _.str = require('underscore.string');
    _.mixin(_.str.exports()); // Mix in non-conflict functions to Underscore namespace
    var Beep = {
        banned_words: undefined,
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
        loadList: function() {
            // Load Banned Words from config
            meta.settings.getOne('beep', 'id', function(err, banned_words) {
                if (!err && banned_words && banned_words.length) {
                    Beep.banned_words = banned_words;
                } else {
                    Beep.banned_words = 'anal,anus,arse,ass,ballsack,balls,bastard,bitch,biatch,bloody,blowjob,blow job,bollock,bollok,boner,boob,bugger,bum,butt,buttplug,clitoris,cock,coon,crap,cunt,damn,dick,dildo,dyke,fag,feck,fellate,fellatio,felching,fuck,f u c k,fudgepacker,fudge packer,flange,homo,jerk,jizz,knobend,knob end,labia,muff,nigger,nigga,penis,piss,poop,prick,pube,pussy,queer,sex,shit,s hit,sh1t,slut,smegma,spunk,tit,tosser,turd,twat,vagina,wank,whore';
                    winston.info('Default list of Banned Words is enabled. Please go to administration panel to change the list.');
                }
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
            var postContent = data.postData.content;
            var badwords = Beep.banned_words.split(',');
            badwords = _.map(badwords, function(word) {
                return _.trim(word);
            });
            for (var w in badwords) {
                var re = new RegExp('\\b'+badwords[w]+'\\b', 'ig');
                var hidesting = '';
                for (var i = 0; i < badwords[w].length - 2; i++) {
                    hidesting += '*';
                }
                var re2 = new RegExp(badwords[w].substring(1, badwords[w].length - 1), 'ig');
                if (postContent.match(re)) {
                    var match = postContent.match(re);
                    var hashword = match[0].replace(re2, hidesting);
                    postContent = postContent.replace(re, hashword);
                }
            }
            data.postData.content = postContent;
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
