// ==UserScript==
// @name           BJATweetFilter
// @namespace      http://lojic.com
// @description    Remove tweets matching keywords
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

// This userscript allows hiding tweets that contain specified
// keywords. To install, first copy/paste jQuery 2.1.0 where indicated
// below. To use, simply append a search string to the Twitter URL to
// specify the keywords as follows:
// https://twitter.com/?keywords=RunKeeper,opportunity,kittens
//
// You could bookmark the URL for ease of use.

// VVV Copy/paste jQuery 2.1.0 below here before installing userscript

// ^^^ Copy/paste jQuery 2.1.0 above here before installing userscript

var BJATwitter = (function () {
  // Rather than attempt to trap scroll events while the twitter feed
  // is infinitely scrolling, simply run every timeOutms milliseconds
  // and re-filter the feed.
  var timeOutms = 250; 

  var getSearchParams = function () {
    var pairs = window.location.search.substring(1).split("&");
    var obj = {};
    var pair;
    var i;
    
    for (i = 0; i < pairs.length; i +=1) {
      if (pairs[i] === "") { continue; }
      
      pair = pairs[i].split("=");
      obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    
    return obj;
  };
  
  var getKeywords = function () {
    keyword_str = getSearchParams()['keywords'];
    
    if (typeof(keyword_str) === "undefined") {
      return [];
    } else {
      return keyword_str.split(/,/);
    }
  };

  var keywords = getKeywords();
  
  var filterTweets = function () {
    var i;

    if (keywords.length < 1) { return; }
    
    for (i = 0; i < keywords.length; i += 1) {
      jQuery("p.js-tweet-text:contains(" + keywords[i] + ")").closest("li.js-stream-item").hide();
    }

    setTimeout(filterTweets, timeOutms);
  };
  
  return {
    filterTweets : filterTweets
  };
})();

BJATwitter.filterTweets();
