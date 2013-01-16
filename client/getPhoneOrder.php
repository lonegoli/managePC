<?php
include("quote.php");
$tableID=$_REQUEST['tableID'];
$arr=array();
$db=openSQLite3Table_info_temporary();
$sql=sprintf("select dishID,dishnum from temporaryMainDish where tableID=%d",$tableID);
$rs = $db->query($sql);
$db1=openSQLite3Dish();
while ($row = $rs->fetchArray())
{   $order=array();
	$sql=sprintf("select name from dishInfo where id=%d",$row['dishID']);
    $rs1 = $db1->query($sql);
	$row1 = $rs1->fetchArray();
	$order['dishName']=$row1['name'];
	$order['dishNum']=$row['dishnum'];
	array_push($arr,$order);
}
$json=json_encode($arr);
echo $json;
$db->close();
$rs = null;
$db = null;
?>