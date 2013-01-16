//////////////////////////////函数定义////////////////////////
//弹出层鼠标拉动大小
var z=200;
function win_doInit(x,width,height){
    var room = document.getElementById(x);
    room.x0=0;room.y0=0;
    room.x1=0;room.y1=0;
    room.w0=0;room.h0=0;
    room.state="normal";
    room.moveable=false;
    room.resizable=false;
    room.MoveTo=_win_doMoveTo;
    room.ResizeTo=_win_doResizeTo;
        
    room.onmousedown=_win_doMdown;
    room.onmouseup=_win_doMup;
    room.onmousemove=_win_doMmove;
    room.style.display="block";
    var w=width;//宽
    var h=height;//高
    var l=300;//left
    var t=20;//top
    room.MoveTo(l,t);
    room.ResizeTo(w,h);
   
    room.style.zIndex=z;   
    z++;

   
}
function _win_doMdown(evt){
    var e=evt?evt:window.event;//解决兼容性
    if(this.style.cursor!="default"&&this.state=="normal"){
         document.captureEvents?document.captureEvents("mousemove",this):this.setCapture();
         this.x0=e.clientX;
         this.y0=e.clientY;
         this.x1=parseInt(this.offsetLeft);//对象距离body的左距离
         this.y1=parseInt(this.offsetTop);//对象距离body的上距离
         this.w0=parseInt(this.offsetWidth);//对象宽
         this.h0=parseInt(this.offsetHeight);//对象高
         this.resizable = true;
    }
}
function _win_doMup(evt){
    var e=evt?evt:window.event;
    if(this.resizable){
        document.releaseEvents?document.releaseEvents("mousemove",this):this.releaseCapture();
            this.resizable = false;
    }
}   
function _win_doMmove(evt){
    var e=evt?evt:window.event;
    if(this.resizable){
		
        var xxx=this.style.cursor.substring(0,2).match(/[we]/);
        var yyy=this.style.cursor.substring(0,2).match(/[ns]/);
        l=this.offsetLeft;
        t=this.offsetTop;
        w=parseInt(this.style.width);
        h=parseInt(this.style.height);
        if(xxx=="w"){//左上、左下、左
            l=this.x1+e.clientX - this.x0;
            w=this.w0+this.x0-e.clientX;
            if(l<0){w+=l;l=0;}
            if(w<100){l=l+w-100;w=100;}
        }
        if(xxx=="e"){//右下、右、右上
            w=this.w0+e.clientX-this.x0;
            w=w<100?100:w;
        }
        if(yyy=="n"){//右上、左上、上
            t=this.y1+e.clientY - this.y0;
            h=this.h0+this.y0-e.clientY;
            if(t<0){h+=t;t=0;}
            if(h<20){t=t+h-20;h=20;}
        }
        if(yyy=="s"){//右下、左下、下
            h=this.h0+e.clientY-this.y0;
            h=h<20?20:h;
        }
        this.MoveTo(l,t);
        this.ResizeTo(w,h);
        
        return(true);
    }
    if(this.state=="normal"){
        var cc="";
        x=window.getRealLeft(this);//获取对象到窗口左方的距离
        y=window.getRealTop(this);//获取对象到窗口上方的距离
        w=parseInt(this.offsetWidth);//获取对象的宽
        h=parseInt(this.offsetHeight);//获取对象的高
        if(e.clientY-y<10)cc+="n";
        if(y+h-e.clientY<10)cc+="s";
        if(e.clientX-x<10)cc+="w";
        if(x+w-e.clientX<10)cc+="e";
        if(cc!=""){
            this.style.cursor=cc+"-resize";
            return(true);
        }
        if(this.style.cursor!="default"){
            this.style.cursor="default";
        }
    }
}
function _win_doMoveTo(x,y){//初始化DIV的初始位置
    x=isNaN(x)?0:parseInt(x);
    y=isNaN(y)?0:parseInt(y);
    x=x<0?0:x;
    y=y<0?0:y;
    this.style.left=x+"px";
    this.style.top=y+"px";
}
function _win_doResizeTo(w,h){//初始化DIV的初始宽高
    w=isNaN(w)?100:parseInt(w);
    h=isNaN(h)?20:parseInt(h);
    w=w<100?100:w;
    h=h<20?20:h;
   
    this.style.width=w+"px";
    this.style.height=h+"px";
}
function getRealLeft(o){
    var l=o.offsetLeft-o.scrollLeft;
    while(o=o.offsetParent){//解决对象的offsetParent不是body时的情况，如果不是则一层一层的加，一直到body，而body的offsetParent为NULL，则退出
        l+=o.offsetLeft-o.scrollLeft;
    }
    return(l);
}
function getRealTop(o){
    var t=o.offsetTop-o.scrollTop;
    while(o=o.offsetParent){
        t+=o.offsetTop-o.scrollTop;
    }
    return(t);
}





//鼠标拖拽，弹出框移动
var rDrag = {
	
	o:null,
	
	init:function(o){
		o.onmousedown = this.start;
	
	},
	start:function(e){
		var o;
		e = rDrag.fixEvent(e);
               e.preventDefault && e.preventDefault();
               rDrag.o = o = document.getElementById('background');
		       o.x = e.clientX - rDrag.o.offsetLeft;//返回一个像素数值，它表示当前元素的左边缘到它的offsetParent属性返回的对象左边缘的偏移量。此处offsetParent为body
               o.y = e.clientY - rDrag.o.offsetTop;
		document.onmousemove = rDrag.move;
		document.onmouseup = rDrag.end;
	},
	move:function(e){
		e = rDrag.fixEvent(e);
		var oLeft,oTop;
		oLeft = e.clientX - rDrag.o.x;
		oTop = e.clientY - rDrag.o.y;
		rDrag.o.style.left = oLeft+ 'px';
		rDrag.o.style.top = oTop + 'px';
	},
	end:function(e){
		e = rDrag.fixEvent(e);
		rDrag.o = document.onmousemove = document.onmouseup = null;//取消鼠标事件
	},
    fixEvent: function(e){
        if (!e) {//兼容浏览器，IE的对象是由window.event来生成，而其他浏览器（W3C标准）则有触发函数的第一个参数，即此处的e，如IE，则此处的e是空，需要重新构建一个事件对象，具体参考网站                http://zhidao.baidu.com/question/323191920.html&__bd_tkn__=74fb1a23293fdc2d1c54b63bbdb728b48a1bdae48078338d51fed8133ea5c69d362ad36bb4bcda3b39bb3949f6bbe47087ac3af56e60b1f4e7eb60157b5efe339466a0fa5e0f03de0125270fd543b0084d77e877795eccfbd23a3e09062d445dbc607b473cb0a4df9d0d88accbdc8c0bc83220f74bac
            e = window.event;
            e.target = e.srcElement;
            e.layerX = e.offsetX;
            e.layerY = e.offsetY;
        }
        return e;
    }
}

///////////////////////////////////////////////////////////////////
function permissionSetting(){
	$("#permission").click(function(){
    win_doInit("background",800,500);
    var obj = document.getElementById('backgroundHeader');
	rDrag.init(obj);
    $("#background").show();
	/*$("#userList").load("getUser.php",function(response,status,xhr){
		if(status=="success")
		{
		   
		}
		else
		{
			$(".leftContent").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		} 
		  });*/
		});
}

























////////////////////////////////////////////////////////////////////
$(document).ready(function(){
	$(".start").click(function(){
		if($(".startSeting").is(":visible"))
		{
			$(".startSeting").hide();
		    return false;
		}
		else{		
	    var offset=$(this).offset();
		var left=offset.left-10;
		var top=offset.top-$(".startSeting").height()-16;
		//alert(left+" "+top);
		$(".startSeting").css({"top":top+"px","left":left+"px"}).show();
		return false;
		}
			
			
			});
	
	$("body").click(function(Event){
		$(".startSeting").hide();
		//return false;
		Event.stopPropagation();
		});
		
									   
									   
	});
	
	
	
	
$(document).ready(function(){
   $(".liSetting").mouseover(function(){
		$("#links").hide();
		var $li=$('<li id="permission"><a href="#"><span>权限设置</span></a></li> <li> <div id="rightspliter"></div> </li><li><a href="#"><span>背景设置</span></a></li>  ');
		$("#child").show().html($li);
		permissionSetting();//为权限设置添加点击事件
		});
	
	$("#programs li:not(.liSetting)").mouseover(function(){
		$("#links").show();
		$("#child").hide();
		
		});
});


$(document).ready(function(){//前台、后台权限切换
     $("#qiantai").click(function(){$("#h3").html("选择一个用户并设置其前台权限").attr("values","qian");$(".isUser").detach();});
	 $("#houtai").click(function(){$("#h3").html("选择一个用户并设置其后台权限").attr("values","hou");$(".isUser").detach();});

});


$(document).ready(function(){//各等级用户点击事件
	$("#userList li").toggle(function(){
		var superUser=$(this).attr("id");
		var h3=$("#h3").attr("values");	
		$.post("setting/getUser.php",{userCategory:superUser,which:h3},function(data,textStatus){
			$("#"+superUser+"Span").html(data);	
			$(".isUser li").dblclick(function(){
				var userName=$(this).attr("values");	
				var permission=$(this).attr("permission");
				$(this).attr("permission",permission==1?0:1);
				var obj=$(this);
			    $.post("./setting/reviseUserPermission.php",{which:h3,permission:permission,userName:userName},function(data){
						if(obj.has(".right").length==0)
						{
							obj.append('<span class="right"></span></li>');
						}
						else{
							obj.find(".right").detach();
						}
						});
			
				return false;
				});		
			});},function(){
				var superUser=$(this).attr("id");
				$("#"+superUser+"Span").html("");
				});
	});

$(document).ready(function(){
	$("#backgroundHeader .close").click(function(){$("#background").hide();});
});


$(document).ready(function(){//动态墙事件
    $(".wall").hover(function(){
		$(this).css("margin-right",0);
		
		},function(){$(this).css("margin-right",-58);});
		
    
   $("#wallButtom_two").click(function(){$(".yd_show").show().css("height","80%")});
	
});

$(document).ready(function(){//预定提醒各种事件
	
	$(".yd_show").hover(function(){$(this).css("height","80%");},function(){$(this).css("height","6px");});
	
	$(".yd_ul>li").toggle(function(){
		var obj=$(this);
		$.post("./setting/getTodayReservation.php",function(data, textStatus){
			obj.after(data);
			$("#biaoji_snajiao").attr("class","sanjiao_two");});
		
		
		},function(){
			$(this).next("ul").detach();
			$("#biaoji_snajiao").attr("class","sanjiao_one");
			});
			
    $(".header_close .close").click(function(){$(".yd_show").hide();});
	
	//$(".yd_ul ul li").hover(function(){$(this).css("background-color","#717171");},function(){$(this).css("background-color","#CCC")});
	$("#seach_text").keyup(function(){
		$(".yd_member").hide().filter(":contains('"+($(this).val())+"')").show();
		//$("#seach_text").click(function(){$(".yd_content_show").scrollTop(21);});
		});
		
});


$(document).ready(function(){// 查询历史登陆
   $("#cx_history").click(function(){
	   $.ajax({
      url:"config/config.xml",
      dataType:"xml",
      type:"post",
      success:function(xml){
           alert($(xml).find("history").find("key[name='history_one']").text());
      }
 });

	   
	   });
});



$(document).ready(function(){//前台登陆框事件
   $("#client_login_go").click(function(){$(".client_login").fadeIn(1000);});
   $(".client_login_close").click(function(){$(".client_login").fadeOut(500).find(" input").val("");});
  
});

$(document).ready(function(){//登陆按钮
	$(".client_login_sub").click(function(){
		var name=$("#client_login_user").val();
		var password=$("#client_login_pass").val();
		$.post("login.php",{name:name,password:password},function(date){
			if(date=="true")
			{
				$(".message").html("").hide();
				window.location.href="./client/view.html";
			}
			else
			{
		      //$(".Errow").html(date);
			  $(".message").html(date).fadeIn(800);
			  
			}
		  });
		  return false;
		});
	
});

	
	/*$(document).ready(function(){
		        var dMouseX = 0;    //按下鼠标时的鼠标所在位置的横坐标  
                var dMouseY = 0;    //按下鼠标时的鼠标所在位置的纵坐标                
                var mMouseX = 0;    //移动鼠标时的鼠标所在位置的横坐标               
                var mMouseY = 0;    //移动鼠标时的鼠标所在位置的纵坐标                
                var moveLenX = 0;    //存放鼠标移动的距离，横向                
                var moveLenY = 0;    //存放鼠标移动的距离，纵向                
                var isMove = false;    //是否拖动层的一个输助"开关"                
                var movingX = 0;    //移动中元素的LEFT值               
                var movingY = 0;    //移动中元素的TOP值		
		var getMoveMouse = function(move){
                mMouseX = move.pageX;
                mMouseY = move.pageY;
                }
                
                //获得元素在页面中的当前的位置
                var getbox = function(m){
                boxX = $(".background").position().left;
                boxY = $(".background").position().top;
				
                }
                
                //获得鼠标按下时的坐标
                var getDownMouse = function(m){
                dMouseX = m.pageX;
                dMouseY = m.pageY;
                }
                
                //获得鼠标移动的距离值
                var getMoveLen = function(){
                moveLenX = mMouseX - dMouseX;
                moveLenY = mMouseY - dMouseY;
                }
                
                
                //鼠标UP时，关闭移动，即鼠标移动也不会让元素移动；
                $(".backgroundHeader").mouseup(function(){
                isMove = false;
                })
                
                
                //给元素的TOP绑定事件
                $(".backgroundHeader").mousedown(function(e){//按下时获得元素的坐标和当前鼠标的坐档；
                getbox(e);//获取要拖动元素的位置
                getDownMouse(e);//获取鼠标按下时的位置
                isMove = true;
				
				
                }).mousemove(function(e){//移动时获得移动的距离，设置元素的TOP和LEFT值；
				
                var $this = $(this);
                getMoveMouse(e);
                getMoveLen();
				leftend=boxX+moveLenX;
				topend=boxY+moveLenY;
                if(isMove){
					//alert(boxX);
					$(".background").css({"top":topend+"px","left":leftend+"px"});
				}
				})
		
		
		
		
		
		
		
		
		
		});*/