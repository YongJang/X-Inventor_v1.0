$(document).ready(function(){
	$('body').css('overflow','hidden');	
	
	var height = $(window).height();
	var width = $(window).width();
	$('.board').css('height',height);
	$('#create').css('width',width/8);
	$('#simulating').css('width',width/8);



	$('.item').draggable({
		containment:'document', 
		revert:true,
		start:function(event, position){
			contents = $(this).text();
			$sc=$(this);
		}
	});

	$('.board').droppable({
		hoverClass:'.board',
		accept: ".item",
		over:function(){
			$('.board').css('background-color','#505050');
			$sc.addClass('over');
		},
		out:function(){
			$('.board').css('background-color','#404040');
			$sc.removeClass('over');
		},
		drop:function(){
			if($sc.hasClass('output')){
				$('#draw').append('<div id="content" class="label label-warning">'+contents+'</div>');
			}else{
				$('#draw').append('<div id="content" class="label label-primary">'+contents+'</div>');
			}
			$('.board').css('background-color','#404040');
			$sc.removeClass('over');
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

	function put(){

	}
});

