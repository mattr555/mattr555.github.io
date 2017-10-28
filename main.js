$(document).ready(function(){
	$("#siteList a").on("mouseenter", function(){
		$(this).text($(this).data("hover"));
	}).on("mouseleave", function() {
		$(this).text($(this).data("nohover"));
	})
});