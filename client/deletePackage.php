<?php
include("quote.php");
$deleteArr=array();
if(isset($_GET['selectd_package']))
{
	$deleteArr=$_GET['selectd_package'];
}
else
{
	die("GET_ERROR");
}
if(count($deleteArr)==0)
{
	die("删除失败，未选择删除项！");
}
$db=openSQLite3Dish();
$sql="delete from package where packageName in('".join("','",$deleteArr)."')";
$rs = $db->exec($sql) or die(ERR_DELETE_DB);
$db->close();
$rs=null;
?>