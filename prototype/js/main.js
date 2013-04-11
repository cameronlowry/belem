$(function() {
	if($('.image-gallery').length > 0) {
		$('.content .left-section.image-gallery .grid img').click( 
		function() {
			swapImage($('.content .left-section.image-gallery .grid img').index(this));
			$('.current-image-container').css('display','block');
			$('.current-image-container, .next, .prev').fadeTo(600, 1, function() {
		      // Animation complete.
		    });
		});

	$('.close').click(
		function() {
			$('.current-image-container, .next, .prev').fadeTo(300, 0, function() {
		      $('.current-image-container').css('display','none');
		    });

		});

	$('.next').click(		
	function() {
		var total = 11;		
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

		$next.attr('src', $($('.content .left-section.image-gallery .grid img').get(index)).attr('src'));
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
