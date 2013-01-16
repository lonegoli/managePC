$(document).ready(function(){
	$("#button").click(function(){
		var date=$("#text").val();
	    $("#show").load("order.php",{date:date},function(){})
		
		})
	});