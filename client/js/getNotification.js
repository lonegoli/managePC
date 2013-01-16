function getNotification()
{
	$.ajax({
		    type:"post",
			url:"../../orderPad/getNotification.php",
			//error:function(){$(".WR_box_contentL").html("获取信息失败！")},
			success:function(data,textStatus){}	
		
		});
	return true;
}
$(document).ready(function(){
	window.setInterval(getNotification,3000);
});
