<?php
include("checkPackage.php");
$price=0;
$packageDish="";
$packageName="";
if(isset($_REQUEST['packageName']))
{
$packageName=$_REQUEST['packageName'];
}
else
{
	die("POST_ERROR");
}
if($packageName==null||$packageName=="")
{
	die("套餐未命名，创建失败！");
}
$db=openSQLite3Dish();
$sql=sprintf("insert into package(id,packageName,price,packageDish) values(null,'%s',%d,'%s')",$packageName,$price,$packageDish);
$rs = $db->exec($sql) or die(ERR_INSERT_DB);
$db->close();
$rs=null;
?>