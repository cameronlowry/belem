$(function() {
	$('.content .left-section.image-gallery .grid img').click( 
		function() { 
			$('.current-image').attr('src',this.src);
			$('.current-image-container').css('display','block');
			$('.current-image-container').fadeTo(100, 1, function() {
		      // Animation complete.
		    });
		});

	$('.close').click(
		function() {
			$('.current-image-container').fadeTo(100, 0.5, function() {
		      $('.current-image-container').css('display','none');
		    });

		});

	$('.next').click(
		function() {
			var src = $('.current-image').attr('src');
			var index = src.indexOf('.jpg');
			var character = src.substring(index - 1,index);
			var integ = parseInt(character);
			if(integ + 1 <= 9) {
				$('.current-image').attr('src', src.replace(character, integ + 1));
			}
			else {
				$('.current-image').attr('src', src.replace(character, 1));
			}

		});

	$('.prev').click(
		function() {
			var src = $('.current-image').attr('src');
			var index = src.indexOf('.jpg');
			var character = src.substring(index - 1,index);
			var integ = parseInt(character);
			if(integ - 1 > 0) {
				$('.current-image').attr('src', src.replace(character, integ - 1));
			}
			else {
				$('.current-image').attr('src', src.replace(character, 9));
			}

		});
});
