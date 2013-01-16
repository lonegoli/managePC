var reservationJsonTemp=null;
function allPrice(){
	     var money=0;
		 var num=0;
		 $("#add_dish_content .dish_change .dish_all_money").each(function(){money=money+parseFloat($(this).html());num++;});
		 $(".show_all_money").html(money.toFixed(2)+"("+num+")");
}

function toJson(){
	     var arr=Array();
		 var tableName=$("#tableName").html();
		 var tableId=parseInt($("#hideen1").html());
		 var timeType=$("#timeType").html();
		 if($("#add_dish_content .dish_change").length>0)
		 {
	     $("#add_dish_content .dish_change").each(function(){var obj=Object();var dishN=$(".dishNum input",this).val();if(dishN==""||dishN==null||dishN==0||dishN=="0"){}else{obj.quan=dishN;obj.price=$(this).attr("dishPrice");obj.dishId=$(this).attr("dishID");obj.printer=$(this).attr("printer");obj.name=$(".dishName",this).html();if($(".flavor_ok",$(this)).html()!=""){obj.flavor=$(".flavor_ok",$(this)).html()};arr.push(obj);}});
		  $.ajax({
			  type:"post",
			  url:"openJson.php",
			  async:false,
			  data:{arr:arr,tableId:tableId,tableName:tableName,timeType:timeType},
			  beforeSend:function(){$(".waiting").show();},
			  complete:function(){$(".waiting").hide();},
			  error:function(){alert("预定菜品失败！获取相关信息失败！")},
			  success:function(data,textStatus){
				  //alert("ajax");
				  reservationJsonTemp=data;
				  $("#addDish").fadeOut(); 
				   
				  }
			  });
		 }
		 else
		 {
			 reservationJsonTemp=null;
			 $("#addDish").fadeOut();
		 }
			 

}

$(document).ready(function(){//过滤
	  $("#s").keyup(function(){$("#dish_show tbody tr.dish_list").hide().filter(":contains('"+( $(this).val() )+"')").show();}); 
});

$(document).ready(function(){//文本价格输入计算总价
	  $("#add_dish_content").delegate(".dishNum input","keyup",function(){
		  //alert("jjj");
		  var $obj=$(this).parent().parent();
		  var mo=$obj.attr("dishPrice")*$(this).val();
		  $obj.children(".dish_all_money").html(mo.toFixed(2));
		  allPrice();
		  return false;
		  }); 
});

$(document).ready(function(){//点菜提交
      $("#add_submit").click(function(){
		  toJson();
		  });

});

$(document).ready(function(){//双击取消菜、单击口味
   $("#add_dish_content").delegate(".dish_change .dishName","dblclick",function(){$(this).parent(".dish_change").remove();allPrice();});
   $("#add_dish_content").delegate(" .dish_change .flavor","click",function(e){
	       // var showFlavor="<div id='showFlavor' style='height:120px;width:80px;background-color:#FFF;overflow:hidden;position:absolute;'></div>"
	        //$("body").append(showFlavor);
			var f=$(this).parent().attr("dishID");
			var x=0;
			var y=0;
			var top;
			if(e.pageY+240>$(window).height())
			{
				top=e.pageY-240+y;
			}
			else
			{
				top=e.pageY+y;
			}
            $("#showFlavor").css({"top":top+"px","left":(e.pageX+x)+"px","height":0,"width":0}).show().animate({height:"240px",width:"160px"});
			$.ajax({
			  type:"post",
			  url:"../../orderPad/getFlavor.php",
			  //beforeSend:function(){$(".waiting").show();},
			  //complete:function(){},
			  error:function(){alert("获取相关信息失败！")},
			  success:function(data,textStatus){
				                                 var flavorArr=eval('('+ data +')');
												 var str="";
												 for(var i=0;i<flavorArr.length;i++)
												 {
													 str=str+"<input type='checkbox' name='flavor"+i+"' value='"+flavorArr[i]+"'>"+flavorArr[i]+"<br/>";
												 }
												 str="<form id='formFlavor' name='formFlavor' dishID='"+f+"'>"+str+"</form>";
												 $(".sf_content").html(str);
				  
				                               }
			});
			return false;
			});
});

$(document).ready(function(){//口味取消按钮
    $("#flavor_qx").click(function(){$("#showFlavor").hide();});
});

$(document).ready(function(){//口味确定按钮
    $("#flavor_qd").click(function(){
		                            //alert($("#formFlavor input:checkbox:checked").length);
									 var dishID=$("#formFlavor").attr("dishID"); 
									 var ss=".dish_change."+dishID;
									 var $obj=$(ss);
									 var strF="";
									 $("#formFlavor input:checkbox:checked").each(function(){strF=strF+$(this).attr("value")+",";});
									 $(".flavor_ok",$obj).html(strF);
									 $("#showFlavor").hide();
									});
});


$(document).ready(function(){//即单、叫单
    $("#timeType").toggle(function(){$(this).html("即单")},function(){$(this).html("叫单")});
});

$(document).ready(function(){//点菜下拉条
       $("#dish_close").click(function(){/*$("#addDish").fadeOut()*/;$("#add_dish_content").html("");$(".show_all_money").html("");})//关闭
       $(".one_li").toggle(function(){$(".one_li ul").slideDown();return false;},function(){$(".one_li ul").slideUp();return false;});
	   $(".one_li ul").load("getDishCategory.php",function(response,status,xhr){
		   if(status=="success")
		   {
               $(".one_li ul li a").click(function(){
				   var categoryID=$(this).attr("value");
				   $("#dish_show tbody").load("getDish.php",{categoryID:categoryID},function(response,status,xhr){
					      if(status=="success")
		                   {
                              $("#dish_show tbody tr").hover(function(){$(this).css({"background-color":"#FFF"});},function(){$(this).css({"background-color":"#CCC"});}).dblclick(function(){
					 var $trObj="."+$(this).attr("value");
					 if($("#add_dish_content .dish_change").is($trObj))
					 {
						 
						 var str="#add_dish_content .dish_change."+$(this).attr("value")+" .dishNum input";
						 var num=parseFloat($(str).val())+1;
						 var str1="#add_dish_content .dish_change."+$(this).attr("value");
						 var price=parseFloat($(str1).attr("dishPrice"))*num;
						 $(str).val(num);
						 var str2="#add_dish_content .dish_change."+$(this).attr("value")+" .dish_all_money";
						 $(str2).html(price.toFixed(2));
					 }
					 else
					 {
					 var $obj="<div class='dish_change "+$(this).attr('value')+"' dishID='"+$(this).attr('value')+"' dishPrice='"+$(this).attr('price')+"' printer='"+$(this).attr('printer')+"'><span class='dishName'>"+$(this).attr('dishName')+"</span><span class='dishNum'><input type='text' value='1'/></span><span class='dish_all_money'>"+$(this).attr('price')+"</span><span class='dishUnit'>"+$('.dishUnit_three',this).html()+"</span><span class='flavor'><div class='sanjiao'></div></span><span class='flavor_ok'></span></div>";
					 $("#add_dish_content").append($obj);$("#add_dish_content .dish_change:last").animate({"margin-left":"0px"});
					 $("#ok_dish").scrollTop(1000);
					 //count();
					 }
					 allPrice();
					 });
		                   }
		                  else
		                   {
			                   jQuery("#addDish_left_show").html("<strong>获取数据错误，请重新载入或联系客服！</strong>")
		                   }
					   
					   });
				   });
		   }
		   else
		   {
			jQuery(".addDish_left_show").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		   }
		   
		   
		   
		   });

});