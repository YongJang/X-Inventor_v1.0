$(document).ready(function(){
	$('body').css('overflow','hidden');
	var height = $(window).height();
	$('.board').css('height',height);
	
	$('.item').draggable({containment:'document', revert:true, start:function(){
		if($(this)=='.item')
			contents = $(this).text;
		else
			contents = $(this).text+"haha";
	}
	});


	$('.board').droppable({hoverClass:'.board .putIn', accept:'.item',
	drop:function(){
		$('.sb').append('<div class="sl">'+contents+'</div>');
	}
	});

	$('.output').draggable({containment:'document', revert:true, start:function(){
		contents = $(this).text();
	}
	});

	$('.board2').droppable({hoverClass:'.board .putIn', accept:'.output',
	drop:function(){
		$('.ob').append('<div class="ol">'+contents+'</div>');
	}
	});

	$('.item').on('click', function(){
		var $btn = $(this).button('loading');
		$btn.button('reset')
	});

	$('#simulButton').on('click', function(){
		var $btn = $(this).button('loading');
		$btn.button('reset')
	});
});
