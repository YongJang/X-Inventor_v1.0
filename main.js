$(document).ready(function(){
	$('body').css('overflow','hidden');
	var height = $(window).height();
	$('.board').css('height',height);
	
	

	$('.board').droppable({hoverClass:'.board .putIn', accept:'.item',
	drop:function(){
		$('.sb').append('<div class="sl">'+contents+'</div>');
	}
	});

	$('li').hover(
    	function(){
     	 $(this).addClass('item');
 		},
   		function(){
    	  $(this).removeClass('item');
   		}
	);

	$('.item').draggable({containment:'document', revert:true, start:function(){
		contents = $(this).text();
		}
	});

	$('.item').on('hover', function(){
		var $id = $(this).id;
	});

	$('#simulButton').on('click', function(){
		var $btn = $(this).button('loading');
		$btn.button('reset')
	});
});
