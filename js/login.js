$(document).ready(function(){
var screenHeight=$(window).height();
var screenWidth=$(window).width();
$(".background").css({height:screenHeight,width:screenWidth});
$(".login").css({top:screenHeight/3});

})
$(document).ready(function(){
	$("#sub").click(function(){
		var name=$("#name").val();
		var password=$("#password").val();
		$.post("login.php",{name:name,password:password},function(date){
			if(date=="true")
			{
				window.location.href="window.php";
				   $.ajax({
      url:"config/config.xml",
      dataType:"xml",
      type:"post",
      success:function(xml){
           alert($(xml).find("history").find("key[name='history_one']").text(name));
      }
 });
			}
			else
			{
		      $(".Errow").html(date);
			}
		  });
		return false;
		});
	
});


$(document).ready(function(){//初始化
    $("#name").val("");
    $("#password").val("");

})