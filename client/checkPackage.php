<?php
include("quote.php");
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
$sql=sprintf("select * from package where packageName='%s'",$packageName);
$rs = $db->query($sql) or die(ERR_SELECT_DB);
if($row=$rs->fetchArray())
{
	die("该套餐已存在，请重新输入！");
}
$db->close();
$rs=null;
?>