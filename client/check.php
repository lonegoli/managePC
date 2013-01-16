<?php
include("quote.php");
$check=$_POST['check'];
if($check=="gradeName")//检查分类打折类型
{
	$gradeName=$_POST['gradeName'];
	$sql=sprintf("select * from grade where gradeName=\"%s\"",$gradeName);
    $db=openSQLite3Member();
    $rs=$db->query($sql) or die(ERR_SELECT_DB);
	$row=$rs->fetchArray();
    if($row==null)
	{
		echo "";
	}
	else{
		echo "<span class='onError'>该类型名不可用</span>";
	}
 $db->close();
 $rs = null;
 $db = null;
}



if($check=="cardCategoryName")//检查会员卡类型名称
{
	$cardCategoryName=$_POST['cardCategoryName'];
	$sql=sprintf("select * from cardCategory where cardCategoryName=\"%s\"",$cardCategoryName);
    $db=openSQLite3Member();
    $rs=$db->query($sql) or die(ERR_SELECT_DB);
	$row=$rs->fetchArray();
	if($row==null)
	{
		echo "";
	}
	else{
		echo "<span class='onError'>该类型名不可用</span>";
	}
 $db->close();
 $rs = null;
 $db = null;
}


if($check=="cardNo")//检查会员卡序号
{
	$cardNo=$_POST['cardNo'];
	$sql=sprintf("select * from cardInfo where cardNo=%d",$cardNo);
	$db=openSQLite3Member();
    $rs=$db->query($sql) or die(ERR_SELECT_DB);
	$row=$rs->fetchArray();
	if($row==null)
	{
		echo "";
	}
	else{
		if($cardNo=="")
		{
		echo "<span class='onError'>会员卡号不能为空</span>";
		}
		else
		{
		echo "<span class='onError'>该类型名不可用</span>";
		}
	}
 $db->close();
 $rs = null;
 $db = null;
}
?>