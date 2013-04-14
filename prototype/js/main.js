$(function() {
	var total = 11;
	
	
	if($('.swiper-container').length > 0) {

	
	//Main Swiper
	var swiper = new Swiper('.swiper1', {
		loop:true,
		grabCursor: true
	});

	$('.swiper-container .right').click( function() {
		swiper.swipeNext();
	});

	$('.swiper-container .left').click( function() {
		swiper.swipePrev();
	});
}

	if($('.image-gallery').length > 0) {

		

		function loadImages(i) {
			var image = $('.content .left-section.image-gallery .grid img.a').get(i);
			var $parent = $(image).parent();

			$(image).attr('src','');
			$(image).attr('src',"img/cakes/"+(i+1)+".jpg").load(function() {  
		        if(i <= total) {
			        $(image).fadeTo(0.3,1, function() {
			        	$parent.remove('#circularG');
			        	loadImages(i+1);
			        });
			    }
		    });
		}


		$('.content .left-section.image-gallery .grid .span4').append($('#circularG').show());

		loadImages(0);
		$('.next, .prev, .close, .current-image').click( 
		function(e) {
			e.stopPropagation();
		});

		$('.content .left-section.image-gallery .grid img').click( 
		function() {
			swapImage($('.content .left-section.image-gallery .grid img').index(this));
			$('.current-image-container.visible-phone').css('width', '100%');
			$('.current-image-container.visible-phone').css('height', '100%');
			$('body').css('overflow', 'hidden');
			$('.current-image-container').css('z-index','2');		
			$('.current-image-container.visible-phone').css('top',$(window).scrollTop());
			$('.current-image-container').fadeTo(600, 1, function() {
		      setTimeout(function(){$('.next, .prev, .close').fadeTo(1200, 0.7);},600);
		    });
		});



		$('.close, .current-image-container.visible-phone').click(
		function() {
			$('.current-image-container, .next, .prev, .close').fadeTo(300, 0, function() {
		      $('.current-image-container').css('z-index','0');
		      $('.current-image.active, .current-image.inactive').attr('src','');
		      $('body').css('overflow', 'auto');
		    });

		});

		$('.next').click(		
		function() {
			var index = $('.current-image.active').data('index');
			
			if(index + 1 <= total) {
				index++;					
			}
			else {
				index = 0;	
			}
			swapImage(index);
		});

		$('.prev').click(
		function() {
			var index = $('.current-image.active').data('index');
			
			if(index - 1 > 0) {
				index--;					
			}
			else {
				index = total;	
			}
			swapImage(index);
		});
	}

	function swapImage(index) {
		var $active = $('.current-image.active');
		var $next = $('.current-image.inactive');
		var gridImage = $('.content .left-section.image-gallery .grid img').get(index);
		$next.attr('src', $(gridImage).attr('src'));
		$next.data('index', index);
		$active.data('index', index);
		$next.show().css('z-index',2);//move the next image up the pile
		$active.fadeOut(400,function(){//fade out the top image
			$active.css('z-index',1).removeClass('active').addClass('inactive');//reset the z-index and unhide the image
			$next.css('z-index',3).removeClass('inactive').addClass('active');//make the next image the top one
	    });
	}

	var map;
	function initialize() {
	var mapOptions = {
	  zoom: 15,
	  center: new google.maps.LatLng(-25.744642, 28.192829),
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),
	    mapOptions);
		var styles = [
		  {
		    stylers: [
		      { hue: "#F0EDE6" },
		      { saturation: -20 }, 
		      { lightness: +10 }
		    ]
		  }
		];

	map.setOptions({styles: styles});
	TestMarker();
	}

	// Function for adding a marker to the page.
    function addMarker(location) {
        marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }

    // Testing the addMarker function
    function TestMarker() {
           Belem = new google.maps.LatLng(-25.744642, 28.192829);
           addMarker(Belem);
    }

    if(google.maps) {
		google.maps.event.addDomListener(window, 'load', initialize);
	}
});
