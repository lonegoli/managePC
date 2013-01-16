<?php
include("../client/quote.php");
$which=$_POST['which'];
$permission=$_POST['permission'];
$userName=$_POST['userName'];
if($which=="qian")
{
	$sql=sprintf("update  userInfo set fgadm=%d where username=\"%s\"",$permission,$userName);
}
if($which=="hou")
{
	$sql=sprintf("update  userInfo set bgadm=%d where username=\"%s\"",$permission,$userName);
}
$db=new SQLite3("../../db/user.db3");
$rs=$db->exec($sql) or die(ERR_UPDATE_DB);
$db->close();
$rs = null;
$db = null;
?>