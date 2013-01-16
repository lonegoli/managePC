var html="";
function hideDiv(){
	
	$("#showDiv").fadeOut(3000);
}


function showDiv(){
	var div='<div id="showDiv" style="position:fixed; width:220px;height:120px;display:none;bottom:40px;right:8px;border:1px solid #CCC;background:url(./images/bg001.png) repeat scroll 0 0 #FFF;-moz-border-radius:8px 8px 0px 0px;-webkit-border-radius:8px 8px 0px 0px;border-radius: 8px 8px 0px 0px;"><div class="showDiv_close" style="float:right;margin-top:6px;cursor:pointer;">关闭</div><div style="margin-left:4px;margin-right:4px;margin-top:30px;background-color:#fff;height:89px;">'+html+'</div></div>';	
	$("body").append(div);
	$("#showDiv").slideDown(2000,function(){t=setTimeout(hideDiv,2000);$("#showDiv").hover(function(){clearTimeout(t);$(this).stop().animate({opacity:"1"},500);},function(){t=setTimeout(hideDiv,2000)});});
	$("#showDiv .showDiv_close").click(function(){$("#showDiv").detach();});
}

$(document).ready(function(){
	$.post("./setting/getTodayInfo.php",function(date){
		if(date==0)
		{
			
		}
		else{
			html='<h3 style="margin:0px;padding:0px;">今日预定提醒：</h3><span>今日'+date+'个预定，请查询详细情况！<span>';
			
			setTimeout(showDiv,2000);
		}
		
		});
	

});