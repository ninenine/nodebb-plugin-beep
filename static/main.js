(function() {
    'use strict';
    var badwords = [];
    jQuery('document').ready(function() {
        $.get(RELATIVE_PATH + '/api/plugins/beep').done(function(banned_words) {
            badwords = banned_words.split(',');
        }).fail(function() {
            badwords = [
                'anal',
                'anus',
                'arse',
                'ass',
                'ballsack',
                'balls',
                'bastard',
                'bitch',
                'biatch',
                'bloody',
                'blowjob',
                'blow job',
                'bollock',
                'bollok',
                'boner',
                'boob',
                'bugger',
                'bum',
                'butt',
                'buttplug',
                'clitoris',
                'cock',
                'coon',
                'crap',
                'cunt',
                'damn',
                'dick',
                'dildo',
                'dyke',
                'fag',
                'feck',
                'fellate',
                'fellatio',
                'felching',
                'fuck',
                'f u c k',
                'fudgepacker',
                'fudge packer',
                'flange',
                'homo',
                'jerk',
                'jizz',
                'knobend',
                'knob end',
                'labia',
                'muff',
                'nigger',
                'nigga',
                'penis',
                'piss',
                'poop',
                'prick',
                'pube',
                'pussy',
                'queer',
                'sex',
                'shit',
                's hit',
                'sh1t',
                'slut',
                'smegma',
                'spunk',
                'tit',
                'tosser',
                'turd',
                'twat',
                'vagina',
                'wank',
                'whore'
            ];
        });
        $(window).on('action:ajaxify.end', function(ev, data) {
            if (data.url.match(/^category/) || data.url.match(/^unread/) || data.url.match(/^recent/) || data.url.match(/^popular/) || data.url.match(/^topic/) || data.url.match(/^user/)) {
                censorTopics();
            }
            if (data.url.match(/^topic/)) {
                $(window).on('scroll', censorTopics);
            } else {
                $(window).off('scroll', censorTopics);
            }
            if (data.url.match(/^chats/)) censorChatTeaser();
        });
        $(window).on('action:categories.loaded', censorTopics);
        $(window).on('action:categories.new_topic.loaded', censorTopics);
        $(window).on('action:topic.loaded', censorTopics);
        $(window).on('action:topics.loaded', function() {
            //delay to display the topics
            setTimeout(censorTopics, 270);
        });
          socket.on('event:post_edited', function() {
            setTimeout(censorTopics, 270);
        });
    });

    function censorTopics() {
        for (var w in badwords) {
            var re = new RegExp(badwords[w], 'ig');
            var hidesting = '';
            for (var i = 0; i < badwords[w].length - 2; i++) {
                hidesting += '*';
            }
            var re2 = new RegExp(badwords[w].substring(1, badwords[w].length - 1), 'ig');
            //Change topic title on topic list and topic
            $('[component="post"] .topic-title, [component="topic/header"] [itemprop="url"], [component="post/header"] > *').each(function() {
                if (re.test($(this).html())){
                    var match = $(this).html().match(re);
                    var hashword = match[0].replace(re2, hidesting);
                    $(this).html($(this).html().replace(re, hashword));
                }
            });
            //Change Breadcrumb
            var rnotwhite = /\S/;
            $('ol.breadcrumb li span, ol.breadcrumb li').contents().filter(function() {
                return this.nodeType === 3 && rnotwhite.test($(this).text()); // Filter out empty text nodes. We only want text nodes with text.
            }).text(function(i, text) {
                var match = text.match(re);
                if (match && match.length > 0) {
                    var hashword = match[0].replace(re2, hidesting);
                    this.nodeValue = text.replace(re, hashword);
                }
            });
            //Change header information
            $('.header-topic-title span').each(function() {
                if (re.test($(this).html())){
                    var match = $(this).html().match(re);
                    var hashword = match[0].replace(re2, hidesting);
                    $(this).html($(this).html().replace(re, hashword));
                }
            });
            if (re.test(document.title)){
                var match = document.title.match(re);
                var hashword = match[0].replace(re2, hidesting);
                document.title = document.title.replace(re, hashword);
            }

            // Meta title and og:title
            $('meta[name="title"], meta[property="og:title"]').each(function() {
                var title = $(this).attr('content');
                if (title) {
                    var match = title.match(re);
                    if (match && match.length > 0) {
                        var hashword = match[0].replace(re2, hidesting);
                        $(this).attr('content', title.replace(re, hashword));
                    }
                }
            });

        }
    }
    // Has to be a better way of doing this :/
    function censorChatTeaser(){
        for (var w in badwords) {
            var re = new RegExp(badwords[w], 'ig');
            var hidesting = '';
            for (var i = 0; i < badwords[w].length - 2; i++) {
                hidesting += '*';
            }
            var re2 = new RegExp(badwords[w].substring(1, badwords[w].length - 1), 'ig');
            // Last Chat teaser
            $('[component="chat/recent"] .teaser-content').each(function() {
                if (re.test($(this).html())){
                    var match = $(this).html().match(re);
                    var hashword = match[0].replace(re2, hidesting);
                    $(this).html($(this).html().replace(re, hashword));
                }
            });
        }
    }
}());
