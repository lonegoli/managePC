<?php
header('Content-type: text/html;charset=UTF-8');
?>
<?php
include("quote.php");
$wich=$_POST['wich'];
$vbarYear_s=$_POST['vbarYear_s'];
$vbarYear_e=$_POST['vbarYear_e'];
$vbarYear=$_POST['vbarYear'];

$db=openSQLite3Sales() or die(ERR_CONNECT_DB);
//$sql='select * from sales_data where strftime("%Y",timestamp)="2012"';//sql 用 getdate()实现当前时间slite3用datetime('now', 'localtime'))   
//$sql='select sum(price*quantity) from sales_data group by strftime("%m",timestamp)';
$sp=array();
$items=array();
$x=array();
$y=array();
$params=array();
$data=array();
$word="";
if($wich=="V_yearS")
{
	array_push($sp,"年销售额");
    array_push($x,"年份");
    array_push($y,"销售总价(元)");
    $sql='select sum(price*quantity),strftime("%Y",timestamp) from sales_data where strftime("%Y",timestamp)>="'.$vbarYear_s.'" and strftime("%Y",timestamp)<="'.$vbarYear_e.'" group by strftime("%Y",timestamp)';
	$word='strftime("%Y",timestamp)';
}
if($wich=="V_monthS")
{
	array_push($sp,"月销售额");
    array_push($x,"月份");
    array_push($y,"销售总价(元)");
    $sql='select sum(price*quantity),strftime("%m",timestamp) from sales_data where strftime("%Y",timestamp)="'.$vbarYear.'" group by strftime("%m",timestamp)';
	$word='strftime("%m",timestamp)';
}
if($wich=="V_dayS")
{
	array_push($sp,"天销售额");
    array_push($x,"星期数(0代表星期天)");
    array_push($y,"销售总价(元)");
    $sql='select sum(price*quantity),strftime("%w",timestamp) from sales_data where strftime("%Y",timestamp)="'.date("Y").'" and strftime("%W",timestamp)="'.date("W").'" group by strftime("%w",timestamp)';
	$word='strftime("%w",timestamp)';
}

$rs=$db->query($sql) or die(ERR_SELECT_DB);
while($row=$rs->fetchArray())
{
	
	array_push($sp,round($row['sum(price*quantity)'],2));
	array_push($x,$row[$word]);
}
array_push($items,$sp);
$params['x']=$x;
$params['y']=$y;
$data['items']=$items;
$data['params']=$params;
echo json_encode($data);
?>