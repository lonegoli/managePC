$(document).ready(function(){
	//$(".menue ul li").hover(function(){$(this).find("img").animate({height:50,width:50}).animate({height:100,width:100}).animate({height:75,width:75})},function(){$(this).find("img").stop(true,true).animate({height:75,width:75})});
	$(".menue ul li:not(.first_li)").click(function(){$(this).find("img").animate({height:50,width:50}).animate({height:100,width:100}).animate({height:75,width:75});$(this).siblings("li").css({"background-color":"#86BBEA"}).end().css({"background-color":"#B1CFE2"})});
});