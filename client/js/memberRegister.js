function checCardNumber(){
	var cardNo=$("#cardNumber input:text").val();
	$.ajax({ 
          async:false, 
          type:"POST", 
          url:"check.php", 
          data:{check:"cardNo",cardNo:cardNo}, 
          success : function(data) { 
          $("#jianche").html(data); 
          } 
          }); 

	
	
	
	
	
	
	
	
	
	/*$("#jianche").load("check.php",{check:"cardNo",cardNo:cardNo},function(response,status,xhr){
		if(status=="success")
		{
		     
		}
		else
		{
			$("#jianche").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		}
		});*/
			
	
}


$(document).ready(function(){

$("form input.required").each(function(){
			var $required = $("<strong class='high'> *</strong>"); //创建元素
			$(this).parent().append($required); //然后将它追加到文档中
		});
});


$(document).ready(function(){//读取会员卡类型
   $("#biaoji").load("getCardCategoryName.php",function(response,status,xhr){
		if(status=="success")
		{
			$("#biaoji select").click(function(){
               feeChargingCardYN=parseInt($("option:selected",this).attr("feeChargingCardYN"));
				 if(feeChargingCardYN==1)
				 {
					 $("#setting").show();
				 }
				 if(feeChargingCardYN==0)
				 {
					 $("#setting").hide();
				 }
				 //alert(feeChargingCardYN);
									});
			$('#biaoji option').eq(0).attr("selected",true);
			$("#biaoji select").click();
			
		}
		else
		{
			$(".leftContent").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		} 
		});
});

$(document).ready(function(){//提交事件
       $("#submit").click(function(){
		   $(".onError").remove();
		   var cardNumber=$("#cardNumber input:text").val();
		   if(cardNumber=="")
		   {
			   alert("会员卡号不能为空");
			   return false;
		   }
		   if(cardNumber.length>10)
		   {
			   alert("会员卡号不能超过10位");
			   return false;
		   }
		   $("#cardNumber input:text").trigger('blur');
		   //alert(feeChargingCardYN);
		   if(feeChargingCardYN!=0)
		   {
			  //alert("jj");
		   $("#firstPassword input:password").trigger('blur');
		   $("#againPassword input:password").trigger('blur');
		   }
		   var numError=$('.onError').length;
	        if(numError)
	        {
				alert("填写不正确，请检查")
		      return false;
	         }
		   var cardCategory=$("#cardCategory select option:selected").val();
		   var cardCategoryName=$("#cardCategory select option:selected").html();
		   var memberName=$("#memberName input:text").val();
		   var memGender=$("#memGender select option:selected").val();
		   var memberPhone=$("#memberPhone input:text").val();
		   var credentialsNum=$("#credentialsNum input:text").val();
		   var memberBirthday=$("#memberBirthday input:text").val();
		   var memberAddress=$("#memberAddress input:text").val();
		   var income=$("#income input:text").val();
		   var startTime=$("#calendar1").val();
		   var endTime=$("#calendar2").val();
		   var person=$("#person").val();
		   var personMoney=$("#personMoney").val();
		   var remark=$("#remark textarea").val();
		   var cardStatue=$("#status select option:selected").val();
		   var zhengsong=$("#zhengsong input:text").val();
		   var firstChongzhi=$("#firstChongzhi input:text").val();
		   var touzhi=$("#touzhi input:text").val();
		   var firstPassword=$("#firstPassword input:password").val();
		   var againPassword=$("#againPassword input:password").val();
		   
		   //alert(cardNumber+" "+cardCategory+" "+memberName+" "+memberPhone+" "+credentialsNum+" "+memberBirthday+" "+memberAddress+" "+startTime+" "+endTime+" "+person+" "+personMoney+" "+remark+" "+cardStatue+" "+zhengsong+" "+firstChongzhi+" "+touzhi+" "+firstPassword+" "+againPassword);
		   $(".addInfo").load("memberInfo.php",{cardNumber:cardNumber,cardCategory:cardCategory,cardCategoryName:cardCategoryName,memberName:memberName,memGender:memGender,memberPhone:memberPhone,credentialsNum:credentialsNum,memberBirthday:memberBirthday,memberAddress:memberAddress,income:income,startTime:startTime,endTime:endTime,person:person,personMoney:personMoney,remark:remark,cardStatue:cardStatue,zhengsong:zhengsong,firstChongzhi:firstChongzhi,touzhi:touzhi,firstPassword:firstPassword,againPassword:againPassword},function(response,status,xhr){
		      if(status=="success")
		      {
			     alert("操作成功！");
		      }
		      else
		      {
			  $(".rightContent").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		      } 
		      });
		   });



});




$(document).ready(function(){
    $("#reset").click(function(){
		$("#box1Reset").trigger("click");
		
		});
	$("#reset").trigger("click");//避免刷新时原始数据未清除

});

$(document).ready(function(){//初始化
      $("#cardNumber input:text").val("").focus();
	 
   

});

$(document).ready(function(){//检测输入是否符合要求
    $("#cardNumber input:text").blur(function(){
		checCardNumber();
		
		});
		
		
    $("#firstPassword input:password").blur(function(){//第一次密码检查
	if($("#firstPassword input:password").val().length!=6)
	{
		$("#passwordCheck1").html("<span class='onError'>密码只能为6位</span>");
	}
	else{
		$("#passwordCheck1").html("");
	}
	});
	
	
	
	$("#againPassword input:password").blur(function(){//第二次密码检查
	if($("#againPassword input:password").val()!=$("#firstPassword input:password").val())
	{
		$("#passwordCheck2").html("<span class='onError'>两次密码不一致</span>");
	}
	else{
		$("#passwordCheck2").html("");
	}
	});
	
	
	
});




$(document).ready(function(){//查询按钮
    $("#buttom_cx").click(function(){
	$(".memberTable").load("getMemberInfo.php",function(response,status,xhr){
		      if(status=="success")
		      {
			     //alert("操作成功！");
				 $(".memberTable table tr:odd").addClass("odd");  /* 奇数行添加样式*/
		         $(".memberTable table tr:even").addClass("even"); /* 偶数行添加样式*/

				 trClick();
		      }
		      else
		      {
			  $(".memberTable").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		      } });
			  });
	
	
});

$(document).ready(function(){//全选按钮
    $("#buttom_qx").click(function(){
		$(".memberTable table tr").has("input:checkbox:not(:checked)").trigger("click");
		
		});
	
	
});

$(document).ready(function(){//全不选按钮
    $("#buttom_qbx").click(function(){
		$(".memberTable table tr").has("input:checkbox:checked").trigger("click");
		
		});
	
	
});


$(document).ready(function(){//反选按钮
    $("#buttom_fx").click(function(){
		$(".memberTable table tr").trigger("click");
		
		});
	
	
});

$(document).ready(function(){//删除按钮
    $("#buttom_sc").click(function(){
		var arr=new Array();
	   $(".memberTable table tr:visible").has("input:checkbox:checked").each(function(){$(this).remove();arr.push($(this).attr("value"));});
	  $.ajax({
		   type:"post",
		   url:"deleteMemberCard.php",
		   data:{arr:arr},
		   success:function(data,textStatus){},
		   error:function(){}
		   });
		
		});
	
	
});

$(document).ready(function(){//筛选按钮
    $(".search input:text").keyup(function(){$(".memberTable tbody tr").hide().filter(":contains('"+( $(this).val() )+"')").show();});
    $("#buttom_sx").toggle(function(){
		$(".search").slideDown();
		$(".search input:text").keyup();
		},function(){$(".search").slideUp();$(".memberTable tbody tr").show()});
});


function  trClick(){//会员信息列表点击事件

 $(".memberTable table tr input:checkbox").click(function(Event){
	 var hasSelected=$(this).closest('tr').hasClass('selected');
	 $(this).closest('tr')[hasSelected?"removeClass":"addClass"]('selected').find(':checkbox').attr('checked',!hasSelected);
	 //Event.preventDefault();
	 Event.stopPropagation();
		
		});

$(".memberTable table tr").click(function(){
	
		var hasSelected=$(this).hasClass('selected');
			//如果选中，则移出selected类，否则就加上selected类
			$(this)[hasSelected?"removeClass":"addClass"]('selected').find(':checkbox').attr('checked',!hasSelected);
				return false;//取消checkbox的默认行为
		});
		$('.memberTable table tbody>tr:has(:checked)').addClass('selected');
	
}





