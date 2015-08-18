$(document).ready(function(){
	$('body').css('overflow','hidden');	
	
	var height = $(window).height();
	var width = $(window).width();
	var colWidth=$(window).width()/6;
	var inputNum=0;
	var mouseX;
	var mouseY;
	var mouseBoxX;
	var mouseBoxY;
	
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
	//드래그시 이벤트 설정
	$('.item').draggable({
		//cursorAt:{top:-2,left:-2},
		containment:'document', 
		revert:true,
		start:function(){
			contents = $(this).text();
			$sc=$(this);
		},
		stack:".board",
		drag:function(event){
			mouseX = event.pageX;//-offset.left;
			mouseY = event.pageY;//-offset.top;
		}
	});
	//마우스 좌표 인식
	//$('document').mousemove(function(event,position){
		//var offset = $(this).offset();
		//mouseX = event.pageX;//-offset.left;
		//mouseY = event.pageY;//-offset.top;
	//});	
	//드롭시 이벤트 설정
	$('.board').droppable({
		hoverClass:'boardOver',
		accept: ".input, #onBoard .inputContent",
		//보드에 아이템을 올려놨을 때
		over:function(){
			if($sc.hasClass('output')){
				$sc.addClass('outputOver');
			}else if($sc.hasClass('input')){
				$sc.addClass('inputOver');
			}			
		},
		//보드에서 벗어날 때
		out:function(){
			$sc.removeClass('outputOver');
			$sc.removeClass('inputOver');
		},
		//보드에 드롭했을 때
		drop:function(){
			if($sc.hasClass('input') && !($sc.hasClass('inputContent'))){
				$('#draw').append("<div id='inputID"+inputNum+"' class='inputContent'>"+contents+"</div>");
				$('#inputID'+inputNum).css('left',(mouseX-colWidth)+'px');
				$('#inputID'+inputNum).css('top',mouseY+'px');
				$("#inputID"+inputNum).draggable({
					snap:'.inputContent',
					snapMode:'outer',
					containment:'document',
					start:function(event){
						contents = $(this).text();
						$sc=$(this);
					}
				});
				$("#inputID"+inputNum).droppable({
					accept:".output",
					drop:function(){
						if($sc.hasClass('output')){
							$(this).append('<div class="outputContent">'+contents+'</div>');
						}
					}
				});
				inputNum+=1;				
			}			
			$sc.removeClass('outputOver');
			$sc.removeClass('inputOver');
		}
	});
	
	$('.btn').on('click', function(){
		var $btn = $(this).button('loading');
		$btn.button('reset')
	});

	function put(){

	}
});
