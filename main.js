$(document).ready(function(){
	$('body').css('overflow','hidden');
	var height = $(window).height();
	$('.board').css('height',height);
	
	

	$('.board').droppable({hoverClass:'.board .putIn', accept:'.item',
	drop:function(){
		$('.sb').append('<div class="sl">'+contents+'</div>');
	}
	});

	$('.item').on('click', function(){
		$('.item').draggable({containment:'document', revert:true, start:function(){
		if($class==$(this).class)
			contents = $(this).text();
			}
		});

		var $class = $(this).class;
	});

	$('#simulButton').on('hover', function(){
		var $btn = $(this).button('loading');
		$btn.button('reset')
	});
});
