$(document).ready(function(){
	$('body').css('overflow','hidden');	
	
	var height = $(window).height();
	var width = $(window).width();
	var colWidth = $('.col-md-2').css('width').replace(/[^-\d\.]/g, '');
	var inputNum=0;
	var outputNum=0;
	var mouseX;
	var mouseY;
	var mouseBoxX;
	var mouseBoxY;
	var widthG = $('.col-md-8').css('width').replace(/[^-\d\.]/g, '');
	var heightG = $('.board').css('height').replace(/[^-\d\.]/g, '');
	$('.board').css('height', height);
	$('.garbage').css({'width' : widthG, 'left' : colWidth+'px'});
	$('#create').css('width', width/8);
	$('#simulating').css('width', width/8);	
	$('#center').css({'width' : widthG, 'left' : colWidth+'px'});
	$('#center').css({'height' : heightG, 'top' : '0px'});
	
	
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
			$(".input, .output").mousemove(function(event,position){
				var offset = $(this).offset();
				mouseBoxX=event.pageX-offset.left;
				mouseBoxY=event.pageY-offset.top;
			});
		}
	});
	//마우스 좌표 인식
	//$('document').mousemove(function(event,position){
		//var offset = $(this).offset();
		//mouseX = event.pageX;//-offset.left;
		//mouseY = event.pageY;//-offset.top;
	//});	
	//드롭시 이벤트 설정
	$('.garbage').droppable({
		accept:".inputContent, .outputContent",
		drop:function(){
			$sc.fadeOut(100).delay(200).queue(function(){
			       $(this).hide();
		    });
			$sc.remove();
		}
	});

	$('.board').droppable({
		hoverClass:'boardOver',
		accept: ".input, #onBoard .inputContent, .output",
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
				$('#inputID'+inputNum).css({'left':(mouseX-mouseBoxX)+'px', 'top':mouseY-mouseBoxY+'px'});
				$("#inputID"+inputNum).draggable({
					containment:'document',
					snap:'.inputContent',
					snapMode:'outer',
					start:function(event){
						$('.garbage').animate({
							top: "0px"
						}, 175);
						$('.board').animate({
							top: "50px"
						}, 175);
						contents = $(this).text();
						$sc=$(this);
					},
					stop:function(){
						$('.garbage').animate({
							top: "-50px"
						}, 175);
						$('.board').animate({
							top: "0px"
						}, 175);
					}				
				});
				$("#inputID"+inputNum).droppable({
					accept:".output, .outputContent",
					over:function(){
						if($sc.hasClass('output')){
							$sc.addClass('outputBoxOver');
						}
					},
					drop:function(){
						if($sc.hasClass('output') && !$sc.hasClass('outputContent')&&!$sc.hasClass('moved')){
							$(this).append("<div id = 'outputID"+outputNum+"' class='outputContent'>"+contents+"</div>");
							$('#outputID'+outputNum).addClass("moved");
							$('#outputID'+outputNum).css('position','relative');
							$sc.removeClass('outputBoxOver');
						}
						else if($sc.hasClass('outputContent')&&!$sc.hasClass('moved')){
							$(this).append("<div id = 'outputID"+outputNum+"' class='outputContent'>"+contents+"</div>");
							$('#outputID'+outputNum).addClass("moved");
							$('#outputID'+outputNum).css('position','relative');
							$sc.removeClass('outputBoxOver');
							$sc.remove();
						}
						$("#outputID"+outputNum).draggable({
							containment:'document',
							snap:'.outputContent',
							snapMode:'outer',
							start:function(event){								
								$('#outputID'+outputNum).css('position','fixed');
								$('.garbage').animate({
									top: "0px"
								}, 175);
								$('.board').animate({
									top: "50px"
								}, 175);
								contents = $(this).text();
								$sc=$(this);
							},
							drag:function(event){
								mouseX = event.pageX;//-offset.left;
								mouseY = event.pageY;//-offset.top;
								$(".output, .outputContent").mousemove(function(event,position){
									var offset = $(this).offset();
									mouseBoxX=event.pageX-offset.left;
									mouseBoxY=event.pageY-offset.top;
								});
							},
							stop:function(){
								$('.garbage').animate({
									top: "-50px"
								}, 175);
								$('.board').animate({
									top: "0px"
								}, 175);
								$sc.remove();
								outputNum++;
								$("#draw").append("<div id = 'outputID"+outputNum+"' class='outputContent'>"+contents+"</div>");								
								$('#outputID'+outputNum).css('position','fixed');
								$('#outputID'+outputNum).css({'left':(mouseX-mouseBoxX)+'px', 'top':mouseY-mouseBoxY+'px'});
								$("#outputID"+outputNum).draggable({
									containment:'document',
									snap:'.outputContent',
									snapMode:'outer',
									start:function(event){
										$('.garbage').animate({
											top: "0px"
										}, 175);
										$('.board').animate({
											top: "50px"
										}, 175);
										contents = $(this).text();
										$sc=$(this);
									},
									stop:function(){
										$('.garbage').animate({
											top: "-50px"
										}, 175);
										$('.board').animate({
											top: "0px"
										}, 175);
									}
								});
								outputNum++;
							}
						});
						outputNum++;
					},
					out:function(){
						$sc.removeClass('outputBoxOver');
					}
				});				
				inputNum++;				
			}
			if($sc.hasClass('output') && !($sc.hasClass('outputContent')) && !($sc.hasClass('outputBoxOver'))){
				$('#draw').append("<div id = 'outputID"+outputNum+"' class='outputContent'>"+contents+"</div>");
				$('#outputID'+outputNum).css('position','fixed');
				$('#outputID'+outputNum).css({'left':(mouseX-mouseBoxX)+'px', 'top':mouseY-mouseBoxY+'px'});
				$("#outputID"+outputNum).draggable({
					containment:'document',
					snap:'.outputContent',
					snapMode:'outer',
					start:function(event){
						$('.garbage').animate({
							top: "0px"
						}, 175);
						$('.board').animate({
							top: "50px"
						}, 175);
						contents = $(this).text();
						$sc=$(this);
					},
					stop:function(){
						$('.garbage').animate({
							top: "-50px"
						}, 175);
						$('.board').animate({
							top: "0px"
						}, 175);
					}
				});
				outputNum++;
			}
			$sc.removeClass('outputOver');
			$sc.removeClass('inputOver');
		}
	});
	$
	$('.btn').on('click', function(){
		var $btn = $(this).button('loading');
		$btn.button('reset');
	});

	function put(){

	}
});
