var wichDao=0;

function getStatistics(startTime,endTime,yn){
	if(yn=="no")
	{
	wichDao=1;
	}
	$(".showInfo").load("getStatistics.php",{start:startTime,end:endTime,now:yn},function(response,status,xhr){
		if(status=="success")
		{

		}
		else
		{
			jQuery(".showTable").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		}
	});
}


function getCategoryStatistics(startTime,endTime){
	    $(".showInfo").load("getCategoryStatistics.php",{start:startTime,end:endTime},function(response,status,xhr){
		if(status=="success")
		{

		}
		else
		{
			jQuery(".showTable").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		}
	});
}

function getWaiterStatistics(startTime,endTime)
{   
    wichDao=2;
	$(".showInfo").load("getWaiterStatistics.php",{start:startTime,end:endTime},function(response,status,xhr){
		if(status=="success")
		{

		}
		else
		{
			jQuery(".showTable").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		}
	});
}


function putExcelStat(startTime,endTime)
{ 
	if(wichDao==1)
	{
		
		window.location.href="putExcelStat.php?start="+startTime+"&end="+endTime;
		
	}
	else if(wichDao==2)
	{
		window.location.href="putExcelWaiterStat.php?start="+startTime+"&end="+endTime;
	}
	else
	{
	   alert("请选择导出何种信息！");
		return false;
	}
	return true;
	
}



$(document).ready(function(){//初始化信息
	//var startTime="2012-10-18 00:00:00";
	//var endTime="2012-10-18 24:00:00";
	
	
	var now=new Date();
	var years=now.getFullYear();
	var month=now.getMonth()+1;
	var days=now.getDate();
	var startTime=years+"-"+month+"-"+days+" 00:00:00";
	var endTime=years+"-"+month+"-"+days+" 24:00:00";
	//var startTime="2012-10-18 00:00:00";
	//var endTime="2012-10-18 24:00:00";
	getStatistics(startTime,endTime,"yes");
	
	
	});
$(document).ready(function(){
	$("#submit1").click(function(){
		var startTime1=$("#calendar2").val();
		var startTime2=$("#calendar3").val();
		var endTime1=$("#calendar4").val();
		var endTime2=$("#calendar5").val();
		var startTime=startTime1+" "+startTime2+":00";
		var endTime=endTime1+" "+endTime2+":00";
		getStatistics(startTime,endTime,"no");		
		});	
	});
	
$(document).ready(function(){
	$("#submit8").click(function(){
		var startTime1=$("#calendar2").val();
		var startTime2=$("#calendar3").val();
		var endTime1=$("#calendar4").val();
		var endTime2=$("#calendar5").val();
		var startTime=startTime1+" "+startTime2+":00";
		var endTime=endTime1+" "+endTime2+":00";
		getCategoryStatistics(startTime,endTime);		
		});	
	});
		
$(document).ready(function(){
	$("#submit4").click(function(){
		var startTime1=$("#calendar2").val();
		var startTime2=$("#calendar3").val();
		var endTime1=$("#calendar4").val();
		var endTime2=$("#calendar5").val();
		var startTime=startTime1+" "+startTime2+":00";
		var endTime=endTime1+" "+endTime2+":00";
		getWaiterStatistics(startTime,endTime);		
		});	
	});
	
	
$(document).ready(function(){
	$("#submit6").click(function(){
		var startTime1=$("#calendar2").val();
		var startTime2=$("#calendar3").val();
		var endTime1=$("#calendar4").val();
		var endTime2=$("#calendar5").val();
		var startTime=startTime1+" "+startTime2+":00";
		var endTime=endTime1+" "+endTime2+":00";
		putExcelStat(startTime,endTime);		
		});	
	});
	
	
	
$(document).ready(function(){
	 $("#vbarSta option#V_yearS").attr("selected",true);
	 $("#vbarSta").click(function(){
		 var $options=$("option:selected",this);
		 var optionID=$options.attr("id");
		 switch(optionID)
		 {
			 case "V_yearS":$(".dateDis2").hide();$(".dateDis1").show();break;
			 case "V_monthS":$(".dateDis1").hide();$(".dateDis2").show();break;
			 case "V_dayS":$(".dateDis2").hide();$(".dateDis1").hide();break;
		 }
		 
		 });
	//$("#vbarSta option#V_yearS").click(function(){$(".dateDis2").hide();$(".dateDis1").show();}).attr("selected",true);
	//$("#vbarSta option#V_monthS").click(function(){$(".dateDis1").hide();$(".dateDis2").show();});
	//$("#vbarSta option#V_dayS").click(function(){$(".dateDis2").hide();$(".dateDis1").hide();});
});
	
	
$(document).ready(function(){//绘制柱状统计图
	$("#submit2").click(function(){	
	         var wich=$("#vbarSta option:selected").attr("id");	
			 var vbarYear_s=0;
			 var vbarYear_e=0;
			 var vbarYear=0;
			 vbarYear_s=$(".dateDis1 #S_yearS").val();
			 vbarYear_e=$(".dateDis1 #E_yearS").val();
			 vbarYear=$(".dateDis2 #N_yearS").val();
			 //alert(vbarYear_s+"/"+vbarYear_e+"/"+vbarYear);          		
     		$(".showInfo").html('<canvas width="800" height="400" id="sample"></canvas>');
		        var g = new html5jp.graph.vbar("sample");
	            if( ! g ) { return; }
			$.post("graph.php",{wich:wich,vbarYear_s:vbarYear_s,vbarYear_e:vbarYear_e,vbarYear:vbarYear},function(data,textStatus){
				var jsonObject = eval("(" + data + ")");
				items=jsonObject['items'];
				params=jsonObject['params'];
				g.draw(items, params);});		
		});
		
	});
	
	

$(document).ready(function(){//绘制折线统计图
   $("#submit3").click(function(){
	   $(".showInfo").html('<canvas width="600" height="500" id="sample"></canvas>');
	   var lg = new html5jp.graph.line("sample");
	if( ! lg ) { return; }
	var items = [
		["商品A", 20, 58, 40, 14, 38, 20, 40]
		//["商品B", 10, 14, 58, 80, 70, 90, 20]
	];
	var params = {
		x: ["月份", "1", "2", "3", "4", "5", "6", "7"],
		y: ["销售总价(元)", 0, 20, 40, 60, 80, 100],
		yMax: 100,
		yMin: 0,
		lineWidth: [1,2],
		dotRadius: [3,4],
		dotType: ["disc", "square"]
	};
	lg.draw(items, params);
	   
	   
	   
	   });


});




