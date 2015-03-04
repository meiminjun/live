(function(f){f.fn.flipCounter=function(h){function g(){return"undefined"==typeof b.data("flipCounter")?!1:!0}function a(a){a=b.data("flipCounter")[a];return"undefined"!==typeof a?a:!1}function e(a,f){var d=b.data("flipCounter");d[a]=f;b.data("flipCounter",d)}function s(){1>b.children('[name="'+a("counterFieldName")+'"]').length&&b.append('<input type="hidden" name="'+a("counterFieldName")+'" value="'+a("number")+'" />');var c=b.children("."+a("digitClass")).length,e=l().length;if(e>c)for(i=0;i<e-
c;i++){var d=f('<span class="'+a("digitClass")+'" style="'+p("0")+'" />');b.prepend(d)}else if(e<c)for(i=0;i<c-e;i++)b.children("."+a("digitClass")).first().remove();b.find("."+a("digitClass")).each(function(){0==f(this).find("span").length&&f(this).append('<span style="visibility:hidden">0</span>')})}function m(){s();var c=l(),e=b.children("."+a("digitClass")),d=0;f.each(e,function(){digit=c.toString().charAt(d);f(this).attr("style",p(digit));f(this).find("span").text(digit.replace(" ","&nbsp;").toString());
d++});b.children('[name="'+a("counterFieldName")+'"]').val(a("number"))}function q(){var c=parseFloat(b.children('[name="'+a("counterFieldName")+'"]').val());return!1==(c==c)?!1:c}function l(){var c=a("number");if("number"!==typeof c)return f.error("Attempting to render non-numeric value."),"0";var b="";if(a("formatNumberOptions"))f.formatNumber?b=f.formatNumber(c,a("formatNumberOptions")):f.error("The numberformatter jQuery plugin is not loaded. This plugin is required to use the formatNumberOptions setting.");
else if(0<=c){for(var d=a("numIntegralDigits")-c.toFixed().toString().length,e=0;e<d;e++)b+="0";b+=c.toFixed(a("numFractionalDigits"))}else b="-"+Math.abs(c.toFixed(a("numFractionalDigits")));return b}function p(b){var e="height:"+a("digitHeight")+"px; width:"+a("digitWidth")+"px; display:inline-block; background-image:url('"+a("imagePath")+"'); background-repeat:no-repeat; ",d=[];d["1"]=0*a("digitWidth");d["2"]=-1*a("digitWidth");d["3"]=-2*a("digitWidth");d["4"]=-3*a("digitWidth");d["5"]=-4*a("digitWidth");
d["6"]=-5*a("digitWidth");d["7"]=-6*a("digitWidth");d["8"]=-7*a("digitWidth");d["9"]=-8*a("digitWidth");d["0"]=-9*a("digitWidth");d["."]=-10*a("digitWidth");d["-"]=-11*a("digitWidth");d[","]=-12*a("digitWidth");d[" "]=-13*a("digitWidth");return b in d?e+"background-position: "+d[b]+"px 0px;":e}function r(){function c(){d+=1E3;j=Math.floor(d);Math.round(j)==j&&(j+=".0");e("elapsed",j);var a=(new Date).getTime()-f-d,l=0,l="function"==typeof k?k.apply(b,[!1,d,g,n,h]):d/h*n+g;e("number",l);e("time",d);
m();d<h?e("interval",window.setTimeout(c,1E3-a)):o()}var f=a("start_time"),d=a("time"),j=a("elapsed"),g=a("start_number"),n=a("end_number")-a("start_number");if(0==n)return!1;var h=a("duration"),k=a("easing");e("animating",!0);window.setTimeout(c,1E3)}function o(){if(!1==a("animating"))return!1;clearTimeout(a("interval"));e("start_time",!1);e("start_number",!1);e("end_number",!1);e("time",0);e("animating",!1);e("paused",!1);var c=a("onAnimationStopped");"function"==typeof c&&c.call(b,b)}var b=!1,
t={number:0,numIntegralDigits:1,numFractionalDigits:0,digitClass:"counter-digit",counterFieldName:"counter-value",digitHeight:40,digitWidth:30,imagePath:"img/flipCounter-medium.png",easing:!1,duration:1E4,onAnimationStarted:!1,onAnimationStopped:!1,onAnimationPaused:!1,onAnimationResumed:!1,formatNumberOptions:!1},k={init:function(c){return this.each(function(){b=f(this);var g=f.extend(t,c),d=b.data("flipCounter");c=f.extend(d,g);b.data("flipCounter",c);if(!1===c.number||0==c.number)!1!==q()?c.number=
q():c.number=0,e("number",c.number);e("animating",!1);e("start_time",!1);b.bind("startAnimation",function(c,d){var g=d;!0==a("animating")&&o();"undefined"!==typeof g?(g=f.extend(b.data("flipCounter"),g),b.data("flipCounter",g)):b.data("flipCounter");!1==a("start_time")&&e("start_time",(new Date).getTime());!1==a("time")&&e("time",0);!1==a("elapsed")&&e("elapsed","0.0");!1==a("start_number")&&(e("start_number",a("number")),!1==a("start_number")&&e("start_number",0));r();g=a("onAnimationStarted");"function"==
typeof g&&g.call(b,b)});b.bind("pauseAnimation",function(){if(!(!1==a("animating")||!0==a("paused"))){clearTimeout(a("interval"));e("paused",!0);var c=a("onAnimationPaused");"function"==typeof c&&c.call(b,b)}});b.bind("resumeAnimation",function(){if(!(!1==a("animating")||!1==a("paused"))){e("paused",!1);r();var c=a("onAnimationResumed");"function"==typeof c&&c.call(b,b)}});b.bind("stopAnimation",function(){o()});b.htmlClean();m()})},renderCounter:function(a){return this.each(function(){b=f(this);
g()||f(this).flipCounter();e("number",a);m()})},setNumber:function(a){return this.each(function(){b=f(this);g()||f(this).flipCounter();e("number",a);m()})},getNumber:function(){var c=!1;this.each(c=function(){b=f(this);g()||f(this).flipCounter();return c=a("number")});return c},startAnimation:function(a){return this.each(function(){b=f(this);g()||f(this).flipCounter();b.trigger("startAnimation",a)})},stopAnimation:function(){return this.each(function(){b=f(this);g()||f(this).flipCounter();b.trigger("stopAnimation")})},
pauseAnimation:function(){return this.each(function(){b=f(this);g()||f(this).flipCounter();b.trigger("pauseAnimation")})},resumeAnimation:function(){return this.each(function(){b=f(this);g()||f(this).flipCounter();b.trigger("resumeAnimation")})}};if(k[h])return k[h].apply(this,Array.prototype.slice.call(arguments,1));if("object"===typeof h||!h)return k.init.apply(this,arguments);f.error("Method "+h+" does not exist on jQuery.flipCounter")}})(jQuery);
jQuery.fn.htmlClean=function(){this.contents().filter(function(){return 3!=this.nodeType?($(this).htmlClean(),!1):!/\S/.test(this.nodeValue)}).remove()};
