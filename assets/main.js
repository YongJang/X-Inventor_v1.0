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
	
	////////////////////////////////////////////////////////////
	//detail 함수 // 데이터 저장 xxxxxx
	function detailPrint(text){
		if(text === "Brightness"){
			return "<tr><th><label>| Detecting brightness</label></th><td class='selector'><select class='form-control input-lg'><option value=''></option><option value='0'>Daytime</option><option value='1'>Midnight</option><option value='2'>Night</option> 			<option value='3'>Laser</option>		      			<option value='4'>LED</option>				</select>			</td>		</tr>";
		}else if(text === "Length"){
			return "<tr>										<th><label>| Detecting length</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>cm</span>                        	    			</div>										</td>									</tr>									<tr>										<th><label>| Length Resolution</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>cm</span>                        	    			</div>										</td>									</tr>";
		}else if(text === "Compass"){
			return "<tr>										<th><label>| Compass Resolution</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>º</span>                        	    			</div>										</td>									</tr>";
		}else if(text === "Heartbeat"){
			return "";
		}else if(text === "Sound"){
			return "<tr>										<th><label>| Detecting loudness</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>dB</span>                        	    			</div>										</td>									</tr>									<tr>										<th><label>| Loudness resolution</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>dB</span>                        	    			</div>										</td>									</tr>									<tr>										<th><label>| Detecting frequency</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>Hz</span>                        	    			</div>										</td>									</tr>									<tr>										<th><label>| Detecting resolution</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>Hz</span>                        	    			</div>										</td>									</tr>";		
		}else if(text === "Time"){
			return "<tr>										<th><label>| Detecting time</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>min</span>                        	    			</div>										</td>									</tr>									<tr>										<th><label>| Time resolution</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>min</span>                        	    			</div>										</td>									</tr><tr>								<th class='selector2' colspan='2'>											<div class='control-group' style='text-align:center;'><label class='radio-inline'><input type='radio' name='selTime' value='0'>Current</label><label class='radio-inline'><input type='radio' name='selTime' value='1'>Custom</label>                						</div>	</th>	</tr>";
		}else if(text === "Rotation"){
			return "<tr>										<th><label>| Detecting angle</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>º</span>                        	    			</div>										</td>									</tr>									<tr>										<th><label>| Angle resolution</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>º</span>                        	    			</div>										</td>									</tr>";
		}else if(text === "Color"){
			return "<tr>										<th><label>| RGB resolution</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>grd</span>                        	    			</div>										</td>									</tr>";
		}else if(text === "Acceleration"){
			return "<tr>										<th><label>| Detecting accel</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>g</span>                        	    			</div>										</td>									</tr>									<tr>										<th><label>| Resolution</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>g</span>                        	    			</div>										</td>									</tr>";
		}else if(text === "Slope"){
			return "<tr>										<th><label>| Resolution</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>º</span>                        	    			</div>										</td>									</tr>";
		}else if(text === "Humidity"){
			return "<tr>										<th><label>| Humidity resolution</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>%</span>                        	    			</div>										</td>									</tr>";
		}else if(text === "Temperature"){
			return "<tr>										<th><label>| Thermometry range </label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>~</span>                <input name='length' type='text' class='form-control' placeholder='0'>        	    <span class='input-group-addon'>ºC</span>			</div>										</td>									</tr>									<tr>										<th><label>| Resolution</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>ºC</span>                        	    			</div>										</td>									</tr>";
		}
		else{
			return "<tr><th><label>| Detecting brightness</label></th><td class='selector'><select class='form-control input-lg'><option value=''></option><option value='0'>Daytime</option><option value='1'>Midnight</option><option value='2'>Night</option> 			<option value='3'>Laser</option>		      			<option value='4'>LED</option>				</select>			</td>		</tr>";
		}
	}
	function detailOutPrint(text){
		if(text === " Movement"){
			return "<tr>										<th><label>| Movement type</label></th>										<td class='selector'>											<select class='form-control input-lg' id='sel'>												<option value=''></option>                   				        		<option value='R'>Rotating</option>                   				      			<option value='L'>Linear</option>                   				      			<option value='A'>Angle</option>											</select>										</td>									</tr>";
		}else if(text === " Light"){
			return "<tr>										<th><label>| Actuating light</label></th>										<td class='selector'>											<select class='form-control input-lg'>												<option value='></option>                   				        		<option value='0'>Bulb</option>                   				      			<option value='1'>Candle</option>                   				      			<option value='2'>Halogen</option>                   				      			<option value='3'>Neon</option>                   				      			<option value='4'>Lamp</option>                   				      			<option value='5'>Lighter</option>											</select>										</td>									</tr>";
		}else if(text === " Speaker"){
			return "<tr>										<th><label>| Actuating loudness</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>dB</span>                        	    			</div>										</td>									</tr>									<tr>										<th><label>| Loudness resolution</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>dB</span>                        	    			</div>										</td>									</tr>									<tr>										<th><label>| Actuating frequency</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>Hz</span>                        	    			</div>										</td>									</tr>									<tr>										<th><label>| Frequency resolution</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>Hz</span>                        	    			</div>										</td>									</tr>";
		}else if(text === " Vibration"){
			return "<tr>										<th><label>| Intensity</label></th>										<td class='selector'>											<select class='form-control input-lg'>                   				        		<option value='0'>High</option>                   				      			<option value='1'>Middle</option>                   				      			<option value='2'>Low</option>											</select>										</td>									</tr>";
		}else if(text === " Save Data"){
			return "<tr>										<th><label>| Data type</label></th>										<td class='selector'>											<select class='form-control input-lg'>                   				        		<option value='0'>txt</option>                   				      			<option value='1'>Excel</option>                   				      			<option value='2'>Image</option>                   				      			<option value='3'>Video</option>											</select>										</td>									</tr>";
		}else if(text === " H A"){
			return "";
		}else if(text === " Waterpump"){
			return "<tr>										<th><label>| Flow</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>㎖/s</span>                        	    			</div>										</td>									</tr>";
		}else if(text === " Display"){
			return "<tr>										<th><label>| Display type</label></th>										<td class='selector'>											<select class='form-control input-lg'>                   				        		<option value='0'>Text</option>                   				      			<option value='1'>Image</option>                   				      			<option value='2'>Video</option>											</select>										</td>									</tr>";
		}else if(text === " Heater"){
			return "<tr>										<th><label>| Actuating temperature</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>~</span>              <input name='length' type='text' class='form-control' placeholder='0'>          	<span class='input-group-addon'>ºC</span>    			</div>										</td>									</tr>									<tr>										<th><label>| Heat power</label></th>										<td class='selector'>											<div class='input-group input-group-lg'>											<input name='length' type='text' class='form-control' placeholder='0'>                        	    			<span class='input-group-addon'>W</span>                        	    			</div>										</td>									</tr>";
		}
		else{
			return "<tr>										<th><label>| Movement type</label></th>										<td class='selector'>											<select class='form-control input-lg' id='sel'>												<option value=''></option>                   				        		<option value='R'>Rotating</option>                   				      			<option value='L'>Linear</option>                   				      			<option value='A'>Angle</option>											</select>										</td>									</tr>";
		}
	}
	
	////////////////////////////////////////////////////////////
	
	$('.board').css('height', height);
	$('.garbage').css({'width' : widthG, 'left' : colWidth+'px'});

	$('.process').css({'top' : height-100+'px'});
	$('#simulate').css({'width' : (width/8)+20});
	$('#create').css({'width' : (width/8)+20});
	$('.detail').css({'top' : height-200+'px', 'left' : ((widthG/2)-150)+'px'});
	$(window).resize(function(){
		$('.board').css('height', height);
		$('.garbage').css({'width' : widthG, 'left' : colWidth+'px'});
		$('.process').css({'top' : height-100+'px'});
		$('#simulate').css({'width' : (width/8)+20});
		$('#create').css({'width' : (width/8)+20});
	});
	
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
	
	var sel  = document.getElementsByName("selTime");
	sel[0]=true;
		if(sel[0] == true)
			sel[1] == false;
		else
			sel[0] ==false;
		
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
		accept:".outputContent, .inputContent",
		tolerance:"touch",
		drop:function(){
			$sc.remove();			
		}
	});
	$('.sidebar').droppable({
		accept:".outputContent, .inputContent",
		tolerance:"touch",
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
			}
			if($sc.hasClass('input') && !($sc.hasClass('inputContent'))){
				if($sc.text() === " Brightness"){
					newObj = new Brightness();
				}else if($sc.text() === " Length"){
					newObj = new Length();
				}else if($sc.text() === " Compass"){
					newObj = new Compass();
				}else if($sc.text() === " Heartbeat"){
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
								detailInput = $(this).parent().text();
								detailInput = detailInput.substring(1,detailInput.length);
								var io = detailInput.indexOf(" ");
								detailInput = detailInput.substring(0,io);
								
								$(this).toggleClass("outputToggle",1,function(){
									detailOutput = $(this).text();
									var text;
									text = detailPrint(detailInput);
									text = text+detailOutPrint(detailOutput);
									$('.detail').find('tr').remove();
									$('.detail table').append(text);		
									//prompt($("#sel option").length);
									var idx;
									var text2="";
									$(document).on('change', '#sel', function(){
										idx = $("#sel option").length - $("#sel option:selected").index();
										
											$('.detailContent #R').each(function(){
												$(this).remove();
											});
											$('.detailContent #L').each(function(){
												$(this).remove();
											});
											$('.detailContent #A').each(function(){
												$(this).remove();
											});
										text2="";
										switch(idx){
											case 3: 
												text2='<!-- Rotating --><tr id="R"><th><label>| Torque</label></th><td class="selector"><div class="input-group input-group-lg">											<input name="length" type="text" class="form-control" placeholder="0">                        	    			<span class="input-group-addon">kgf·cm</span>                        	    			</div>										</td>									</tr>									<tr id="R">										<th><label>| Rotating speed</label></th>										<td class="selector">											<div class="input-group input-group-lg">										<input name="length" type="text" class="form-control" placeholder="0">                        	    			<span class="input-group-addon">rpm</span>                        	    			</div>										</td>									</tr>									<tr id="R">										<th><label>| Direction</label></th>										<td class="selector">											<select class="form-control input-lg">                   				        		<option value="1">One</option>                  				      			<option value="2">Both</option>											</select>										</td>									</tr>									<tr id="R">										<th><label>| Angle controllable</label></th>										<td class="selector">											<select class="form-control input-lg">                 				        		<option value="1">Yes</option>                  				      			<option value="2">No</option>											</select>										</td>									</tr>';
												break;
											case 2:
												text2='<!-- Linear --><tr id="L"><th><label>| Force</label></th><td class="selector"><div class="input-group input-group-lg">								<input name="length" type="text" class="form-control" placeholder="0"><span class="input-group-addon">N</span>            	    			</div></td>						</tr>					<tr id="L">							<th><label>| Linear speed</label></th><td class="selector">								<div class="input-group input-group-lg">								<input name="length" type="text" class="form-control" placeholder="0"><span class="input-group-addon">cm/s</span>           	    			</div>							</td>						</tr>						<tr id="L">							<th><label>| Actuating length</label></th>							<td class="selector">								<div class="input-group input-group-lg">								<input name="length" type="text" class="form-control" placeholder="0">            	    			<span class="input-group-addon">cm</span>            	    			</div>							</td>						</tr>						<tr id="L">							<th><label>| Length resolution</label></th>							<td class="selector">								<div class="input-group input-group-lg">								<input name="length" type="text" class="form-control" placeholder="0">            	    			<span class="input-group-addon">cm</span>            	    			</div>							</td>						</tr>';
												break;
											case 1:
												text2='<!-- Angle --><tr id="A"><th><label>| Torque</label></th><td class="selector"><div class="input-group input-group-lg">													<input name="length" type="text" class="form-control" placeholder="0">		                        	    			<span class="input-group-addon">kgf·cm</span>		                        	    			</div>												</td>											</tr>											<tr id="A">												<th><label>| Angular speed</label></th>											<td class="selector">													<div class="input-group input-group-lg">													<input name="length" type="text" class="form-control" placeholder="0">		                        	    			<span class="input-group-addon">º/s</span>		                        	    			</div>												</td>											</tr>											<tr id="A">												<th><label>| Actuating angle</label></th>												<td class="selector">													<div class="input-group input-group-lg">													<input name="length" type="text" class="form-control" placeholder="0">		                        	    			<span class="input-group-addon">º</span>		                        	    			</div>												</td>											</tr>											<tr id="A">												<th><label>| Angle resolution</label></th>												<td class="selector">													<div class="input-group input-group-lg">													<input name="length" type="text" class="form-control" placeholder="0">		                        	    			<span class="input-group-addon">º</span>		                        	    			</div>												</td>											</tr>';
												break;
											default:
												break;
										}
										$('.detail table').append(text2);
									});
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
									$(document).on('hover', '.board', function(){
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
	
	$('.process').on('click', function(){
		var $btn = $(this).button('loading');
		$btn.button('reset');
	});
	
	function put(){

	}
});
