
// var inp = jQuery('textarea[placeholder]')[0]

var outp = jQuery('.compiler-output pre.prettyprint').eq(0); 

// newhtml = outp.html().replace(/([^"])\b(\.?\d+)\b/g, '$1<span class=TKAdjustableNumber>$2</span>')
// outp.html(newhtml)

var ohtml = outp.html()

var dothtml = ohtml.replace(/([^"])\b(\d*\.*\d+)\b/g, '$1<span class=TKAdjustableNumber data-min="0" data-max="1">$2</span>')

outp.html(dothtml)


log = console.log.bind(console)

// tangle = new Tangle(outp[0], model)

function loadScripts() {
    jQuery.getScript('http://worrydream.com/Tangle/Tangle.js', function() { console.log("loaded", arguments); })

    jQuery(document.body).append('<link rel="stylesheet" href="http://worrydream.com/Tangle/TangleKit/TangleKit.css" type="text/css">')
    function scr(item) { $(document.body).append(item); }
    scr('<script type="text/javascript" src="TangleKit/mootools.js"></script>')
    scr('<script type="text/javascript" src="TangleKit/sprintf.js"></script>')
    scr('<script type="text/javascript" src="TangleKit/BVTouchable.js"></script>')
    scr('<script type="text/javascript" src="TangleKit/TangleKit.js"></script>')
    if (typeof Slick === "undefined") Slick = {find:function(doc,b) { log(arguments); return doc[b]; }}
}


function init() {
    jQuery('.TKAdjustableNumber').map(function(n,it) { return it.setAttribute('data-var', 'number'+n) } )

    jQuery('.TKAdjustableNumber').map(function(n,it) { return it.getAttribute('data-var') } )
    // ["number0", "number1", "number2", "number3", "number4", "number5", "number6", "number7", "number8", "number9", "number10", "number11"]

    var that = this;
    jQuery('.TKAdjustableNumber').map(function(n,it) { return that['number'+n] = model['number'+n] = it.lastChild.textContent } )
    jQuery('.TKAdjustableNumber').map(function(n,it) { return it.lastChild.textContent = ' '  } )
    log('init', arguments);
}

var model = {
    initialize: init, // function () { log('init') },
    update: function () { log('update') }
};

// htmlvars = outp.html()
// outp.html(htmlvars)

var tangle = new Tangle(outp[0], model)

// TODO: Find way to extract numbers from TKAdjustableNumbers automatically w/out double displaying.
