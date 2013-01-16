function categoryOneBut(){//整单打折按钮
   $("#discountName").trigger('blur');
	var numError=$('.onError').length;
	//alert(numError);
	if(numError)
	{
		return false;
	}
      var discountName=$("#discountName").val();
	  var howDiscount=$("#howDiscount").val();
	  var againDiscount=$(".change:checkbox:checked").val()?$(".change:checkbox").val():0;
	  if(discountName=="")
	  {
		  alert("打折类型名不能为空");
		  return 0;	  
	  }
	  if(howDiscount==""||howDiscount>100||howDiscount<=0)
	  {
		   alert("打折数值错误，请输入小于等于100大于0的数");
		   return 0;	
	  }
	  $(".leftContent").load("addMemGrade.php",{name:discountName,discount:howDiscount,againDiscount:againDiscount,buttom:"one"},function(response,status,xhr){
		if(status=="success")
		{
			$("#discountName").val("");
			showGradeInfo();
		}
		else
		{
			$(".leftContent").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		} 
		  });

	}
	
//////////////////////////////////////	
function categoryTwoBut(){//反类别打折按钮
   $("#discountName").trigger('blur');
	var numError=$('.onError').length;
	if(numError)
	{
		return false;
	}
    var gradeName=$("#discountName").val();
	var discount=$("#dazheCheckbox").val();
	var againDiscount=0;
	if(discountName=="")
	{
		alert("打折类型名不能为空");
		  return 0;	 
	}
	if(discount==""||discount>100||discount<=0)
	  {
		   alert("打折数值错误，请输入小于等于100大于0的数");
		   return 0;	
	  }
    var arr=new Array();
    $("input[name='categoryCheckbox']:not(:checked)").each(function(){//未选择的复选框代表要打折的
	var value=$(this).attr("value")
    var len=arr.push(value);
	});
	
	$(".leftContent").load("addMemGrade.php",{gradeName:gradeName,categoryID:arr,discount:discount,againDiscount:againDiscount,buttom:"two"},function(response,status,xhr){
		if(status=="success")
		{
		   showGradeInfo();
		}
		else
		{
			$(".leftContent").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		} 
		  });
	
	
	}
	
////////////////////////////////////////	
function categoryThreeBut(){//类别打折按钮
   $("#discountName").trigger('blur');
	var numError=$('.onError').length;
	if(numError)
	{
		return false;
	}
    var gradeName=$("#discountName").val();
	var againDiscount=0;
	var arr=new Array();
	var biaoji=true;
	if(discountName=="")
	{
		alert("打折类型名不能为空");
		  return 0;	 
	}
	$("input.dazhe").each(function(){
		var discount=$(this).val();
		if(discount==""||discount>100||discount<=0)
		{
			alert("打折数值错误，请输入小于等于100大于0的数");
			biaoji=false;
		    return 0;
		}
		var sarr=new Array();
		var categoryID=$(this).attr("categoryID");
		var len=sarr.push(categoryID,discount);
		var len=arr.push(sarr);
		//arr[categoryID]=discount;
		});
		if(biaoji)//因为return 0只能跳出当前函数，不能跳出categoryThreeBut这个函数，所以当打折数值有错时，只能通过一个标识来判断是否执行下面的语句
		{
		      $(".leftContent").load("addMemGrade.php",{gradeName:gradeName,categoryIDAndDiscount:arr,againDiscount:againDiscount,buttom:"three"},function(response,               status,xhr){
		      if(status=="success")
		      {
		           showGradeInfo();
		      }
		      else
		      {
			    $(".leftContent").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		      } 
		     });
		}

	}

////////////////////////////////////////////////////
function getCategoryCheckbox(){
     	$(".box2").load("getCategoryCheckbox.php",function(response,status,xhr){
		if(status=="success")
		{
			//$(".addText").after('<input type="text"/><span>%</span>');
			var $button=$("<input type='button' id='categoryTwoBut' value='添加'>");
			$(".box2").append($button);
			$("#categoryTwoBut").click(categoryTwoBut);
		}
		else
		{
			$(".box2").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		}
		});
			
}

function getCategory(){
	    $(".box2").load("getCategory.php",function(response,status,xhr){
		if(status=="success")
		{
			//$(".addText").after('<input type="text"/><span>%</span>');
			var $button=$("<input type='button' id='categoryThreeBut' value='添加'>");
			$(".box2").append($button);
			$("#categoryThreeBut").click(categoryThreeBut);
			
		}
		else
		{
			$(".box2").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		}
		});
}

function showGradeInfo(){//获取生成的打折类别具体信息
	    $(".leftContent ul li").click(function(){
			var gradeID=$(this).val();
			var gradeName=$(this).html();
		  $(".rightContent").load("getGrade.php",{gradeID:gradeID,gradeName:gradeName},function(response,status,xhr){
		if(status=="success")
		{
	
			
		}
		else
		{
			$(".rightContent").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		}
		});
			});
	
	
	}

$(document).ready(function(){//初始化
    $("#discountName").val("").focus();//防止刷新文本框不去除原有数据
    $("#categoryOne").attr("checked",true);
	if($("#categoryOne").is(":checked"))
	{   var $text=$('<input type="text" name="howDiscount" id="howDiscount" onkeyup="this.value=this.value.replace(/\\D/g,\'\')" onafterpaste="this.value=this.value.replace(/\\D/g,\'\')"/><span>%</span><input type="checkbox"  class="change" name="vehicle" value="1" /><span>特价/促销菜除外</span>');
		$("#biaoji").html($text);
		$(".box2").html("<input type='button' id='categoryOneBut' value='添加'>");
		$("#categoryOneBut").click(categoryOneBut);
	}
	else
	{
		getCategory();
	}
	
	
	});


$(document).ready(function(){//失去焦点判断事件
    $("#discountName").blur(function(){
		var gradeName=$("#discountName").val();
		$("#jianche").load("check.php",{check:"gradeName",gradeName:gradeName},function(response,status,xhr){
		if(status=="success")
		{
			
		}
		else
		{
			$(".leftContent").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		} 
		});
		
		});


});



$(document).ready(function(){//点击事件
	$("#categoryOne").click(function(){
		$(".box2").html("<input type='button' id='categoryOneBut' value='添加'>");
		var $text=$('<input type="text" name="howDiscount" id="howDiscount" onkeyup="this.value=this.value.replace(/\\D/g,\'\')" onafterpaste="this.value=this.value.replace(/\\D/g,\'\')"/><span>%</span><input type="checkbox"  class="change" name="vehicle" value="true" /><span>特价/促销菜除外</span>');
		$("#biaoji").html($text);
		//$("#biaoji").after($text);
		$(".box2").html("<input type='button' id='categoryOneBut' value='添加'>");
		$("#categoryOneBut").click(categoryOneBut);
		
		});
		
    $("#categoryTwo").click(function(){
		$("#biaoji").html("");
		getCategoryCheckbox();	
	
		
		});
		
		
	$("#categoryThree").click(function(){
		$("#biaoji").html("");
		getCategory();
		
		
		});
	
	
	});
	
	
	
	
	$(document).ready(function(){//显示已添加打折类型
		$(".leftContent").load("getGradeInfo.php",function(response,status,xhr){
		if(status=="success")
		{
			showGradeInfo();
			
		}
		else
		{
			$(".leftContent").html("<strong>获取数据错误，请重新载入或联系客服！</strong>");
		} 
		});
		
		
		});