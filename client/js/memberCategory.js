function addbuttomdo(){//添加按钮处理过程
		var cardCategoryName=$("#cardCategoryName").val();
		if(cardCategoryName=="")
		{
			alert("会员卡类型名称不能为空");
			return false;
		}
		$("#cardCategoryName").trigger('blur');
	    var numError=$('.onError').length;
	    if(numError)
	    {
		 return false;
	    }
		var rewardPoints=$("#rewardPoints:checked").val()?1:0;
		var feeChargCard=$("#feeChargCard:checked").val()?1:0;
		var disCountCategory=$("#discountCategory option:selected").val();
		var remark=$("#remark").val();
		var timeRestrain=$("#timeRestrain option:selected").val();
		var startTime=$("#startTime").val();
		var endTime=$("#endTime").val();
		if(timeRestrain==1)//当约束受限时，时间不能为空
		{
			
			 if(startTime==""||endTime=="")
			 {
				 alert("时间段设置成受限，时间不能为空");
			 }
		}
		//alert(cardCategoryName+" "+rewardPoints+" "+feeChargCard+" "+disCountCategory+" "+remark+" "+timeRestrain+" "+startTime+" "+endTime);
		 $(".leftContent").load("addCardCategory.php",{cardCategoryName:cardCategoryName,rewardPoints:rewardPoints,feeChargCard:feeChargCard,disCountCategory:disCountCategory,remark:remark,timeRestrain:timeRestrain,startTime:startTime,endTime:endTime},function(response,status,xhr){
		if(status=="success")
		{
			changeTr();
			changeTdName();
		}
		else
		{
			$(".leftContent").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		} 
		});
		
		
		}
		
		
function revisebuttomdo(){//添加按钮处理过程
        
        var cardCategoryID=$("#biaoji select option:checked").val();
		var rewardPoints=$("#rewardPoints:checked").val()?1:0;
		var feeChargCard=$("#feeChargCard:checked").val()?1:0;
		var disCountCategory=$("#discountCategory option:selected").val();
		var remark=$("#remark").val();
		var timeRestrain=$("#timeRestrain option:selected").val();
		var startTime=$("#startTime").val();
		var endTime=$("#endTime").val();
        //alert(cardCategoryName+" "+rewardPoints+" "+feeChargCard+" "+disCountCategory+" "+remark+" "+timeRestrain+" "+startTime+" "+endTime);
		$(".leftContent").load("reviseCardCategory.php",{cardCategoryID:cardCategoryID,rewardPoints:rewardPoints,feeChargCard:feeChargCard,disCountCategory:disCountCategory,remark:remark,timeRestrain:timeRestrain,startTime:startTime,endTime:endTime},function(response,status,xhr){
		if(status=="success")
		{
			changeTr();
			changeTdName();
		}
		else
		{
			$(".leftContent").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		} 
		});
}

function changeTr(){//鼠标指到相应位置变色
      $("tr").hover(function(){$(this).addClass("changeTr");},function(){$(this).removeClass("changeTr");});

}
function changeTdName(){
	  $("tr").each(function(){
		  
		  var $jifen=$(this).children().eq(5);//是否积分
		  var jifen=$jifen.html();
		  switch(jifen){
			  case "0":$jifen.html("否");break;
			  case "1":$jifen.html("是");break;
		  }
		  
		  var $chuzhi=$(this).children().eq(7);//是否储值卡
		  var chuzhi=$chuzhi.html();
		  switch(chuzhi){
			  case "0":$chuzhi.html("否");break;
			  case "1":$chuzhi.html("是");break;
		  }
		  
		  var $yueshu=$(this).children().eq(9);//是否储值卡
		  var yueshu=$yueshu.html();
		  switch(yueshu){
			  case "0":$yueshu.html("不受限");break;
			  case "1":$yueshu.html("受限");break;
		  }
		  
		  });
}

function checkCardCategoryName(){
	      var cardCategoryName=$("#cardCategoryName").val();
		  $("#jianche").load("check.php",{check:"cardCategoryName",cardCategoryName:cardCategoryName},function(response,status,xhr){
		if(status=="success")
		{
			
		}
		else
		{
			$(".rightContent").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		} 
		});
}
$(document).ready(function(){//增加、修改点击事件
	  $(".daohang li#add").click(function(){
		  $(this).siblings().removeClass("select");
		  $(this).addClass("select");
		  $("#biaoji").html('<input type="text" id="cardCategoryName"/><span id="jianche"></span>');
		  $("#buttom").html('<input type="button" id="addButtom" value="增加"/>');
		  $("#cardCategoryName").val("");
	      $("#cardCategoryName").focus();
	      $("#cardCategoryName").blur(function(){
		  checkCardCategoryName();
		});
	      $("#addButtom").click(addbuttomdo);
		  });
		  
		  
	   $(".daohang li#revise").click(function(){
		  $(this).siblings().removeClass("select");
		  $(this).addClass("select"); 
		  $("#buttom").html('<input type="button" id="reviseButtom" value="修改"/>');
		  $("#biaoji").load("getCardCategoryName.php",function(response,status,xhr){
		if(status=="success")
		{
			$("#reviseButtom").click(revisebuttomdo);
		}
		else
		{
			$(".rightContent").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		} 
		});
		  });
	
	
	});
	
	

$(document).ready(function(){//ajax读取折扣类型
        $("#discountCategory").load("getDiscountCategory.php",function(response,status,xhr){
		if(status=="success")
		{
			
		}
		else
		{
			$(".rightContent").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		} 
		});
		
		
	
	});
	
	
$(document).ready(function(){//ajax读取卡类型
       $(".leftContent").load("getCardCategory.php",function(response,status,xhr){
		if(status=="success")
		{
			changeTr();
			changeTdName();
			
		}
		else
		{
			$(".leftContent").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		} 
		});
		
		
	
	});
	
	
	
$(document).ready(function(){//时间是否受限，禁止定义时间
     $("#timeRestrain option").click(function(){
		 if($(this).val()==1)
		 {   
			 $("#startTime").attr("disabled",false);
			 $("#endTime").attr("disabled",false).parent().removeClass("disabled");
		 }
		 if($(this).val()==0)
		 {
			 $("#startTime").attr("disabled",true).val("");
			 $("#endTime").attr("disabled",true).val("").parent().addClass("disabled");
		 }
		 
		 });
	});
	
	
$(document).ready(function(){//初始化
    $("#timeRestrain option").eq(0).attr("selected",true);
	$("#timeRestrain option:selected").trigger("click");
    $("#cardCategoryName").val("");
	$("#cardCategoryName").focus();
	$("#cardCategoryName").blur(function(){
		checkCardCategoryName();
		});
  
   
});	
$(document).ready(function(){//提交处理
    $("#addButtom").click(addbuttomdo);

   
});
	
	
	
	