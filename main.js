$(document).ready(function(){
	$('body').css('overflow','hidden');
	var height = $(window).height();
	$('.board').css('height',height);
	
	$('.item').draggable({containment:'document', revert:true, start:function(){
		contents = $(this).text();
	}
	});

	$('.board').droppable({hoverClass:'putIn', accept:'.item',
	drop:function(){
		$('.board').append(contents+'<br />');
	}
	});

	$('#simulButton').on('click', function(){
		var $btn = $(this).button('loading');
		$btn.button('reset')
	});
});
