var tableID=Array();
var tableName=Array();
var totableID=Array();
var totableName=Array();
var json="";
var receivable;
var income;
var change;
var index=0;
function isset(arr,dishId)
{
   var bol=false;
   for(index=0;index<arr.length;index++)
	{
	  if(arr[index].dishId==dishId)
		{					
		  bol=true;
		  break;
		}
						  
	}
	return bol;
}
function sub_money(){
	$("#sub_money").click(function(){
		receivable=$("#ys_money").val();
		income=$("#ss_money").val();
		change=$("#zl_money").val();
	    var allOrder=Array();
		if($("#zl_money").val()<0||$("#zl_money").val()=='')
		{
			if(confirm("支付的钱不够结余，是否继续！"))
			{
			   //jie	
			}
			else
			{
				return false;
			}
		}
		
			//jie
			/*var order=[{dishId:2,name:"回锅肉",price:18,quan:2,printer:1}];
			var order= JSON.stringify(order);
			var aa=["{\"waiter\":\"li\",\"tableId\":1,\"person\":8,\"tableName\":\"1\",\"timestamp\":\"2012-11-12\",\"order\":"+order+"}"];
			var aa = JSON.stringify(aa); 
			var datas={waiter:"jack",receivable:100,income:200,change:100,tableName:1,orderAll:aa};
            var json = JSON.stringify(datas); 
			 alert(json);*/
			// alert(receivable+" "+income+" "+change);
			
			////////////////
			if($("#checkbox").is(":checked"))
			{
			var order=Array();
			$(".dishInfo table tbody tr").each(function(){
				      var dishId=$(this).children(".m_dishName").attr("value");
				      var name=$(this).children(".m_dishName").html();
				      var price=$(this).children(".m_dishPrice").html();
				      var quan=$(this).children(".m_dishNum").html();
				      var data={'dishId':dishId,'name':name,'price':price,'quan':quan,'printer':1};
					  //alert(-1>test.length);
					  if(isset(order,dishId))
					  {
						 order[index].quan=Number(order[index].quan)+Number(quan); 
					  }
					  else
					  {
						order.push(data);
					  }
				});
				var orderJson=JSON.stringify(order);
				allOrder.push(orderJson);
				var tn=tableName.join();
				totableName.push(tn);;
			}
			else
			{
			$(".dishInfo table").each(function(){
				 var everyTableName=$("caption",this).attr("value");
				 var order=Array();
				 $("tbody tr",this).each(function(){
					  var dishId=$(this).children(".m_dishName").attr("value");
				      var name=$(this).children(".m_dishName").html();
				      var price=$(this).children(".m_dishPrice").html();
				      var quan=$(this).children(".m_dishNum").html();
				      var data={'dishId':dishId,'name':name,'price':price,'quan':quan,'printer':1};
				      order.push(data);  
					 });
				  var orderJson=JSON.stringify(order);
				  allOrder.push(orderJson);	 			
				});
			 totableName=tableName;
			}
			$.post("getSales.php",{tableID:tableID,tableNameArr:totableName,receivable:receivable,income:income,change:change,allOrder:allOrder},function(data){
				var jsonCheckout=data;
				//alert(data);
				$.post("../../orderPad/print.php?action=checkout",{print:jsonCheckout},function(data){
					if(data=='{"succ":"true"}')
					{
						if(confirm("是否现在清台！"))
			               {
							   var timestr;
							   var hre=0;
							   $.ajax({
				                     url:"getTime.php",
				                     async:false,
				                     type:"post",
				                     success:function(data){timestr=data;},
				                     error:function(){alert("获取时间失败！");}				 
				                     }); 
									 //alert(timestr);
							   for(var i=0;i<tableID.length;i++)
							   {
							     var json={"timestamp":timestr,"order":[{"TID":tableID[i]}]};
							     json = JSON.stringify(json);
							    // alert(json); 
			   	                 $.post("../../orderPad/cleanTable.php",{json:json},function(data){ 
								                                                             if(data=='{"succ":true,"error":"unknown"}')
																							 {
																								 hre++;
																								if(hre==tableID.length)
																								{
																								window.location.href="showTable.html";	
																								}
																							 }
																							 else
																							 {
																								 alert("清台错误！");
																							 }
																							 });
							   }
			               }
			           else
			               {
							   window.location.href="showTable.html";
				           //return false;
			               }
					}
					else
					{
						alert("打印票据失败，请重新打印！");
					}
					
					});
				});
		return false;
		});
}


function advance()//加载预付款
{
	var alladvance=0;
	for(var i=0;i<tableID.length;i++)
	{
		var TID=tableID[i];
	$.ajax({
			  type:"get",
			  async:false,
			  url:"../../orderPad/advPayment.php",
			  data:{do:"get",TID:TID},
			  //beforeSend:function(){$(".waiting").show();},
			  //complete:function(){},
			  error:function(){alert("获取预付款信息失败！")},
			  success:function(data,textStatus){
				 // alert(parseFloat(data))
				  alladvance=parseFloat(alladvance)+parseFloat(data);
				  //alert(alladvance);
				  $("#advance_money").val(alladvance);
				  }
	});
	}
	
}
$(document).ready(function(){
	//获取URL参数
	var str=window.location.href;
    var es=/tableID=/;
    es.exec(str);
    tableID=RegExp.rightContext;
	tableID=tableID.split(",");
	//alert(Object.prototype.toString.call(tableID));
	//加载本桌点菜信息
	$(".content").load("getTableDish.php",{ID:tableID},function(response,status,xhr){
		if(status=="success")
		{
		   $(".dishInfo table caption").each(function(){tableName.push($(this).attr("value"))});
           $("#ss_money").keyup(function(){var advance=$("#advance_money").val()?$("#advance_money").val():0;;var mo=parseFloat($(this).val())+parseFloat(advance)-$("#ys_money").val();$("#zl_money").val(mo.toFixed(2));});
		   sub_money();
		   advance();
		}
		else
		{
			jQuery(".showTable").html("<strong>获取数据错误，请重新载入或联系客服！</strong>")
		}
	});
	
	$(".dishInfo table tbody tr").hover(function(){$(this).addClass("changeTr");},function(){$(this).removeClass("changeTr")});
	
	
	});


$(document).ready(function(){
    $(".dazhe").click(function(){
		$(".memberFa").css("display","block");
		$(".memberID input:text").val("").focus();
		});
    
	$("#cancel").click(function(){
		
		$(".memberFa").css("display","none");
		
		});
		
		
    $("#certain").click(function(){
		var cardNo=$(".memberID input:text").val();
		$.post("getMemTableDish.php",{tableID:tableID,cardNo:cardNo,tableName:tableName},function(date){
		if(date=="false")		
		{
			alert("该卡号不存在，请重新输入！");
          
		}
		else
		{
			 $(".memberFa").css("display","none");
			 $(".content").html(date);
			 $("#ss_money").keyup(function(){var advance=$("#advance_money").val()?$("#advance_money").val():0;;var mo=parseFloat($(this).val())+parseFloat(advance)-$("#ys_money").val();$("#zl_money").val(mo.toFixed(2));});
			  sub_money();
			  advance();
			//jQuery(".showTable").html("<strong>获取数据错误，请重新载入或联系客服！</strong>")
		}
	});
	  return false;
	});
	
	
	});