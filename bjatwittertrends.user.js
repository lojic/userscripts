// ==UserScript==
// @name           BJATwitterTrends
// @namespace      http://lojic.com
// @description    Remove trends from twitter 2
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

// Hide the trends area from the Twitter web UI

var GM_addGlobalStyle = function(css) {
  var sel=document.createElement('style'); 
  sel.setAttribute('type','text/css'); 
  sel.appendChild(document.createTextNode(css));
  var hel=document.documentElement.firstChild; 

  while(hel && hel.nodeName!='HEAD') { 
    hel=hel.nextSibling; 
  }
  
  if(hel && hel.nodeName=='HEAD') { 
    hel.appendChild(sel); 
  } else { 
    document.body.insertBefore(sel,document.body.firstChild); 
  }
  
  return sel;
}

GM_addGlobalStyle('.trends-inner { display: none; }');
