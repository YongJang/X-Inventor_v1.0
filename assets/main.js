$(document).ready(function(){
	$('body').css('overflow','hidden');	
	
	var height = $(window).height();
	var width = $(window).width();
	var inputNum=0;
	var mouseX;
	var mouseY;
	
	$('.board').css('height',height);
	$('#create').css('width',width/8);
	$('#simulating').css('width',width/8);
	
	
	
	var droppableArray = ['.board'];
	droppableString = "";
	
	for(var i=0;i<droppableArray.length;i++){
		droppableString+=' '+droppableArray[i];
	}
	
	var draggableArray = ['.board'];
	draggableString = ".item";
	
	for(var i=0;i<draggableArray.length;i++){
		draggableString+=', '+draggableArray[i];
	}

	$('.item').draggable({
		cursorAt:{top:-2,left:-2},
		containment:'document', 
		revert:true,
		start:function(event, position){
			contents = $(this).text();
			$sc=$(this);
		},
		stack:".board"
	});
	
	$("#onBoard div").draggable({
		containment:'document',
		cursorAt:{top: -2, left: -2},
		start:function(event, position){
			contents = $(this).text();
			$sc=$(this);
		},
		helper:function(event){
			return $("<div class='inputOver'>"+contents+"</div>");
		}
	});
	
	
	
	$('#onBoard').mousemove(function(event,position){
		var offset = $(this).offset();
		mouseX = event.pageX-offset.left;
		mouseY = event.pageY-offset.top;
	});
	
	

	
	$('.board').droppable({
		hoverClass:'boardOver',
		accept: ".item, #onBoard div",
		
		over:function(){
			if($sc.hasClass('output')){
				$sc.addClass('outputOver');
			}else if($sc.hasClass('input')){
				$sc.addClass('inputOver');
			}
			
			
		},
		out:function(){
			$sc.removeClass('outputOver');
			$sc.removeClass('inputOver');
		},
		drop:function(){
			if($sc.hasClass('output')){
				$('.inputID'+(inputNum-1)).append('<div class="outputContent">'+contents+'</div>');
			}else{
				$('#draw').append("<div class='"+"inputID"+inputNum+" inputContent'>"+contents+"</div>");
				$('.inputID'+inputNum).css('left',mouseX+'px');
				$('.inputID'+inputNum).css('top',mouseY+'px');
				inputNum+=1;
			}
			
			$sc.removeClass('outputOver');
			$sc.removeClass('inputOver');
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
