$(document).ready(function(){
	$('body').css('overflow','hidden');
	var height = $(window).height();
	$('.board').css('height',height);
	
	

	$('.board').droppable({hoverClass:'.putIn', accept:'.item',
	drop:function(){
		$('.ib').append('<div class="sl">'+contents+'</div>');
	}
	});

	$('.item').draggable({containment:'document', revert:true, start:function(){
		contents = $(this).id;
		}
	});

	$('.item').on('hover', function(){
		
	});

	$('#simulButton').on('click', function(){
		var $btn = $(this).button('loading');
		$btn.button('reset')
	});
});
