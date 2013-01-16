var fnum="all";
jQuery(document).ready(function(){
/*鼠标右键插件*/ 
(function($) { 
$.fn.extend({ 
//定义鼠标右键方法，接收一个函数参数 
"rightClick":function(fn){ 
//调用这个方法后将禁止系统的右键菜单 
$(document).bind('contextmenu',function(e){ 
return false; 
}); 
//为这个对象绑定鼠标按下事件 
$(this).mousedown(function(e){ 
//如果按下的是右键，则执行函数 
if(3 == e.which){ 
fn(); 
} 
}); 
} 
}); 

})(jQuery); 
});


function dealLi(e){//将dealTable的事件写在回调函数里是因为该绑定事件必须要在dealTable节点加载进来才能正常绑定
		
		var x=10;
		var y=10;
		var value=$(this).attr("value");
		var str="";
		/*if(value=="open")
		{
			str='<ul values="'+$(this).parent().attr("id")+'"><li id="jiezhang" values="'+$(this).parent().attr("id")+'"><a>结账</a></li><li id="qingtai"><a>清台</a></li></ul>';
		}
		else if(value=="close")
		{
			str='<ul values="'+$(this).parent().attr("id")+'"><li id="kaitai"><a>开台</a></li></ul>'
		}
		else if(value=="close_phone")
		{
			str=
		}
		else if(value=="")
		{
		}
		else if(value=="")
		{
		}*/
		switch(value)
		{
		  case "open":
		             str='<ul values="'+$(this).parent().attr("id")+'" tableName="'+$(this).next().html()+'"><li id="jiezhang" values="'+$(this).parent().attr("id")+'"><a>结账</a></li><li id="more_jiezhang" values="'+$(this).parent().attr("id")+'"><a>多桌结账</a></li><li id="qingtai"><a>清台</a></li><li id="diancai"><a>点菜</a></li><li id="tuicai"><a>退菜</a></li><li id="chacai"><a>查看菜</a></li><li id="yufu"><a>预付</a></li></ul>';
					 break;
		  case "close":
		             str='<ul values="'+$(this).parent().attr("id")+'" tableName="'+$(this).next().html()+'"><li id="kaitai"><a>开台</a></li></ul>';
					 break;
		  case "close_phone":
		             str='<ul values="'+$(this).parent().attr("id")+'" tableName="'+$(this).next().html()+'"><li id="kaitai"><a>开台</a></li><li id="shouji"><a>查看手机点菜</a></li></ul>';
					 break;
		  case "open_phone":
		             str='<ul values="'+$(this).parent().attr("id")+'" tableName="'+$(this).next().html()+'"><li id="jiezhang" values="'+$(this).parent().attr("id")+'"><a>结账</a></li><li id="more_jiezhang" values="'+$(this).parent().attr("id")+'"><a>多桌结账</a></li><li id="qingtai"><a>清台</a></li><li id="shouji"><a>查看手机点菜</a></li><li id="diancai"><a>点菜</a></li><li id="tuicai"><a>退菜</a></li></li><li id="chacai"><a>查看菜</a></li><li id="yufu"><a>预付</a></li></ul>';
					 break;
		  case "close_notific":
		             str='<ul values="'+$(this).parent().attr("id")+'" tableName="'+$(this).next().html()+'"><li id="kaitai"><a>开台</a></li><li id="call"><a>查看手机呼叫</a></li></ul>';
					 break;
		  case "open_notific":
		             str='<ul values="'+$(this).parent().attr("id")+'" tableName="'+$(this).next().html()+'"><li id="jiezhang" values="'+$(this).parent().attr("id")+'"><a>结账</a></li><li id="more_jiezhang" values="'+$(this).parent().attr("id")+'"><a>多桌结账</a></li><li id="qingtai"><a>清台</a></li><li id="call"><a>查看手机呼叫</a></li><li id="diancai"><a>点菜</a></li><li id="tuicai"><a>退菜</a></li></li><li id="chacai"><a>查看菜</a></li><li id="yufu"><a>预付</a></li></ul>';
					 break;
		  case "close_phone_notific":
		             str='<ul values="'+$(this).parent().attr("id")+'" tableName="'+$(this).next().html()+'"><li id="kaitai"><a>开台</a></li><li id="call"><a>查看手机呼叫</a></li><li id="shouji"><a>查看手机点菜</a></li></ul>';
					 break;
		  case "open_phone_notific":
		             str='<ul values="'+$(this).parent().attr("id")+'" tableName="'+$(this).next().html()+'"><li id="jiezhang" values="'+$(this).parent().attr("id")+'"><a>结账</a></li><li id="more_jiezhang" values="'+$(this).parent().attr("id")+'"><a>多桌结账</a></li><li id="qingtai"><a>清台</a></li><li id="call"><a>查看手机呼叫</a></li><li id="shouji"><a>查看手机点菜</a></li><li id="diancai"><a>点菜</a></li><li id="tuicai"><a>退菜</a></li></li><li id="chacai"><a>查看菜</a></li><li id="yufu"><a>预付</a></li></ul>';
					 break;
		  default:str="<ul><li><a>出现错误！</a></li></ul>";
		}
		var showDeal='<div id="showDeal">'+str+'</div>';
		//alert($(this).parent().attr("id"))
		jQuery("#showDeal").remove();
		
		jQuery("body").append(showDeal);
		var top;
		var showDealH=$("#showDeal").height().toFixed(0);
		if(parseFloat(e.pageY)+parseFloat(showDealH)>$(window).height())
			{
				top=e.pageY-showDealH+y;
			}
		else
			{
				top=e.pageY+y;
			}
		jQuery("#showDeal").css({"top":top+"px","left":(e.pageX+x)+"px"}).show("fast");
		jQuery("#jiezhang").click(jiezhang);
		jQuery("#more_jiezhang").click(more_jiezhang);
		jQuery("#qingtai").click(qingtai);
		jQuery("#shouji").click(shouji);
		jQuery("#call").click(call);
		jQuery("#kaitai").click(kaitai);
		jQuery("#diancai").click(diancai);
		jQuery("#tuicai").click(tuicai);
		jQuery("#chacai").click(chacai);
		jQuery("#yufu").click(yufu);
	      return false;
		};
function yufu(e){
	var tableID=$(this).parent().attr("values");
	$(".yufu").data("TID",tableID);
	$("#advanceTable").html($(this).parent().attr("tableName"));
	$("#advance").val("0");
	$(".yufu").fadeIn();
	     
}
function jiezhang(e){
	     var tableIDArr=Array(); 
	     var tableID=$(this).attr("values");
		 //alert(tableID);
		 tableIDArr.push(tableID);
		 window.location.href="showTableDish.html?tableID="+tableIDArr;
	    
        };
function more_jiezhang(e){
	     var tableID=$(this).attr("values");
		 var tableName=$(this).parent("ul").attr("tableName");
		 var html="<div class='MC_table' tableID='"+tableID+"'>"+tableName+"<img src='images/untitled2.png' height='20' width='20'></div>"
		 $(".MC_table").each(function(){if($(this).attr("tableID")==tableID){html="";}});
	     $(".moreCheck").slideDown();
		 $(".MC_brown").append(html);
		 $(".MC_table img:last").click(function(){$(this).parent(".MC_table").remove();if($(".MC_table ").length==0){$(".moreCheck").hide();}});
        };
		
function qingtai(e){
	      var timestr;
	     if(confirm("如果未结账，清台后将丢失信息，是否清台！"))
		   {
			 /*var now= new Date();
             var year=now.getFullYear();
             var month=now.getMonth()+1;
             var day=now.getDate();
             var hour=now.getHours();
             var minute=now.getMinutes();
             var second=now.getSeconds();
			 var timestr=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second; 
			 */
			 $.ajax({
				 url:"getTime.php",
				 async:false,
				 type:"post",
				 success:function(data){timestr=data;},
				 error:function(){alert("获取时间失败！");}
				 
				 });
				 //alert(timestr);
			 var tableID=$(this).parent().attr("values");
			 var json={"timestamp":timestr,"order":[{"TID":tableID}]};
			 json = JSON.stringify(json);
			 $.post("../../orderPad/cleanTable.php",{json:json},function(date){if(date=='{"succ":true,"error":"unknown"}'){var obj=".tableContent #"+tableID+" .dealTable";$(obj).removeClass("tableBlue tableRed");}});
		  }
	    else
		  {
			 return false;
		  }
		return true;
       };
	   
function shouji(e){
	    $.post("getPhoneOrder.php",{tableID:$(this).parent().attr("values")},function(date){
			var arr=eval('('+date+')');
			var str="";
			for(var i=0;i<arr.length;i++)
			{
				str=str+"<tr><td>"+arr[i]['dishName']+"</td><td>"+arr[i]['dishNum']+"</td></tr>";
			}
			str="<table>"+str+"</table>";
			$("#phone_info_content").html(str).parent().show();
			});
	    
        };
		
function kaitai(e){
	    $("#hideen").html("close");
		$("#hideen1").html($(this).parent().attr("values"));
		$("#advanceMoney").val("0");
	    $("#addDish").fadeIn();
		$("#tableName").html($(this).parent().attr("tableName"));
	    
        };
function diancai(e){
	    $("#hideen").html("open");
		$("#hideen1").html($(this).parent().attr("values"));
		$("#advanceMoney").val("0");
	    $("#addDish").fadeIn();
	    $("#tableName").html($(this).parent().attr("tableName"));
        };

function tuicaiAja(tableID)
{
	    $.ajax({
			  type:"post",
			  url:"getHasDish.php",
			  data:{ID:tableID},
			  //beforeSend:function(){$(".waiting").show();},
			  //complete:function(){},
			  error:function(){$(".WR_box_contentL").html("获取信息失败！")},
			  success:function(data,textStatus){			  
				                                if(data.indexOf("<tr")<0)
												{
													$(".WR_box_contentL").html("<br/><br/><br/>该桌还未点菜！");
													return false;
												}
												$(".WR_box_contentL").html(data);
			                                    tuiJson();
												tui_allPrice();
			                                    $(".WR_box_contentL .WR_dishInfo tbody tr").hover(function(){
													$(this).css({"background-color":"#FFF"});												
													},
													function(){$(this).css({"background-color":"#CCC"});
													})}
		});
}
		
function tuicai(e){
	    $(".WR_box").removeClass("WR_showTdish");
	    $("#WR_delSubmit").html("退订");
	    $(".WR_box").fadeIn();
	    var tableID=$(this).parent().attr("values");
		var tableName=$(this).parent().attr("tableName");
		if(tableName=="")
		{
			$(".WR_box_contentL").html("获取桌号失败，请重新载入！");
			return false;
		}
		$(".WR_tableName").html(tableName).attr({"tableID":tableID,"tableName":tableName});
	    tuicaiAja(tableID);
        }

function chacai(e){
	    $(".WR_box").addClass("WR_showTdish");
	    $("#WR_delSubmit").html("");
	    $(".WR_box").fadeIn();
	    var tableID=$(this).parent().attr("values");
		var tableName=$(this).parent().attr("tableName");
		if(tableName=="")
		{
			$(".WR_box_contentL").html("获取桌号失败，请重新载入！");
			return false;
		}
		$(".WR_tableName").html(tableName);
	    tuicaiAja(tableID);	
}
		
function call(e){
	    var tableName=$(this).parent().attr("tableName");
		var tableID=$(this).parent().attr("values");
	    $.post("getPhoneCall.php",{tableID:tableID},function(date){
			var arr=eval('('+date+')');
			if(confirm("桌号："+tableName+"\n"+arr))
			{
				$.get("../../orderPad/cleanNotification.php",{TID:tableID},function(date){if(date=='{"succ":true,"error":"unknown"}'){var obj=".tableContent #"+tableID+" .dealTable";$(obj).removeClass("Notific");}})
			}
			}); 
			return true;
	    
        };
		

function allPrice(){
	     var money=0;
		 var num=0;
		 $("#add_dish_content .dish_change .dish_all_money").each(function(){money=money+parseFloat($(this).html());num++;});
		 $(".show_all_money").html(money.toFixed(2)+"("+num+")");
}

function tui_allPrice(){
	      var apri=0; 
		  var dnum=0;
	      $(".WR_dishInfo table tr:not(.nohas)").each(function(){
			  var num=$(".WR_dishNum",this).html();
			  var price=$(this).attr("price");
			  apri=apri+num*price; 
			  ++dnum; 
			  });
		  $("#WR_all_money").html(apri.toFixed(2));
		  $("#WR_dishNum").html(dnum);
}

function toJson(){
	     var arr=Array();
		 var tableName=$("#tableName").html();
		 var tableId=parseInt($("#hideen1").html());
		 var check=$("#hideen").html();
		 var timeType=$("#timeType").html();
		 var advPayment=$("#advanceMoney").val()?$("#advanceMoney").val():0;
		  if($("#add_dish_content .dish_change").length>0)
		 {
	     $("#add_dish_content .dish_change").each(function(){var obj=Object();obj.price=$(this).attr("dishPrice");obj.dishId=$(this).attr("dishID");obj.quan=$(".dishNum input",this).val();obj.printer=$(this).attr("printer");obj.name=$(".dishName",this).html();if($(".flavor_ok",$(this)).html()!=""){obj.flavor=$(".flavor_ok",$(this)).html()};arr.push(obj);});
		  $.ajax({
			  type:"post",
			  url:"openJson.php",
			  data:{arr:arr,tableId:tableId,tableName:tableName,timeType:timeType,advPayment:advPayment},
			  beforeSend:function(){$(".waiting").show();},
			  complete:function(){},
			  error:function(){alert("提交失败！获取相关信息失败！")},
			  success:function(data,textStatus){
				  //alert(data);
				      var md5=hex_md5(data);
				      if(check=="open")
					  { 
						  var url="";
						  url='../../orderPad/submitOrder.php?MD5='+md5+'&action="open"';
					  }
					  else if(check=="close")
					  {
						  url="../../orderPad/submitOrder.php?MD5="+md5;
					  }
					  else
					  {
						  alert("提交失败！未正确获取桌位信息！");
						  return false;
					  }
				      $.ajax({
							    type:"post",
								url:url,
								data:{json:data},
								error:function(){alert("提交失败！")},
								complete:function(){$(".waiting").hide();},
								success:function(dat,textStatus){
									                             if(dat=='{"succ":true,"error":"unknown"}')
																 {
																	 $("#dish_close").click();
																	$(".tableContent #"+tableId+" .dealTable").addClass("tableRed");
																 }
																 else
																 {
																	
																	 alert("提交失败！返回错误！");
																 }
															    }
							  });
				 
				  }
			  });
		 }
			 

}
	
function tuiJson(){
	jQuery(document).ready(function(){//退菜按钮
	   $(".WR_delete").click(function(){
           //alert("llll");
		   var $qobj=$(this).parent();
		   var $dobj=$(".WR_delquan",$qobj);
		   if($(this).is("[value*='斤']")&&parseInt($(".WR_dishNum",$qobj).html())>0)
		   {   var jquan=$(".WR_dishNum",$qobj).html();
			   $dobj.html(jquan);
			   $(".WR_dishNum",$qobj).html("0");
			   $qobj.attr({"class":"nohas"});
		   }
		   else
		   {
			   var num=Number($(".WR_dishNum",$qobj).html());
			   if(num<=0)
			   {
				   return false;
			   }
			   
			   var deleNum=num<1?num:1;
			   var quan= Number($(".WR_dishNum",$qobj).html())-deleNum;
			   if(quan<=0)
			   {
				   quan=0;
				   $qobj.attr({"class":"nohas"});
			   }
			   $(".WR_dishNum",$qobj).html(quan);
			   quan=$dobj.html()?Number($dobj.html())+deleNum:deleNum;
			   quan=Number(quan);
			   $dobj.html(quan);   
		   }
		   tui_allPrice();
		  
		   });
});
}



jQuery(document).ready(function(){//预付关闭
       $("img.yufu_close").click(function(){$(".yufu").fadeOut();$("#advance").val("0")});
});

jQuery(document).ready(function(){//预付提交
       $("#advanceGo").click(function(){
		   var paymentMoney=$("#advance").val();
		   var TID=$(".yufu").data("TID");
		   $.ajax({
			  type:"get",
			  url:"../../orderPad/advPayment.php",
			  //async:false,
			  data:{do:"set",TID:TID,payment:paymentMoney},
			  //beforeSend:function(){$(".waiting").show();},
			 // complete:function(){$(".waiting").hide();},
			  error:function(){alert("预付失败！")},
			  success:function(data,textStatus){
				  if(data==paymentMoney)
				  {
					  alert("预付成功！");
					  $("img.yufu_close").click();
				  }
				  }
		      })
		   
		   });
});

jQuery(document).ready(function(){//多桌结账
	   $("#MC_submit").click(function(){
		   var tableIDArr=Array();
           $(".MC_brown .MC_table").each(function(){
			                             var tableID=$(this).attr("tableID")
			                             tableIDArr.push(tableID);
			                             });
		    window.location.href="showTableDish.html?tableID="+tableIDArr;
		   });
});


jQuery(document).ready(function(){//关闭退菜
	   $("#WR_close").click(function(){
           $(".WR_box").fadeOut();
		   });
});

jQuery(document).ready(function(){//刷新退菜
	   $("#WR_ref").click(function(){
		   var tableID=$(".WR_tableName").attr("tableID");
           tuicaiAja(tableID);
		   });
});

jQuery(document).ready(function(){//提交退菜
	   $("#WR_delSubmit").click(function(){
           //alert("kk");
		   var $obj=$(".WR_dishInfo table tr:has(.WR_delquan:parent)");
		   var arr=Array();
		   $obj.each(function(){
			   //ar dishName=$(".WR_dishName",$(this)).html();
			   //arr.push(dishName);
			   var dishName=$(this).attr("name");
			   var price=$(this).attr("price");
			   var printer=$(this).attr("printer");
			   var dishId=$(this).attr("dishID");
			   var quan=$(this).children(".WR_delquan").html();
			   var orderObj=new Object();
			   orderObj['name']=dishName;
			   orderObj['price']=price;
			   orderObj['dishId']=dishId;
			   orderObj['quan']=quan;
			   orderObj['printer']=printer;
			   orderObj['unit']=false;
			   //alert(orderObj);
			   arr.push(orderObj);
			   
			   });
			   var tableId=$(".WR_tableName").attr("tableID");
			   var tableName=$(".WR_tableName").attr("tableName");
			   $.ajax({
			  type:"post",
			  url:"getWaiterInfo.php",
			  data:{tableName:tableName,tableId:tableId,order:arr},
			  //beforeSend:function(){$(".waiting").show();},
			  //complete:function(){},
			  error:function(){alert("获取相关信息失败！")},
			  success:function(data,textStatus){
				  //alert(data);
				                               $.ajax({
												   type:"post",
												   url:"../../orderPad/DelOrder.php?TYPE=1",
												   data:{json:data},
												   error:function(){},
												   success:function(ndata,textStatus){
													                                  if(ndata=='{"succ":true,"error":"unknown"}')
																					  {
																						  var tableID=$(".WR_tableName").attr("tableID");
                                                                                          tuicaiAja(tableID);
																						  $(".WR_box").fadeOut();
																						  alert("退订成功！");
																					  }
																					  else
																					  {
																						  alert("退订失败！");
																					  }
													   
													                                  }
												   
												   });
				  
				  }
			   });
				                                 
		   
		   });
});

		
jQuery(document).ready(function(){
	   $("#phone_info_header span").click(function(){
		   $("#phone_info").hide();
		   });
});

jQuery(document).ready(function(){//过滤
	  $("#s").keyup(function(){$("#dish_show tbody tr.dish_list").hide().filter(":contains('"+( $(this).val() )+"')").show();}); 
});

function count(){//文本价格输入计算总价
	  $("#add_dish_content .dish_change .dishNum input").keyup(function(){
		  var $obj=$(this).parent().parent();
		  var mo=$obj.attr("dishPrice")*$(this).val();
		  $obj.children(".dish_all_money").html(mo.toFixed(2));
		  allPrice();
		  }); 
}

jQuery(document).ready(function(){//点菜提交
      $("#add_submit").click(function(){
		  toJson();
		  });

});



jQuery(document).ready(function(){//双击取消菜、单击口味
   $("#add_dish_content").delegate(".dish_change","dblclick",function(){$(this).remove();allPrice();});
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

jQuery(document).ready(function(){//口味取消按钮
    $("#flavor_qx").click(function(){$("#showFlavor").hide();});
});

jQuery(document).ready(function(){//口味确定按钮
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

jQuery(document).ready(function(){//即单、叫单
    $("#timeType").toggle(function(){$(this).html("叫单")},function(){$(this).html("即单")});
});


jQuery(document).ready(function(){//点菜下拉条
       $("#dish_close").click(function(){$("#addDish").fadeOut();$("#showFlavor").hide();$("#add_dish_content").html("");$(".show_all_money").html("");})//关闭
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
					 count();
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

jQuery(document).ready(function(){
	//加载楼层
	jQuery(".navlist").load("getFloorInfo.php",function(response,status,xhr){
		if(status=="success")
		{

		}
		else
		{
			jQuery(".showTable").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		}
		
		
		jQuery(".navlist li a").click(function(){//给楼层添加点击事件
			fnum=$(this).attr("id");
			jQuery(".tableContent").load("getTableInfo.php",{flo:fnum},function(response,status,xhr){
		if(status=="success")
		{
			

		}
		else
		{
			jQuery(".showTable").html("<strong>获取数据错误，请重新载入或联系客服！</strong>")
		}
			jQuery(".dealTable").click(dealLi);//给桌子添加点击事件
			});
		jQuery(".navlist li a").removeClass("active");
		jQuery(this).addClass("active");
			});
			
		
	});
	
	
	//加载桌子信息
	jQuery(".tableContent").load("getTableInfo.php",{flo:fnum},function(response,status,xhr){
		if(status=="success")
		{

		}
		else
		{
			jQuery(".showTable").html("<strong>获取数据错误，请重新载入或联系客服！</strong>")
		}
		
		jQuery(".dealTable").click(dealLi);
		//jQuery(".dealTable").mouseout(function(){jQuery("#showDeal").remove();return false;})
		jQuery("body").click(function(event){jQuery("#showDeal").remove();event.stopPropagation();});
		return false;
		})
		
	
	});
	
	
	
	jQuery(document).ready(function(){	
	    function dealMore(){
			              jQuery(".tableContent").load("getTableInfo.php",{flo:fnum},function(response,status,xhr){
		                  if(status=="success")
		                     {

		                     }
		                  else
		                    {
			                  jQuery(".showTable").html("<strong>获取数据错误，请重新载入或联系客服！</strong>")
		                    }
							 jQuery(".dealTable").click(dealLi);
			
			              });
			
		                 }
		setInterval(dealMore,10000);
		
		
	});


jQuery(document).ready(function(){//设置AJAX等待函数
	  //$(".waiting").ajaxStart(function(){$(this).show();});
	  //$(".waiting").ajaxStop(function(){$(this).hide();});
	
	});