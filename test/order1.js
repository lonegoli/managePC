$(document).ready(function(){
	$("#button").click(function(){
		var date=$("#text").val();
	    $("#show").load("order1.php",{date:date},function(){})
		
		})
	});