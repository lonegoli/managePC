function reservationOpen(tabN,tabI,reservationTime,todeposit,toname,totel,timeType,toremark,toaddr,multi){
	     var arr=Array();
		 var tableName=tabN;
		 var tableId=tabI;
		 var reservation=reservationTime;
		 var deposit=todeposit;
		 var name=toname;
		 var tel=totel;
		 var remark=toremark?toremark:null;
		 var addr=toaddr;
		  if($("#add_dish_content .dish_change").length>0)
		 {
	     $("#add_dish_content .dish_change").each(function(){var obj=Object();obj.price=$(this).attr("dishPrice");obj.dishId=$(this).attr("dishID");obj.quan=$(".dishNum input",this).val();obj.printer=$(this).attr("printer");obj.name=$(".dishName",this).html();if($(".flavor_ok",$(this)).html()!=""){obj.flavor=$(".flavor_ok",$(this)).html()};arr.push(obj);});
		  $.ajax({
			  type:"post",
			  url:"openJson.php",
			  data:{arr:arr,tableId:tableId,tableName:tableName,reservation:reservation,multi:multi,deposit:deposit,name:name,tel:tel,timeType:timeType,remark:remark,addr:addr},
			  beforeSend:function(){$(".waiting").show();},
			  complete:function(){},
			  error:function(){alert("提交失败！获取相关信息失败！")},
			  success:function(data,textStatus){
				 // alert(data);
				      var md5=hex_md5(data);
					  var url="../../orderPad/submitOrder.php?MD5="+md5;
				      $.ajax({
							    type:"post",
								url:url,
								data:{json:data},
								error:function(){alert("提交失败！")},
								complete:function(){},
								success:function(dat,textStatus){
									                             if(dat=='{"succ":true,"error":"unknown"}')
																 {
																	$(".waiting").hide();
																 }
																 else
																 {
																	
																	 alert("提交失败！，返回错误！");
																 }
															    }
							  });
				 
				  }
			  });
		 }
		 else
		 {
			 alert("未设定菜品，不能开台！");
		 }
			 

}
		