$(function() {
	if($('.image-gallery').length > 0) {
		$('.content .left-section.image-gallery .grid img').click( 
		function() { 
			$('.current-image.active').attr('src',this.src);
			$('.current-image-container').css('display','block');
			$('.current-image-container').fadeTo(300, 1, function() {
		      // Animation complete.
		    });
		});

	$('.close').click(
		function() {
			$('.current-image-container').fadeTo(300, 0, function() {
		      $('.current-image-container').css('display','none');
		    });

		});

	$('.next').click(
		function() {
			var src = $('.current-image.active').attr('src');
			var index = src.indexOf('.jpg');
			var character = src.substring(src.indexOf('s/c') + 3,index);
			var integ = parseInt(character);
			console.log(character);
			if(integ + 1 <= 12) {
				var $active = $('.current-image.active');
				var $next = $('.current-image.inactive');
				$next.attr('src', src.replace(character, integ + 1));
				$next.show().css('z-index',2);//move the next image up the pile
				$active.fadeOut(300,function(){//fade out the top image
					$active.css('z-index',1).hide().removeClass('active').addClass('inactive');//reset the z-index and unhide the image
					$next.css('z-index',3).removeClass('inactive').addClass('active');//make the next image the top one
			    });	

			}
			else {
				var $active = $('.current-image.active');
				var $next = $('.current-image.inactive');
				$next.attr('src', 'img/cakes/c1.jpg');
				$next.show().css('z-index',2);//move the next image up the pile
				$active.fadeOut(300,function(){//fade out the top image
					$active.css('z-index',1).hide().removeClass('active').addClass('inactive');//reset the z-index and unhide the image
					$next.css('z-index',3).removeClass('inactive').addClass('active');//make the next image the top one
			    });
			}

		});

	$('.prev').click(
		function() {
			var src = $('.current-image.active').attr('src');
			var index = src.indexOf('.jpg');
			var character = src.substring(src.indexOf('s/c') + 3,index);
			var integ = parseInt(character);
			if(integ - 1 > 0) {
				var $active = $('.current-image.active');
				var $next = $('.current-image.inactive');
				$next.attr('src', src.replace(character, integ - 1));
				$next.show().css('z-index',2);//move the next image up the pile
				$active.fadeOut(300,function() {//fade out the top image
					$active.css('z-index',1).hide().removeClass('active').addClass('inactive');//reset the z-index and unhide the image
					$next.css('z-index',3).removeClass('inactive').addClass('active');//make the next image the top one
			    });				
			}
			else {
				var $active = $('.current-image.active');
				var $next = $('.current-image.inactive');
				$next.attr('src', 'img/cakes/c12.jpg');
				$next.show().css('z-index',2);//move the next image up the pile
				$active.fadeOut(300,function(){//fade out the top image
					$active.css('z-index',1).hide().removeClass('active').addClass('inactive');//reset the z-index and unhide the image
					$next.css('z-index',3).removeClass('inactive').addClass('active');//make the next image the top one
			    });
			}

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
