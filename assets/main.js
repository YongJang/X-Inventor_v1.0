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
	/** 객체 선언 **/
	// 부모 클래스
	function InputItem(){
			this.id=0;
			this.getID = function(){
				return this.id;
			};
			this.setID = function(id){
				this.id = id;
			};
			this.outputList = new Array();
	};
	
	function OutputItem(){
		this.InputItem = new Object();
		this.id=0;
		this.getID = function(){
			return this.id;
		};
		this.setID = function(id){
			this.id = id;
		};
		this.savedClass;
	};
	
	//////////////////////////////////////////////////////////////
	function Brightness(){
		this.detectingBrightness = "Daytime";
		this.draw = function(){
			return "<div id='inputID"+this.id+"' class='inputContent'> Brightness</div>";
		};
	};
	
	function Length(){
		this.detectingLength = 0;	//default setting
		this.selectedLengthUnit = "mm";	//default setting
		this.resolution = 0;	//default setting
		this.selectedResolutionUnit = "default";
		this.draw = function(){
			return "<div id='inputID"+this.id+"' class='inputContent'> Length</div>";
		};
	};
	
	function Compass(){
		this.draw = function(){
			return "<div id='inputID"+this.id+"' class='inputContent'> Compass</div>";
		};
	};
	
	function Heartbeat(){
		this.draw = function(){
			return "<div id='inputID"+this.id+"' class='inputContent'> Heartbeat</div>";
		};
	};
	
	function Sound(){
		this.draw = function(){
			return "<div id='inputID"+this.id+"' class='inputContent'> Sound</div>";
		};
	};
	
	function Time(){
		this.draw = function(){
			return "<div id='inputID"+this.id+"' class='inputContent'> Time</div>";
		};
	};
	
	function Rotation(){
		this.draw = function(){
			return "<div id='inputID"+this.id+"' class='inputContent'> Rotation</div>";
		};
	};
	function Color(){
		this.draw = function(){
			return "<div id='inputID"+this.id+"' class='inputContent'> Color</div>";
		};
	};
	function Slope(){
		this.draw = function(){
			return "<div id='inputID"+this.id+"' class='inputContent'> Slope</div>";
		};
	};
	function Acceleration(){
		this.draw = function(){
			return "<div id='inputID"+this.id+"' class='inputContent'> Acceleration</div>";
		};
	};
	function Humidity(){
		this.draw = function(){
			return "<div id='inputID"+this.id+"' class='inputContent'> Humidity</div>";
		};
	};
	function Temperature(){
		this.draw = function(){
			return "<div id='inputID"+this.id+"' class='inputContent'> Temperature</div>";
		};
	};
	////////////////////////////////////////////////////////////////////////////////
	function Speaker(){
		this.draw = function(){
			return "<div id = 'outputID"+this.id+"' class='outputContent'> Speaker</div>";
		};
	};
	function Movement(){
		this.draw = function(){
			return "<div id = 'outputID"+this.id+"' class='outputContent'> Movement</div>";
		};
	};
	function Light(){};
	function Vibration(){};
	function SaveData(){};
	function HA(){};
	function Waterpump(){};
	function Display(){};
	function Heater(){};
	
	///////////////////////////////////////////////////////////////////////////////////
	Brightness.prototype = new InputItem();
	Length.prototype = new InputItem();
	Compass.prototype = new InputItem();
	Heartbeat.prototype = new InputItem();
	Sound.prototype = new InputItem();
	Time.prototype = new InputItem();
	Rotation.prototype = new InputItem();
	Color.prototype = new InputItem();
	Slope.prototype = new InputItem();
	Acceleration.prototype = new InputItem();
	Humidity.prototype = new InputItem();
	Temperature.prototype = new InputItem();
	///////////////////////////////////////////////////////////////
	Speaker.prototype = new OutputItem();
	Movement.prototype = new OutputItem();
	Light.prototype = new OutputItem();
	Vibration.prototype = new OutputItem();
	SaveData.prototype = new OutputItem();
	HA.prototype = new OutputItem();
	Waterpump.prototype = new OutputItem();
	Display.prototype = new OutputItem();
	Heater.prototype = new OutputItem();
	
	
	///////////////////
	///객체를 저장하는 배열///
	var inputArray = [];
	var outputArray = new Array();

	
	//////////////////
	var newObj;	//inputItem을 저장할 변수
	var newOut; //outoutItem을 저장할 변수
	
	//////////////////
	
	$('.board').css('height', height);
	$('.garbage').css({'width' : widthG, 'left' : colWidth+'px'});

	$('.process').css({'top' : height-100+'px'});
	$('#simulate').css({'width' : (width/8)+20});
	$('#create').css({'width' : (width/8)+20});
	$('.detail').css({'top' : height-200+'px', 'left' : ((widthG/2)-150)+'px'});

	
	var detailInput;
	var detailOutput;
	
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
	
	$('.detail').draggable({
		containment:'document'
	});
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
		tolerance:"touch",
		drop:function(){
			$sc.remove();
		}
	});
	$('.sidebar').droppable({
		accept:".inputContent, .outputContent",
		drop:function(){
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
			if($sc.hasClass('output') && !$sc.hasClass('outputContent')){	//새로 생성되는  output 객체일 때 
				if($sc.text() === " Speaker"){
					newOut = new Speaker();
				}else if($sc.text() === " Movement"){
					newOut = new Movement();
				}else{
					newOut = new Movement();
				}
				
				newOut.prototype = new OutputItem();
				newOut.savedClass = $sc;
				newOut.setID(outputNum++);
				newOut.savedClass.addClass("outputClass"+newOut.getID()); 
				prompt(newOut.savedClass.attr("class"));
				
				
			}
			if($sc.hasClass('input') && !($sc.hasClass('inputContent'))){
				if($sc.text() === " Brightness"){
					newObj = new Brightness();
				}else if($sc.text() === " Length"){
					newObj = new Length();
				}else if($sc.text() === " Compass"){
					newObj = new Compass();
				}else if($sc.text() === " Heart beat"){
					newObj = new Heartbeat();
				}else if($sc.text() === " Sound"){
					newObj = new Sound();
				}else if($sc.text() === " Time"){
					newObj = new Time();
				}else if($sc.text() === " Rotation"){
					newObj = new Rotation();
				}else if($sc.text() === " Color"){
					newObj = new Color();
				}else if($sc.text() === " Acceleration"){
					newObj = new Acceleration();
				}else if($sc.text() === " Slope"){
					newObj = new Slope();
				}else if($sc.text() === " Humidity"){
					newObj = new Humidity();
				}else{
					newObj = new Temperature();
				}
					newObj.prototype = new InputItem();
					newObj.setID(inputNum);
					inputArray[newObj.getID()] = newObj;
					
					//확인 코드//
					//var i= inputArray[newObj.getID()].draw();
					//prompt(i);
					//////////
					
					$('#draw').append(newObj.draw());
					$('#inputID'+newObj.getID()).css({'left':(mouseX-mouseBoxX)+'px', 'top':mouseY-mouseBoxY+'px'});
					$("#inputID"+newObj.getID()).draggable({
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
						drag:function(event){
							mouseY = event.pageY;//-offset.top;
							if(mouseY<100){
								$('.garbage').css({'height':50+(100-mouseY)+'px'});
							}else{
								$('.garbage').css({'height':50+'px'});
							}
						},
						stop:function(){
							$('.garbage').animate({
								top: "-50px",
								height: "50px"
							}, 175);
							$('.board').animate({
								top: "0px"
							}, 175);
						}				
					});
					$("#inputID"+newObj.getID()).droppable({
						accept:".output, .outputContent, outputToggle",
						over:function(){
							if($sc.hasClass('output')){
								$sc.addClass('outputBoxOver');
							}
						},
						drop:function(){
							if($sc.hasClass('output') && !$sc.hasClass('outputContent')&&!$sc.hasClass('moved')){		//output이 바로 input으로 드롭될때
								$(this).append("<div id = 'outputID"+outputNum+"' class='outputContent'>"+contents+"</div>");
								//$('#outputID'+outputNum).addClass("selectable");
								$('#outputID'+outputNum).addClass("moved");
								$('#outputID'+outputNum).css('position','relative');
								$sc.removeClass('outputBoxOver');
							}
							else if($sc.hasClass('outputContent')&&!$sc.hasClass('moved')){							// 보드에 있던 output이 input으로 드롭될 때
								$(this).append("<div id = 'outputID"+outputNum+"' class='outputContent'>"+contents+"</div>");
								//$('#outputID'+outputNum).addClass("selectable");
								$('#outputID'+outputNum).addClass("moved");
								$('#outputID'+outputNum).css('position','relative');
								$sc.removeClass('outputBoxOver');
								$sc.remove();
							}
							$("#outputID"+outputNum).click(function(){
								$(this).parent().parent().find('div').removeClass("outputToggle");
								detailInput = $(this).parent().val();
								$(this).toggleClass("outputToggle",1,function(){
									detailOutput = $(this).text();
									
									$('.detail').append("<li>"+detailInput+"</li>");
									$('.detail').append("<li>"+detailOutput+"</li>");
								});
							});
						
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
									if(mouseY<100){
										$('.garbage').css({'height':50+(100-mouseY)+'px'});
									}else{
										$('.garbage').css({'height':50+'px'});
									}
								},
								stop:function(){
									$('.garbage').animate({
										top: "-50px",
										height: "50px"
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
										drag:function(event){
											mouseY = event.pageY;//-offset.top;
											if(mouseY<100){
												$('.garbage').css({'height':50+(100-mouseY)+'px'});
											}else{
												$('.garbage').css({'height':50+'px'});
											}
										},
										stop:function(){
											$('.garbage').animate({
												top: "-50px",
												height: "50px"
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
			if($sc.hasClass('output') && !($sc.hasClass('outputContent')) && !($sc.hasClass('outputBoxOver'))){	//리스트에 있던 output이 보드에 드롭될 때
				
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
					drag:function(event){
						mouseY = event.pageY;//-offset.top;
						if(mouseY<100){
							$('.garbage').css({'height':50+(100-mouseY)+'px'});
						}else{
							$('.garbage').css({'height':50+'px'});
						}
					},
					stop:function(){
						$('.garbage').animate({
							top: "-50px",
							height: "50px"
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
	$('.process').on('click', function(){
		var $btn = $(this).button('loading');
		$btn.button('reset');
	});

	function put(){

	}
});
