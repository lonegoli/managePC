<?php
header("content-type:text/html; charset=UTF-8"); 
ob_start();
session_start();
$name=isset($_SESSION['loginUser'])?$_SESSION['loginUser']:"未设置";
$tableID=$_POST['tableID'];
$tableNameArr=$_POST['tableNameArr'];
$receivable=$_POST['receivable'];
$income=$_POST['income'];
$change=$_POST['change'];
$allOrder=$_POST['allOrder'];
include("quote.php");
$data=array();
//$order=array();
$aa=array();
$datas=array();
$date=date('Y-m-d h:i:s',time());
/*$db=openSQLite3Order_temporary() or die(ERR_CONNECT_DB);
$sql=sprintf("select dish_id ,sum(quantity) from order_detail where order_id in (select id from table_order where table_id=%d) group by dish_id",$tableID);
$rs=$db->query($sql) or die(ERR_SELECT_DB);
$db=openSQLite3Dish() or die(ERR_CONNECT_DB);
while($row=$rs->fetchArray())
{ 
	$sql=sprintf("select * from dishInfo where id=%d",$row['dish_id']);
	$rs1=$db->query($sql) or die("查询失败！");
	$row1=$rs1->fetchArray();
	//$priceOne=$row1['price']*$row['sum(quantity)'];
	//$historyTotalPrice+=$priceOne;
	$data['dishId']=$row['dish_id'];
	$data['name']=$row1['name'];
	$data['price']=$row1['price'];
	$data['quan']=$row['sum(quantity)'];
	$data['printer']=1;
    array_push($order,$data);
	
}*/
//$orderData="{\"waiter\":\"li\",\"tableId\":".$tableID.",\"person\":8,\"tableName\":".$tableName.",\"timestamp\":".$date.",\"order\":"+json_encode($order)+"}";
$i=0;
foreach($tableNameArr as $tableName)
{
$orderData=sprintf("{\"waiter\":\"%s\",\"tableId\":%d,\"person\":%d,\"tableName\":\"%s\",\"timestamp\":\"%s\",\"order\":","li",$tableID[$i],8,$tableName,$date);
$orderData=$orderData.$allOrder[$i]."}";
array_push($aa,$orderData);
$i++;
}
$b=json_encode($aa);
$datas['waiter']=$name;
$datas['timestamp']=$date;
$datas['receivable']=$receivable;
$datas['income']=$income;
$datas['change']=$change;
$datas['tableName']=join(",",$tableNameArr);
$datas['orderAll']=$b;
//$end={waiter:"jack",receivable:100,income:200,change:100,tableName:1,orderAll:aa};
echo json_encode($datas);
//$db->close();
//$db=null;
 ?>
 