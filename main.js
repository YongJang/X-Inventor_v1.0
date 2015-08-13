$(document).ready(function(){
	$('body').css('overflow','hidden');
	var height = $(window).height();
	$('.board').css('height',height);
	
	var $id;

	$('.board').droppable({hoverClass:'.board .putIn', accept:'.item',
	drop:function(){
		$('.sb').append('<div class="sl">'+contents+'</div>');
	}
	});

	$('li').hover(
    	function(){
     	 $(this).addClass('item');
     	 $id = $(this).id;
 		},
   		function(){
    	  $(this).removeClass('item');
   		}
	);

	$('.item').draggable({containment:'document', revert:true, start:function(){
		contents = $(this).text();
		}
	});

	$('#simulButton').on('click', function(){
		var $btn = $(this).button('loading');
		$btn.button('reset')
	});
});
