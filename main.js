$(document).ready(function(){
	//desktop navmenu hovering
	$('.sidebar').hover(function(){
		$('.sidebar').addClass('hovered');
	},
	function(){
		$('.sidebar').removeClass('hovered');
	});

	//mobile navmenu popout
	$('.sidebar').on('touchstart', function(e){
		$('.sidebar').addClass('hovered');
		e.stopPropagation();
	});

	$('html').on('touchstart', function(){
		$('.sidebar').removeClass('hovered');
	});

	//portfolio smoothscroll
	$('#portlink').click(function(){
		console.log('here!');
		$('html, body').animate({scrollTop: $('#portfolio').offset().top - 105}, 2000);
	});

	//headroom.js
	$('.header').headroom();
});