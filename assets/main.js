$(document).ready(function(){
	$('body').css('overflow','hidden');	
	if(1){
		var height = $(window).height();
		var width = $(window).width();
		$('.board').css('height',height);
	}
	var selector=0;
	var x, y;
	$('.item').draggable({
		containment:'document', 
		revert:true,
		start:function(event, position){
			x=position.left;
			contents = $(this).text();
		}
	});

	$('#draw').draggable({
		containment:'.board', 
		revert:true,
		start:function(event, position){
			x=position.left;
			contents = $(this).text();
		}
	});

	$('.board').droppable({
		hoverClass:'.board',		
		accept: '.input',
		drop:function(){
			$('#draw').append('<span id="content" class="label label-primary">'+contents+'</span>');
		}		
	});

	$('.board').droppable({
		hoverClass:'.board',	
		accept: '.output',
		drop:function(){
			$('#draw').append('<span id="content" class="label label-warning">'+contents+'</span>');
		}
	});
	$('#content').draggable({
		containment:'.border'
	});
	$('.btn').on('click', function(){
		var $btn = $(this).button('loading');
		$('.board').append('<span class="label label-primary">'+contents+'</span>');
		$btn.button('reset')
	});
});
