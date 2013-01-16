function showInfo_close()
{
	$("#showInfo").fadeOut();
	$("#showInfoContent").html("");
}
function showInfo_error(errorContent)
{
	errorContent="<span class='showInfo_error'>"+errorContent+"</span>";
	$("#showInfoContent").html(errorContent);
}
function showInfo_right()
{
	var rightContent="<span class='showInfo_right'>创建成功！</span>";
	$("#showInfoContent").html(rightContent);
}
function showPackage()
{
	$("#tablepackage tbody").load("showPackage.php",function(response,status,xhr){
		if(status=="success")
		{
		}
		else
		{
		}
		});
}
function showPackageName()
{
	$("#packageList").load("showPackageName.php",function(response,status,xhr){
		if(status=="success")
		{
		}
		else
		{
		}
		});
}
function deletePackage(deleteData)
{
	$.ajax({
		url:"deletePackage.php",
		type:"get",
		data:deleteData,
		success:function(data,textStatus){
			  if(data==null||data=="")
			  {
				  showPackage();
		          showPackageName();
			  }
			  else
			  {
			  }
			}
		
		})
}
$(document).ready(function(){
	$("#create_package_form").submit(function(e){
		$("#showInfo").fadeIn();
		$("#showInfoContent").html("任务处理中");
	    e.preventDefault();//阻止submit默认操作
		var packageName=$("#text_create_pa").val();
		$.ajax({
			  type:"post",
			  //async:false,
			  url:"createPackage.php",
			  data:{packageName:packageName},
			  //beforeSend:function(){$(".waiting").show();},
			  complete:function(){setTimeout(showInfo_close,3000)},
			  error:function(){alert("添加套餐失败！")},
			  success:function(data,textStatus){
				  if(data==null||data=="")
				  {
					  //执行成功
					  $("#text_create_pa").val("");
					  showInfo_right();
					  showPackage();
					  showPackageName();
				  }
				  else
				  {
					  //执行失败
					  showInfo_error(data);
				  }
				  
				  }
			  });	
	});
});


$(document).ready(function(){//hover
    $("#tablepackage tbody").delegate("tr","mouseover mouseout",function(){$(this).is(".hover")?$(this).removeClass("hover"):$(this).addClass("hover")});

});


$(document).ready(function(){
	showPackage();	
	});
	
	
$(document).ready(function(){
	showPackageName();
	});
	
$(document).ready(function(){//全选/全不选
	$("#markAllRows").click(function(){
		$("[name=selectd_package[]]:checkbox").attr("checked",true);
		 return false;
		})	
		
	$("#unMarkAllRows").click(function(){
		$("[name=selectd_package[]]:checkbox").attr("checked",false);
		 return false;
		})	
	});
	
$(document).ready(function(){//删除
    $("#deletePackage").click(function(e){
		var deletePackageArr=Array();
		e.preventDefault();//阻止submit默认操作
		var deleteData=$("#paStatsForm tbody :checkbox").serialize();//序列化
		deletePackage(deleteData);	
		})
});