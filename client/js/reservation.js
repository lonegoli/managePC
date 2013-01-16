arr1=new Array();//全局变量，保存修改时，某个预定已预定了的tableID
String.prototype.isTime = function() //判断时间格式函数
{ 
var r = this.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2})/); 
if(r==null)return false; var d = new Date(r[1], r[3]-1,r[4],r[5],r[6]); 
return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]); 
} 


function getTableName(){//读取桌子信息
    var reservationDate=$("#reservationTime").val()?$("#reservationTime").val():null
    $("#select1").load("getTableName.php",{reservationDate:reservationDate},function(response,status,xhr){
		if(status=="success")
		{
	
		}
		else
		{
			$("#select1").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		} 
		});
}

var getTableNameAndTo=function(reservationDate){//修改时读取桌子信息
    $("#select1").load("getTableName.php",{reservationDate:reservationDate},function(response,status,xhr){
		if(status=="success")
		{
		 var arrLen=arr1.length;
		 $("#select2").html("");
		 for(var i=0;i<arrLen;i++)
		 {
			 var obj="#select1 option[value='"+arr1[i]+"']";
			 //alert($(obj).attr("value"));
			$(obj).appendTo('#select2');
		 }
		}
		else
		{
			$("#select1").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		} 
		});
}


function mouseoverTR(){
	$(".showReservationInfo table tbody tr").hover(function(){$(this).addClass("changeTr");},function(){$(this).removeClass("changeTr");});
	$(".showReservationInfo table tbody tr").click(function(){
		var reservationID=$(this).attr("value");
		$("#add_dish_content").html("");
		$(".show_all_money").html("");
		$.getJSON('getCoustomerReservationInfo.php',{reservationID:reservationID},function(data) {
             ////////////////////
			 //alert(data.tableIDArr.length);
			 //alert(typeof data);
		 arr1=data.tableIDArr;
		 $("#hidden").val(data.reservationID);
		 $("#customerName").val(data.customerName);
		 $("#phoneNum").val(data.phoneNum);
		 $("#reservationTime").val(data.reservationTime);
		 $("#cashPledgeYN").val(data.cashPledgeYN);
		 $("#cashPledge").val(data.cashPledge);
		 $("#personNum").val(data.personNum);
		 $("#tableNum").val(data.tableNum);
		 $("#submitTableYN").val(data.submitTableYN);
		 $("#remarkArr").val(data.Addr);
		 if(data.submitTableYN==1)
		 {
			 $(".submitTable").css("display","block");
			 getTableNameAndTo(data.reservationTime);
		 }
		 if(data.submitTableYN==0)
		 {
			 $(".submitTable").css("display","none");
		 }
		 $('#cashPledgeYN').click();
		 $("#remark").val(data.remark);
		 if(data.reservationJson=="null")
		 {
			$('#dishReser option:contains("否")').attr("selected",true);
		 }
		 else{
			 $('#dishReser option:contains("是")').attr("selected",true);
		     var reservationOrder=eval('(' + data.reservationJson + ')');   
		     for(var i=0;i<reservationOrder['order'].length;i++)
		    {
			 var flavor=reservationOrder['order'][i].flavor; 
			 if(typeof(flavor)=="undefined")
			 {
				 flavor="";
			 }
			 var $obj="<div class='dish_change "+reservationOrder['order'][i].dishId+"' dishID='"+reservationOrder['order'][i].dishId+"' dishPrice='"+reservationOrder['order'][i].price+"' printer='"+reservationOrder['order'][i].printer+"'><span class='dishName'>"+reservationOrder['order'][i].name+"</span><span class='dishNum'><input type='text' value='"+reservationOrder['order'][i].quan+"'/></span><span class='dish_all_money'>"+(reservationOrder['order'][i].price*reservationOrder['order'][i].quan).toFixed(2)+"</span><span class='flavor'><div class='sanjiao'></div></span><span class='flavor_ok'>"+flavor+"</span></div>";
			$("#add_dish_content").append($obj);$("#add_dish_content .dish_change:last").animate({"margin-left":"0px"});
		    }
			allPrice();
			//$("#add_dish_content .dish_change").dblclick(function(){$(this).remove();allPrice();});
		 }
			 //////////////////////
		 $("#open_table").show();
		 $('#reservation_print').show();
	     $("#revise").show();
		 $("#reback").show();
		 $("#deleteReservation").show();
		 $("#submit").hide();
                      })
					  

		
		});
}




function submitDeal(doc)
{   
    toJson();
	//alert(reservationJsonTemp);
    var reservationJson=reservationJsonTemp;
	    reservationJsonTemp=null;
	var phoneNum=$("#phoneNum").val();
		 if(phoneNum=="")
		 {
			 alert("联系电话不能为空！");
			 return false;
		 }
		 var reservationTime=$("#reservationTime").val();
		 if(!reservationTime.isTime())
		 {
			 alert("日期格式不正确，请输入正确格式。例如：2012-01-01 12:00");
			 return false;
		 }
		 
		 var customerName=$("#customerName").val();
		 var phoneNum=$("#phoneNum").val();
		 var reservationTime=$("#reservationTime").val();
		 var cashPledgeYN=$("#cashPledgeYN option:selected").val();
		 var cashPledge=$("#cashPledge").val();
		 var personNum=$("#personNum").val();
		 var tableNum=$("#tableNum").val();
		 var submitTableYN=$("#submitTableYN").val();
		 var Addr=$("#remarkArr").val();
		 var arrID=new Array();
		 var arrName="";
		 $("#select2 option").each(function(){//获取选择的桌子
			arrID.push($(this).val());
			arrName=arrName+$(this).html()+" ";
			 });
		 //var submitTableName
		 if(submitTableYN==1&&arrID.length==0)
		 {
			 alert("确定桌号选择是，则必须选择一个以上桌号");
			 return false;
		 }
		 var remark=$("#remark").val();
		 var hidden=$("#hidden").attr("value");
		 //alert(reservationJson);
		//alert(customerName+" "+phoneNum+" "+reservationTime+" "+cashPledgeYN+" "+cashPledge+" "+personNum+" "+tableNum+" "+submitTableYN+" "+arrID+" "+remark);
		$(".nowAddInfo").load(doc,{customerName:customerName,phoneNum:phoneNum,reservationTime:reservationTime,cashPledgeYN:cashPledgeYN,cashPledge:cashPledge,personNum:personNum,tableNum:tableNum,submitTableYN:submitTableYN,arrID:arrID,arrName:arrName,remark:remark,Addr:Addr,reservationJson:reservationJson,hidden:hidden},function(response,status,xhr){
		if(status=="success")
		{
	       
		   if(confirm("操作成功！是否留单打印"))
		   {
			   $("#reservation_print").click();
		   }
		   else
		   {
		   }
		   $("#reback").click();
		   //$("#reset").trigger("click");
		   //$("#select2").html("");
		   //$("#add_dish_content").html("");
		   //$(".show_all_money").html("");
		   return true;
		}
		else
		{
			$("#select1").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		} 
		});
		
}

$(document).ready(function(){

$("form input.required").each(function(){
			var $required = $("<strong class='high'> *</strong>"); //创建元素
			$(this).parent().append($required); //然后将它追加到文档中
		});
});


$(document).ready(function(){//初始化
    $('#cashPledgeYN option:contains("否")').attr("selected",true);
	$('#submitTableYN option:contains("否")').attr("selected",true);
	$('#dishReser option:contains("否")').attr("selected",true);
	$('#reset').click(function(){$(".cashPledgeDiv").css("display","none");$(".submitTable").css("display","none");})
	$('#reset').trigger("click");//避免刷新时原始数据未清除
	$('#radio1').trigger("click");//避免刷新时原始数据未清
});

$(document).ready(function(){//押金下拉菜单点击事件
    $('#cashPledgeYN').click(function(){
		var val=parseInt($("option:selected",this).attr("value"));
		if(val==1)
		{
			$(".cashPledgeDiv").css("display","block");
		}
		if(val==0)
		{
			$(".cashPledgeDiv").css("display","none");
		}
		
		
		});
});


$(document).ready(function(){//确定桌号下拉菜单点击事件
    $('#submitTableYN').click(function(){
		var val=parseInt($("option:selected",this).attr("value"));
		if(val==1)
		{
			$(".submitTable").css("display","block");
			getTableName();
		}
		if(val==0)
		{
			$(".submitTable").css("display","none");
		}
		
		
		});
});

$(document).ready(function(){//失去焦点判断时间格式；
    $("#reservationTime").blur(function(){
		var time=$("#reservationTime").val();
		if(time=="")
		{
			$("#timejianche").html("<span class='onError'>日期不能为空</span>");
			return false;
		}
		else
		{
			$("#timejianche").html("");
			return true;
		}
		//alert(time.isTime());
		
		
		});
});
  



$(document).ready(function(){//提交单点击事件
     $("#submit").click(function(){
		 submitDeal("addReservation.php");
		 //$("#buttonSubmit").click();		 
		 });
});


$(document).ready(function(){//留单点击事件
     $("#reservation_print").click(function(){
         var reservation=$("#reservationTime").val()?$("#reservationTime").val():"未设定";
		 var deposit=$("#cashPledge").val();
		 var name=$("#customerName").val();
		 var tel=$("#phoneNum").val();
		 var remark=$("#remark").val();
		 var addr=$("#remarkArr").val();
		 //alert($("#YNwith").attr("name"));
		 if( $("#select2 option").length>0)
		 {
			if($("#YNwith").is(":checked"))
			{
				 var tabN="";
		         var tabI="";
			  $("#select2 option").each(function(){
		             
					  tabN=tabN+$(this).html()+",";
		              tabI=tabI+$(this).attr("value")+",";
		             });
			  reserveJson(tabN,tabI,reservation,deposit,name,tel,remark,addr);
			}
			else
			{
              $("#select2 option").each(function(){
		              var tabN=$(this).html();
		              var tabI=$(this).attr("value");
		              reserveJson(tabN,tabI,reservation,deposit,name,tel,remark,addr);
		             });
			}
		 }
		 else
		 {
		   var tabN="未设定";
		   var tabI=null;
		   reserveJson(tabN,tabI,reservation,deposit,name,tel,remark,addr);
			 //alert("没有预定具体桌位，不能留单打印！");
		 }
		 });
});

$(document).ready(function(){//开台点击事件
     $("#open_table").click(function(){
         var reservation=$("#reservationTime").val()?$("#reservationTime").val():"未设定";
		 var deposit=$("#cashPledge").val();
		 var name=$("#customerName").val();
		 var tel=$("#phoneNum").val();
		 var remark=$("#remark").val();
		 var addr=$("#remarkArr").val();
		 var timeType=$("#timeType").html();
		  if( $("#select2 option").length<=0)
		  {
			  alert("没有预定具体桌位，不能开台！");
			  return false;
		  }
		 if($("#add_dish_content .dish_change").length>0)
		   {
			   //if($("#YNwith").attr("checkbox"))
			 if($("#YNwith").is(":checked"))
			 {
				 var tabNstr="";
				 var tabIarr=Array();
				$("#select2 option").each(function(){
		        tabNstr=tabNstr+$(this).html()+",";
		        tabIarr.push($(this).attr("value"));
		        });
				reservationOpen(tabNstr,tabIarr,reservation,deposit,name,tel,timeType,remark,addr,1);
			 }
			 else
			 {
               $("#select2 option").each(function(){
		       var tabN=$(this).html();
		       var tabI=$(this).attr("value");
		       reservationOpen(tabN,tabI,reservation,deposit,name,tel,timeType,remark,addr,0);
		       });
			 }
		   }
		  else
		  {
			  alert("未设定菜品，不能开台！");
			   return false;
		  }
	 
		 });
});


$(document).ready(function(){//修改按钮
     $("#revise").click(function(){
		 submitDeal("reviseReservation.php");
		 //$("#reback").click();
		 $("#buttonSubmit").click();
		 
		 });
});


$(document).ready(function(){//删除按钮
     $("#deleteReservation").click(function(){
		 if(confirm("确认是否删除该预定！"))
		   {
			   $.ajax({
			  type:"post",
			  url:"deleteReservation.php",
			  data:{reservationID:$("#hidden").val()},
			  beforeSend:function(){$(".waiting").show();},
			  complete:function(){$(".waiting").hide();},
			  error:function(){alert("删除错误！")},
			  success:function(data,textStatus){
				     if(data=="true")
					 {
						 alert("删除成功！");
						 $("#buttonSubmit").click();
						//$("#reset").trigger("click");
						$("#reback").click();
						$("#buttonSubmit").click();
					 }
					 else
					 {
						 alert("删除出现一个未知错误！");
					 }
					 }
			   });
			   return true;
		   }
		   else
		   {
			   return true;
		   }
		 
		 });
});

$(document).ready(function(){//双击事件
        $('#select1').dblclick(function(){ 
        var $options = $("option:selected",this);
	    $options.appendTo('#select2');
		});
});

$(document).ready(function(){//双击事件
        $('#select2').dblclick(function(){ 
        var $options = $("option:selected",this);
	    $options.appendTo('#select1');
		});
});

$(document).ready(function(){//查询选择事件
        $('#radio1').click(function(){ 
		   $(".showChangFind").html('<span>请输入顾客姓名：</span><input type="text"/>');
      
		});
		 $('#radio2').click(function(){ 
           $(".showChangFind").html('<span>请输入顾客电话：</span><input type="text"/>');
		});
		 $('#radio3').click(function(){ 
         $(".showChangFind").html('<span>请输入时间：</span><input type="text" id="findTime" maxlength="10"/><img class="picker" align="middle" alt="" src="images/s.gif" onClick="$(\'#findTime\').calendar()"/>');
		});
		$('#radio4').click(function(){ 
         $(".showChangFind").html('<span>请输入时间段：</span><input type="text" id="findStartTime"  maxlength="16"/><img class="picker" align="middle" alt="" src="images/s.gif" onClick="$(\'#findStartTime\').calendar()"/>至<input type="text" id="findEndTime"  maxlength="16"/><img class="picker" align="middle" alt="" src="images/s.gif" onClick="$(\'#findEndTime\').calendar()"/>');
		});
		$('#radio5').click(function(){ 
		   $(".showChangFind").html('');
      
		});
});


$(document).ready(function(){//查询按钮
        $("#buttonSubmit").click(function(){
			var wich=$(".changeFind input:radio:checked").attr("id");
			if(wich=="radio1")
			{
				//alert(1);
				var customerName=$(".showChangFind input:text").val();
				
				$(".showReservationInfo").load("inquireReservation.php",{wich:wich,customerName:customerName},function(response,status,xhr){
		         if(status=="success")
		         {
	               mouseoverTR();
		         }
		         else
		         {
		     	$("#select1").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		         } 
		         });
			}
			if(wich=="radio2")
			{
				//alert(2);
				var telephone=$(".showChangFind input:text").val();
				$(".showReservationInfo").load("inquireReservation.php",{wich:wich,telephone:telephone},function(response,status,xhr){
		        if(status=="success")
		        {
	              mouseoverTR();
		        }
		        else
		        {
			     $("#select1").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		        } 
		        });
			}
			if(wich=="radio3")
			{
				//alert(3);
				var findTime=$("#findTime").val();
				$(".showReservationInfo").load("inquireReservation.php",{wich:wich,findTime:findTime},function(response,status,xhr){
		        if(status=="success")
		        {
	              mouseoverTR();
		        }
		        else
		        {
		     	$("#select1").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		        } 
		        });
			}
			if(wich=="radio4")
			{
				//alert(4);
				var findStartTime=$("#findStartTime").val();
				var findEndTime=$("#findEndTime").val();
				$(".showReservationInfo").load("inquireReservation.php",{wich:wich,findStartTime:findStartTime,findEndTime:findEndTime},function(response,status,xhr){
		        if(status=="success")
		        { 
	              mouseoverTR();
		        }
		        else
		        {
			    $("#select1").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		        } 
		        });
			}
			if(wich=="radio5")
			{
				//alert(3);
				//var findTime=$("#findTime").val();
				$(".showReservationInfo").load("inquireReservation.php",{wich:wich},function(response,status,xhr){
		        if(status=="success")
		        {
	              mouseoverTR();
		        }
		        else
		        {
		     	$("#select1").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		        } 
		        });
			}
			
			
			});

});

$(document).ready(function(){//返回按钮
   $("#reback").click(function(){
	   $("#reset").trigger("click");
	   	 $("#open_table").hide();
		 $('#reservation_print').hide();
	   $("#revise").hide();
	   $("#reback").hide();
	   $("#deleteReservation").hide();
	   $("#submit").show();
	   $("#add_dish_content").html("");
	   $("#select2").html("");
	   
	   })
 
});



$(document).ready(function(){//读取今日预定
   $(".nowAddInfo").load("getTodayReservation.php",function(response,status,xhr){
		if(status=="success")
		{
	
		}
		else
		{
			$(".nowAddInfo").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		} 
		});
 
});


$(document).ready(function(){//预定点菜相关操作
    $('#dishReser').click(function(){
		var val=parseInt($("option:selected",this).attr("value"));
		if(val==1)
		{
			$("#addDish").fadeIn();
		}
		if(val==0)
		{
			$("#addDish").fadeOut();
			$("#dish_close").click();
		}
		
		
		});
});

  

