<?php
include("quote.php");
$tableID=$_REQUEST['tableID'];
$arr=array();
$db=openSQLite3Table_info_temporary();
$sql=sprintf("select serviceName from serviceList where id in (select callStatus from callWaiter where tableID=%d)",$tableID);
$rs = $db->query($sql);
while ($row = $rs->fetchArray())
{
	array_push($arr,$row['serviceName']);
}
$json=json_encode($arr);
echo $json;
$db->close();
$rs = null;
$db = null;
?>