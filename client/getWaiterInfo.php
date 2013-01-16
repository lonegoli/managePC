<?php
ob_start();
session_start();
$waiter=isset($_SESSION['loginUser'])?$_SESSION['loginUser']:"未设置";
$tableName=$_POST['tableName'];
$tableId=$_POST['tableId'];
$order=$_REQUEST['order'];
for($i=0;$i<count($order);$i++)
{
if($order[$i]["unit"]=="true")
{
	$order[$i]["unit"]=true;
}
if($order[$i]["unit"]=="false")
{
	$order[$i]["unit"]=false;
}
}
$obj=array();
$obj["order"]=$order;
$obj["waiter"]=$waiter;
$obj["tableName"]=$tableName;
$obj["tableId"]=$tableId;
$obj["timestamp"]=date('Y-m-d H:i:s',time());
$Json=json_encode($obj);
echo $Json;
?>