/*! bigSlide - v0.5.0 - 2014-09-12
* http://ascott1.github.io/bigSlide.js/
* Copyright (c) 2014 Adam D. Scott; Licensed MIT */
/*! bigSlide - v0.4.3 - 2014-01-25
* http://ascott1.github.io/bigSlide.js/
* Copyright (c) 2014 Adam D. Scott; Licensed MIT */

(function($) {
  'use strict';

  $.fn.bigSlide = function(options) {

    var settings = $.extend({
      'menu': ('#menu'),
      'push': ('.push'),
      'side': 'left',
      'menuWidth': '15.625em',
      'speed': '300',
      'activeBtn':'menu-open'
    }, options);

    var menuLink = this,
        menu = $(settings.menu),
        push = $(settings.push),
        width = settings.menuWidth;

    var positionOffScreen = {
      'position': 'fixed',
      'top': '0',
      'bottom': '0',
      'settings.side': '0',
	  'left': '0em',
      'width': '3em',
      'height': '100%'
    };

    var animateSlide = {
      '-webkit-transition': settings.side + ' ' + settings.speed + 'ms ease' + ', ' +  'width' + ' ' + settings.speed + 'ms ease',
      '-moz-transition': settings.side + ' ' + settings.speed + 'ms ease' + ', ' +  'width' + ' ' + settings.speed + 'ms ease',
      '-ms-transition': settings.side + ' ' + settings.speed + 'ms ease' + ', ' +  'width' + ' ' + settings.speed + 'ms ease',
      '-o-transition': settings.side + ' ' + settings.speed + 'ms ease' + ', ' +  'width' + ' ' + settings.speed + 'ms ease',
      'transition': settings.side + ' ' + settings.speed + 'ms ease' + ', ' +  'width' + ' ' + settings.speed + 'ms ease' 
    };
	$(".panel-close").hide();
	
    menu.css(positionOffScreen);
    push.css(settings.side, '3em');
    menu.css(animateSlide);
    push.css(animateSlide);
	push.first().css(settings.side, '3em');
    menu._state = 'closed';

    menu.open = function() {
      menu._state = 'open';
      menu.css(settings.side, '0');
	  menu.css('width', width);
	  setTimeout(function(){$(".panel-close").fadeIn();}, 250);
      push.css(settings.side, width);
	  //push.first().css(settings.side, '11.625em');
      menuLink.addClass(settings.activeBtn);
    };

    menu.close = function() {
      menu._state = 'closed';
      menu.css(settings.side, '-0em'/*'-' + width*/);
	  menu.css('width', '3em'/*'-' + width*/);
	  $(".panel-close").hide();
      push.css(settings.side, '3em');
	  push.first().css(settings.side, '3em');	  
      menuLink.removeClass(settings.activeBtn);
    };

   $(document).on('click.bigSlide', function(e) {
     if (!$(e.target).parents().andSelf().is(menuLink) && menu._state === 'open')  {
	 if($(e.target).hasClass("search-form") || $(e.target).hasClass("search-btn")){
		return;
	 }
       menu.close();
       menuLink.removeClass(settings.activeBtn);
     }
    });

    menuLink.on('click.bigSlide', function(e) {
      e.preventDefault();
      if (menu._state === 'closed') {
        menu.open();
      } else {
        menu.close();
      }
    });

    menuLink.on('touchend', function(e){
      menuLink.trigger('click.bigSlide');
      e.preventDefault();
    });

    return menu;

  };

}(jQuery));
