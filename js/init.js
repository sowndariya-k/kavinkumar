
jQuery(document).ready(function(){

	"use strict";
	
	kavin_modalbox();
	kavin_trigger_menu();
	progress_function();
	kavin_modalbox_news();
	kavin_modalbox_portfolio();
	kavin_imgtosvg();
	kavin_popup();
	kavin_data_images();
	kavin_page_transition();
	kavin_projects();
	kavin_portfolio();
	kavin_owl_carousel();
	kavin_section_top();
	kavin_background_effects();
	kavin_borders();
	kavin_canvas_effect();
	
	jQuery(window).load('body', function(){
		kavin_my_load();
	});
	
});

// -----------------------------------------------------
// --------------------   MODALBOX    ------------------
// -----------------------------------------------------

function kavin_modalbox(){
	"use strict";
	
	jQuery('.kavin_all_wrap').prepend('<div class="kavin_modalbox"><div class="box_inner"><div class="close"><a href="#"><i class="icon-cancel"></i></a></div><div class="description_wrap"></div></div></div>');
}

// -------------------------------------------------
// -------------  PROGRESS BAR  --------------------
// -------------------------------------------------

function tdProgress(container){
	
	"use strict";
		
	container.find('.progress_inner').each(function() {
		var progress 		= jQuery(this);
		var pValue 			= parseInt(progress.data('value'), 10);
		var pColor			= progress.data('color');
		var pBarWrap 		= progress.find('.bar');
		var pBar 			= progress.find('.bar_in');
		var number 			= progress.find('.number');
		var label 			= progress.find('.label');
		number.css({right:(100 - pValue)+'%'});
		setTimeout(function(){label.addClass('opened');},500);
		pBar.css({width:pValue+'%', backgroundColor:pColor});
		setTimeout(function(){pBarWrap.addClass('open');});
	});
}

function resetProgress(){
	"use strict";
	
	$('.arlo_progress .number').css({right: '100%'});
	$('.arlo_progress .label').removeClass('opened');
	$('.arlo_progress .bar_in').css({width:'0px', backgroundColor:'transparent'});
}

function progress_function(wrapper){
	
	"use strict";
	
	var element;
	if(wrapper){
		element = wrapper.find('.arlo_progress');
	}else{
		element = jQuery('.arlo_progress');
	}
	element.each(function() {
		var pWrap = jQuery(this);
		pWrap.find('.number').css({right:'100%'});
		
		pWrap.waypoint({
			handler: function(){
				tdProgress(pWrap);
			},
			offset: '90%',
			context: document.getElementById('about')
		});	
	});
}

// -----------------------------------------------------
// ---------------   TRIGGER MENU    -------------------
// -----------------------------------------------------

function kavin_trigger_menu(){
	
	"use strict";

	var hamburger 		= jQuery('.kavin_topbar .trigger .hamburger');
	var mobileMenu		= jQuery('.kavin_mobile_menu');
	var mobileMenuList	= jQuery('.kavin_mobile_menu ul li a');

	hamburger.on('click',function(){
		var element 	= jQuery(this);

		if(element.hasClass('is-active')){
			element.removeClass('is-active');
			mobileMenu.removeClass('opened');
		}else{
			element.addClass('is-active');
			mobileMenu.addClass('opened');
		}
		return false;
	});
	
	mobileMenuList.on('click',function(){
		jQuery('.kavin_topbar .trigger .hamburger').removeClass('is-active');
		mobileMenu.removeClass('opened');
		return false;
	});
}

// -------------------------------------------------
// -------------  MODALBOX NEWS  -------------------
// -------------------------------------------------

function kavin_modalbox_news() {
    "use strict";

    // Select the image button within each news item
    var imageButton = jQuery('.kavin_news .news_list .image');

    // Event for clicking the image
    imageButton.on('click', function() {
        var element = jQuery(this);
        
        // Get LinkedIn URL from a predefined data attribute in the HTML
        var linkedinUrl = element.find('a').attr('href');
        
        // Redirect to LinkedIn URL if it exists
        if (linkedinUrl) {
            window.open(linkedinUrl, '_blank');
        }
        
        return false; // Prevent default action
    });
}


// -------------------------------------------------
// -------------  MODALBOX PORTFOLIO  --------------
// -------------------------------------------------


function kavin_modalbox_portfolio(){
	
	"use strict";
	
	var modalBox	= jQuery('.kavin_modalbox');
	var button		= jQuery('.kavin_portfolio .portfolio_popup');
	var closePopup		= modalBox.find('.close');
	
	button.on('click',function(){
		var element 	= jQuery(this);
		var parent		= element.closest('.inner');
		var image		= parent.find('.abs_image').data('img-url');
		var details 	= parent.find('.hidden_content_portfolio').html();
		var title	 	= parent.find('.entry').data('title');
		var category	 	= parent.find('.entry').data('category');
		
		modalBox.addClass('opened');
		modalBox.find('.description_wrap').html(details);
		modalBox.find('.popup_details').prepend('<div class="top_image"><img src="img/thumbs/4-2.jpg" alt="" /><div class="main" data-img-url="'+image+'"></div></div>');
		modalBox.find('.popup_details .top_image').after('<div class="portfolio_main_title"><h3 class="title">'+title+'</h3><span class="category"><a href="#">'+category+'</a></span></div>');	
		kavin_data_images();
		return false;
	});
	closePopup.on('click',function(){
		modalBox.removeClass('opened');
		modalBox.find('.description_wrap').html('');
		return false;
	});
}
// -----------------------------------------------------
// ---------------   PRELOADER   -----------------------
// -----------------------------------------------------

function kavin_preloader(){
	
	"use strict";
	
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
	var preloader = $('#preloader');
	
	if (!isMobile) {
		setTimeout(function() {
			preloader.addClass('preloaded');
		}, 800);
		setTimeout(function() {
			preloader.remove();
		}, 2000);

	} else {
		preloader.remove();
	}
}

// -----------------------------------------------------
// -----------------   MY LOAD    ----------------------
// -----------------------------------------------------

function kavin_my_load(){
	
	"use strict";
	
	var speed	= 500;
	setTimeout(function(){kavin_preloader();},speed);
	setTimeout(function(){jQuery('.kavin_all_wrap').addClass('ready');},speed+2000);
}

// -----------------------------------------------------
// ---------------    IMAGE TO SVG    ------------------
// -----------------------------------------------------

function kavin_imgtosvg(){
	
	"use strict";
	
	jQuery('img.svg').each(function(){
		
		var jQueryimg 		= jQuery(this);
		var imgClass		= jQueryimg.attr('class');
		var imgURL			= jQueryimg.attr('src');

		jQuery.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var jQuerysvg = jQuery(data).find('svg');

			// Add replaced image's classes to the new SVG
			if(typeof imgClass !== 'undefined') {
				jQuerysvg = jQuerysvg.attr('class', imgClass+' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			jQuerysvg = jQuerysvg.removeAttr('xmlns:a');

			// Replace image with new SVG
			jQueryimg.replaceWith(jQuerysvg);

		}, 'xml');

	});
}

// -----------------------------------------------------
// --------------------   POPUP    ---------------------
// -----------------------------------------------------

function kavin_popup(){
	
	"use strict";

	jQuery('.gallery_zoom').each(function() { // the containers for all your galleries
		jQuery(this).magnificPopup({
			delegate: 'a.zoom', // the selector for gallery item
			type: 'image',
			gallery: {
			  enabled:true
			},
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});

	});
	jQuery('.popup-Website, .popup-App').each(function() { // the containers for all your galleries
		jQuery(this).magnificPopup({
			disableOn: 100,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true
		});
	});
	
	jQuery('.soundcloude_link').magnificPopup({
	  type : 'image',
	   gallery: {
		   enabled: true, 
	   },
	});
}

// -----------------------------------------------------
// ---------------   DATA IMAGES    --------------------
// -----------------------------------------------------

function kavin_data_images(){
	
	"use strict";
	
	var data			= jQuery('*[data-img-url]');
	
	data.each(function(){
		var element			= jQuery(this);
		var url				= element.data('img-url');
		element.css({backgroundImage: 'url('+url+')'});
	});
}

// -------------------------------------------------
// ----------------   TEXTETION  -------------------
// -------------------------------------------------

 $('.animateText').textition({
	speed: 1.2,
	animation: 'ease-out',
	map: {x: 200, y: 100, z: 0},
	autoplay: true,
	interval: 4
});

// -----------------------------------------------------
// -------------   PAGE TRANSITION    ------------------
// -----------------------------------------------------

function kavin_page_transition(){
	
	"use strict";
	
	var section 		= jQuery('.kavin_section');
	var allLi 			= jQuery('.transition_link li');
	var button			= jQuery('.transition_link a');
	var wrapper 		= jQuery('.kavin_all_wrap');
	var enter	 		= wrapper.data('enter');
	var exit		 	= wrapper.data('exit');
	
	button.on('click',function(){
		var element 	= jQuery(this);
		var href		= element.attr('href');
		if(element.parent().hasClass('kavin_button')){
			jQuery('.menu .transition_link a[href="'+href+'"]').trigger('click');
			return false;
		}
		resetProgress();
		var sectionID 	= jQuery(href);
		var parent	 	= element.closest('li');
			if(!parent.hasClass('active')) {
				allLi.removeClass('active');
				wrapper.find(section).removeClass('animated '+enter);
				if(wrapper.hasClass('opened')) {
					wrapper.find(section).addClass('animated '+exit);
				}
				parent.addClass('active');
				wrapper.addClass('opened');
				wrapper.find(sectionID).removeClass('animated '+exit).addClass('animated '+enter);
				jQuery(section).addClass('hidden');
				jQuery(sectionID).removeClass('hidden').addClass('active');
			}
		return false;
	});
}

// -------------------------------------------------
// -----------------    PORTFOLIO    ---------------
// -------------------------------------------------

function kavin_projects() {
	
	"use strict";
	
	jQuery('.kavin_portfolio_animation_wrap').each(function() {
		jQuery(this).on('mouseenter', function() {
			if (jQuery(this).data('title')) {
				jQuery('.kavin_portfolio_titles').html(jQuery(this).data('title') + '<span class="work__cat">' + jQuery(this).data('category') + '</span>');
				jQuery('.kavin_portfolio_titles').addClass('visible');
			}

			jQuery(document).on('mousemove', function(e) {
				jQuery('.kavin_portfolio_titles').css({
					left: e.clientX - 10,
					top: e.clientY + 25
				});
			});
		}).on('mouseleave', function() {
			jQuery('.kavin_portfolio_titles').removeClass('visible');
		});
	});
}

// filterable 

function kavin_portfolio(){

	"use strict";

	if(jQuery().isotope) {

		// Needed variables
		var list 		 = jQuery('.kavin_portfolio .portfolio_item');
		var filter		 = jQuery('.kavin_portfolio .portfolio_filter ul');

		if(filter.length){
			// Isotope Filter 
			filter.find('a').on('click', function(){
				var selector = jQuery(this).attr('data-filter');
				list.isotope({ 
					filter				: selector,
					animationOptions	: {
						duration			: 750,
						easing				: 'linear',
						queue				: false
					}
				});
				return false;
			});	

			// Change active element class
			filter.find('a').on('click', function() {
				filter.find('a').removeClass('current');
				jQuery(this).addClass('current');
				return false;
			});	
		}
	}
}

// -----------------------------------------------------
// ----------------    OWL CAROUSEL    -----------------
// -----------------------------------------------------

function kavin_owl_carousel(){

	"use strict";

	var carousel			= jQuery('.kavin_testimonials .owl-carousel');
	carousel.owlCarousel({
		loop: true,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		items: 1,
		lazyLoad: true,
		autoplay: true,
		autoplayTimeout: 6000,
		smartSpeed: 2000,
		margin: 0,
		dots: true,
		nav: false,
		navSpeed: true,
		responsive : {
			0 : {
				mouseDrag: false,
				touchDrag: true,
			},
			1100 : {
				mouseDrag: true,
				touchDrag: true,
			}
		}
	});
	kavin_imgtosvg();
}

function kavin_section_top(){
	"use strict";
	
	var button	= jQuery('.kavin_sidebar_menu .menu ul li a,.kavin_mobile_menu .menu_list ul li a');
	var section = jQuery('.kavin_section');
	
	button.on('click',function(){
		section.animate({ scrollTop: 0 }, 'slow');
		return false;
	});
}

// -----------------------------------------------------
// -----------    BACKGROUND ANIMATIONS    -------------
// -----------------------------------------------------

function kavin_background_effects(){
	"use strict";
	
	var box		= jQuery('.kavin_background_effects');
	var wrapper	= jQuery('.kavin_background_effects').data('style');
	
	if(wrapper === 'canvas'){
		box.append('<div class="canvas_effects"></div>');
	}
	if(wrapper === 'lines'){
		box.append('<div class="lines"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div>');
	}
	if(wrapper === 'circles'){
		box.append('<div class="circles_wrapper"><ul class="circles"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul></div>');
	}
	if(wrapper === 'noise'){
		box.append('<div class="noise"></div>');
	}
}

// -----------------------------------------------------
// ---------------------    BORDERS    -----------------
// -----------------------------------------------------

function kavin_borders(){
	"use strict";
	jQuery('.kavin_mainpart').append('<span class="left_border"></span><span class="right_border"></span><span class="top_border"></span><span class="bottom_border"></span>');
}

// -----------------------------------------------------
// ---------------    BACKGROUND CANVAS    -------------
// -----------------------------------------------------

function kavin_canvas_effect(){
	"use strict";
	
	if(jQuery('.canvas_effects').length){
		var maxx = document.body.clientWidth;
		var maxy = document.body.clientHeight;
		var halfx = maxx / 2;
		var halfy = maxy / 2;
		var canvas = document.createElement("canvas");
		document.body.appendChild(canvas);
		canvas.width = maxx;
		canvas.height = maxy;
		var context = canvas.getContext("2d");
		var dotCount = 200;
		var dots = [];
		// create dots
		for (var i = 0; i < dotCount; i++) {
		  dots.push(new dot());
		}

		// dots animation
		function render() {
		  context.fillStyle = "#eee";
		  context.fillRect(0, 0, maxx, maxy);
		  for (var i = 0; i < dotCount; i++) {
			dots[i].draw();
			dots[i].move();
		  }
		  requestAnimationFrame(render);
		}

		// dots class
		// @constructor
		function dot() {

		  this.rad_x = 2 * Math.random() * halfx + 1;
		  this.rad_y = 1.2 * Math.random() * halfy + 1;
		  this.alpha = Math.random() * 360 + 1;
		  this.speed = Math.random() * 100 < 50 ? 1 : -1;
		  this.speed *= 0.1;
		  this.size = Math.random() * 5 + 1;
		  this.color = Math.floor(Math.random() * 256);

		}

		// drawing dot
		dot.prototype.draw = function() {

		  // calc polar coord to decart
		  var dx = halfx + this.rad_x * Math.cos(this.alpha / 180 * Math.PI);
		  var dy = halfy + this.rad_y * Math.sin(this.alpha / 180 * Math.PI);
		  // set color
		  context.fillStyle = "#999";
		  // draw dot
		  context.fillRect(dx, dy, this.size, this.size);

		};

		// calc new position in polar coord
		dot.prototype.move = function() {

		  this.alpha += this.speed;
		  // change color
		  if (Math.random() * 100 < 50) {
			this.color += 1;
		  } else {
			this.color -= 1;
		  }

		};

		// start animation
		render();
	}
}

