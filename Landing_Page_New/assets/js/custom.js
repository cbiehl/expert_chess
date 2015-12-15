
(function ($) {
	if(window.innerWidth<1623){
		 $("#springer").fadeOut(0);
		 $("#springer2").fadeOut(0);
	}
	
	$( window ).resize(function() {
		 if(window.innerWidth<1623){
			 $("#springer").fadeOut(1000);
			 $("#springer2").fadeOut(1000);
		 }
		 
		 if(window.innerWidth>1623){
			 $("#springer").fadeIn(1000);
			 $("#springer2").fadeIn(1000);			 
		 }
			 
		});
	
    "use strict";
    var mainApp = {
        scrollAnimation_fun: function () {

            /*====================================
             ON SCROLL ANIMATION SCRIPTS 
            =======================================*/
            
            window.scrollReveal = new scrollReveal();

        },
         scroll_fun: function () {

            /*====================================
                 EASING PLUGIN SCRIPTS 
                ======================================*/
            $(function () {
                $('.move-me a').bind('click', function (event) { //just pass move-me in design and start scrolling
                    var $anchor = $(this);
                    $('html, body').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top
                    }, 1000, 'easeInOutQuad');
                    event.preventDefault();
                });
            });

        },
        
        clicksOnYoutubePlugin:"0",

         top_flex_slider_fun:function()
         {
             /*====================================
              FLEX SLIDER SCRIPTS 
             ======================================*/
        	 $('.iframe').click(function(){ //Attention: There is only 1 iframe in here!!
             	 console.log("ER IST DRIN!");
                 clicksOnYoutubePlugin += 1;
             	 console.log(clicksOnYoutubePlugin);
             	 if(clicksOnYoutubePlugin % 2 == 0){
              		$('.flex-slider').flexslider('play');
            	 }else{
            		$('.flex-slider').flexslider('pause');
             	 }
              });
        	 
        	 
        	var slider; //has 2 be global sagt Clemens
        	var canSlide = true; // Global switch to monitor video state

        	// Load the YouTube API. For some reason it's required to load it like this
        	var tag = document.createElement('script');
        	tag.src = "http://www.youtube.com/iframe_api";
        	var firstScriptTag = document.getElementsByTagName('script')[0];
        	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        	// Setup a callback for the YouTube api to attach video event handlers
        	window.onYouTubeIframeAPIReady = function(){
        	    // Iterate through all videos
        	    $('.iframe').each(function(){
        	        // Create a new player pointer; "this" is a DOMElement of the player's iframe
        	        var player = new YT.Player(this, {
        	            playerVars: {
        	                autoplay: 0
        	            }
        	        });

        	        // Watch for changes on the player
        	        player.addEventListener("onStateChange", function(state){
        	            switch(state.data)
        	            {
        	                // If the user is playing a video, stop the slider
        	                case YT.PlayerState.PLAYING:
        	                	slider("stop");
        	                    slider.flexslider("stop");
        	                    canSlide = false;
        	                    break;
        	                // The video is no longer player, give the go-ahead to start the slider back up
        	                case YT.PlayerState.ENDED:
        	                case YT.PlayerState.PAUSED:
        	                	slider("play");
        	                    slider.flexslider("play");
        	                    canSlide = true;
        	                    break;
        	            }
        	        });

        	        $(this).data('player', player);
        	    });
        	}
        	 
             slider = $('#main-section').flexslider({
                 animation: "fade", //String: Select your animation type, "fade" or "slide"
                 slideshowSpeed: 5000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
                 animationSpeed: 800,           //Integer: Set the speed of animations, in milliseconds
                 startAt: 0,    //Integer: The slide that the slider should start on. Array notation (0 = first slide)
                 //pausePlay: true,
                 pauseOnAction: true,
                 video: true,
                 before: function(){                     
                     if(!canSlide)
                         slider.flexslider("stop");
                 }
             });
             
             slider.on("click", ".flex-prev, .flex-next", function(){
            	    canSlide = true;
            	    $('.flexslider iframe').each(function(){
            	        $(this).data('player').pauseVideo();
            	    });
            	});
             
         },
        
        clemens_stuff:function()
        {
            
        },
        
    }
   
    $(document).ready(function () {
        mainApp.scrollAnimation_fun();
        mainApp.scroll_fun();
        mainApp.top_flex_slider_fun();
        mainApp.clemens_stuff();
        
        $('.iframe').click(function(){ //Attention: There is only 1 iframe in here!!
        	console.log("ER IST DRIN!");
            clicksOnYoutubePlugin += 1;
        	console.log(clicksOnYoutubePlugin);
    	 if(clicksOnYoutubePlugin % 2 == 0){
         	$('.flex-slider').flexslider('play');
       	 }else{
       		$('.flex-slider').flexslider('pause');
        	 }
         });
    });
    
}(jQuery));

//$(function() {
//    var $banner = $('#banner');
//	if ($banner.length > 0
//			&&	$header.hasClass('alt')) {
//
//				$window.on('resize', function() { $window.trigger('scroll'); });
//
//				$banner.scrollex({
//					bottom:		$header.outerHeight() + 1,
//					terminate:	function() { $header.removeClass('alt'); },
//					enter:		function() { $header.addClass('alt'); },
//					leave:		function() { $header.removeClass('alt'); }
//				});
//
//			}
//});
