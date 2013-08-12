$(function() {
	var total = 11;

	$('img').on('dragstart', function(event) { event.preventDefault(); });
	
	if($('.rslides').length > 0) {

		$(".rslides").responsiveSlides({
		  	auto: true,
	        pager: true,
	        nav: true,
	        speed: 600,
	        maxwidth: 800,
	        navContainer: "",
	        namespace: "large-btns"
		});	

		$(".large-btns_tabs").addClass('hidden-phone');
		$(".large-btns_nav").addClass('visible-phone');

		
		
		window.addEventListener('load', function() {
		    new FastClick(document.body);
		}, false);

	}

	if($('.image-gallery').length > 0) {

		function loadImages(i) {
			var image;
			if($(window).width() >= 768) {
				image = $('.content .left-section.image-gallery .grid .hidden-phone img').get(i);
				
		    } else {
				image = $('.content .left-section.image-gallery .grid .visible-phone img').get(i);
				
		    }

		    var $parent = $(image).parent();
			var index = (i+1 < 10) ? "0" + (i+1) : (i+1);
			$(image).attr('src','');
			$(image).attr('src',"img/cakes/"+index+".jpg").load(function() {  
		        if(i < total) {
			        $(image).fadeTo(0.3,1, function() {
			        	$parent.remove('#circularG');
			        	setTimeout(function(){loadImages(i+1);},60+(i*total));
			        });
			    } else {
			    	$('.content .left-section.image-gallery .grid img').css('display','block');
			    }
		    });
		}

		$('.content .left-section.image-gallery .grid .span4').append($('#circularG').show());

		setTimeout(loadImages(0), 300);

		$('.next, .prev, .close, .current-image').click( 
		function(e) {
			e.stopPropagation();
		});

		$('.content .left-section.image-gallery .grid img').click( 
		function() {
			var phone = ".content .left-section.image-gallery .grid .span4.hidden-phone img";
			if($(window).width() < 768) {
				phone = ".content .left-section.image-gallery .grid .span4.visible-phone img";
			}
			var index = $(phone).index(this);
			swapImage(index);
			$('.current-image-container.visible-phone').css('width', '100%');
			$('.current-image-container.visible-phone').css('height', '100%');
			$('.current-image-container').css('z-index','2');		
			$('.current-image-container.visible-phone').css('top',$(window).scrollTop());
			if($(window).width() < 768) {
				$('.container').fadeTo(900, 0);
			}
			$('.current-image-container, .current-image.active').fadeTo(300, 1, function() {
				if($(window).width() < 768) {
					$('body').css('overflow', 'hidden');
				}
				$('.next, .prev, .close').css('z-index','999');
		      	setTimeout(function(){$('.next, .prev, .close').fadeTo(300, 0.7);},100);
		    });
		});

		function showImage() {
			$('.current-image-container, .next, .prev, .close, .current-image.active').fadeTo(300, 0, function() {
		      	if($(window).width() < 768) {
		      		$('body').css('overflow', 'auto');
	      		}
					$('.current-image-container').css('z-index','-10');
			    });
		}
		

		$('.close, .current-image-container.visible-phone').click(
		function() {
			if($(window).width() < 768) {
				$('.container').fadeTo(300, 1, function() {
					showImage();
		     	});
	     	} else {
	     		showImage();
	     	}

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
		var phone = ".content .left-section.image-gallery .grid .span4.hidden-phone img";
		if($(window).width() < 768) {
			phone = ".content .left-section.image-gallery .grid .span4.visible-phone img";
		}
		var gridImage = $(phone).get(index);
		$next.attr('src', $(gridImage).attr('src'));
		$next.data('index', index);
		$active.data('index', index);
		$next.show().css('z-index',2);//move the next image up the pile
		$active.fadeOut(300,function(){//fade out the top image
			$active.css('z-index',1).removeClass('active').addClass('inactive');//reset the z-index and unhide the image
			$next.css('z-index',3).removeClass('inactive').addClass('active');//make the next image the top one
	    });
	}

	var map;
	function initialize() {
	var mapOptions = {
	  zoom: 15,
	  center: new google.maps.LatLng(-25.744642, 28.192829),
	  mapTypeId: google.maps.MapTypeId.ROADMAP,
	  disableDefaultUI: false
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

	var infowindow = new google.maps.InfoWindow({
      content: "<div class='map-info-title'>Belem Bakery</p><a href='https://maps.google.com/maps?saddr=&daddr=cnr lilian ngoyi st and madiba st, pretoria'>Directions</a>"
    });

    function addMarkerListener(map, infowindow, marker) {
	  google.maps.event.addListener(marker, 'click', function() {
	    infowindow.open(map, marker);
	  });
	}
	
	// Function for adding a marker to the page.
    function addMarker(location) {
        marker = new google.maps.Marker({
            position: location,
            map: map,
            title: 'Belem Bakery',
            icon: 'img/bread_icon_border.png'
        });

        addMarkerListener(map, infowindow, marker);
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
