function reserveJson(tabN,tabI,reservationTime,todeposit,toname,totel,toremark,toaddr){
	     var arr=Array();
		 var tableName=tabN;
		 var tableId=parseInt(tabI);
		 var reservation=reservationTime;
		 var deposit=todeposit;
		 var name=toname;
		 var tel=totel;
		 var remark=toremark?toremark:null;
		// alert(typeof remark);
		 var addr=toaddr;
		  if($("#add_dish_content .dish_change").length>0)
		 {
	     $("#add_dish_content .dish_change").each(function(){var obj=Object();obj.price=$(this).attr("dishPrice");obj.dishId=$(this).attr("dishID");obj.quan=$(".dishNum input",this).val();obj.printer=$(this).attr("printer");obj.name=$(".dishName",this).html();arr.push(obj);});
		  $.ajax({
			  type:"post",
			  url:"openJson.php",
			  data:{arr:arr,tableId:tableId,tableName:tableName,reservation:reservation,deposit:deposit,name:name,tel:tel,remark:remark,addr:addr},
			  beforeSend:function(){$(".waiting").show();},
			  complete:function(){},
			  error:function(){alert("提交失败！获取相关信息失败！")},
			  success:function(data,textStatus){
				  //alert(data);
				      var jsonReserve=data;
					  var url="../../orderPad/print.php?action=reservation";
				      $.ajax({
							    type:"post",
								url:url,
								data:{print:jsonReserve},
								error:function(){alert("提交失败！")},
								complete:function(){$(".waiting").hide();},
								success:function(dat,textStatus){
									                             if(dat=='{"succ":"true"}')
																 {
																	
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
			 alert("未设定菜品，不能留单打印！");
		 }
			 

}
		