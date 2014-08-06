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
});