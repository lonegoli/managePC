var tableID=0;
function sub_money(){
	$("#sub_money").click(function(){
		if($("#zl_money").val()<0)
		{
			if(confirm("支付的钱不够结余，是否继续！"))
			{
			   //jie	
			}
			else{
				//return false;
			}
		}
		else
		{
			//jie
			var order=[{dishId:2,name:"回锅肉",price:18,quan:2,printer:1}];
			var order= JSON.stringify(order);
			var aa=['{waiter:"li",tableId:1,person:8,tableName:"1",timestamp:"2012-11-12",order:order}'];
			var aa = JSON.stringify(aa); 
			var datas={waiter:"jack",receivable:100,income:200,change:100,tableName:1,orderAll:aa};
			//var aa=JSON.stringify(datas);
            var json = JSON.stringify(datas); 
			alert(json);
			$.post("../../orderPad/print.php?action=checkout",{print:json},function(){});
		}
		return false;
		});
}

$(document).ready(function(){
	//获取URL参数
	var str=window.location.href;
    var es=/tableID=/;
    es.exec(str);
    tableID=RegExp.rightContext;

	//alert(tableID);
	//加载本桌点菜信息
	$(".content").load("getTableDish.php",{ID:tableID},function(response,status,xhr){
		if(status=="success")
		{
           $("#ss_money").keyup(function(){var mo=$(this).val()-$("#ys_money").val();$("#zl_money").val(mo);});
		   sub_money();
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
		});
		
		
    $("#submit").click(function(){
		var cardNo=$(".memberID input:text").val();
		$.post("getMemTableDish.php",{tableID:tableID,cardNo:cardNo},function(date){
		if(date=="false")		
		{
			alert("该卡号不存在，请重新输入！");
          
		}
		else
		{
			 $(".memberFa").css("display","none");
			 $(".content").html(date);
			 $("#ss_money").keyup(function(){var mo=$(this).val()-$("#ys_money").val();$("#zl_money").val(mo);});
			  sub_money();
			//jQuery(".showTable").html("<strong>获取数据错误，请重新载入或联系客服！</strong>")
		}
	});
		
		
		
		})
	
	
	});