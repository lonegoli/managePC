<?php
include("quote.php");
//$startTime=$_POST['start'];
//$endTime=$_POST['end'];
//$now=$_POST['now'];
$db=openSQLite3Sales() or die(ERR_CONNECT_DB);
//$unixtime=strtotime($startTime);
//$startTime=date("Y-m-d",time());
//$unixtime=strtotime($endTime);
//$endTime=date("Y-m-d",time());
$date=$_POST['date'];
$startTime=$date." 00:00:00";
$endTime=$date." 24:00:00";
$sql="select sum(price*quantity) from sales_data  where DATETIME(timestamp)>='".$startTime."' and DATETIME(timestamp)<='".$endTime."'";
$sql1="select timestamp,sum(price*quantity),sum(quantity) from sales_data where DATETIME(timestamp)>='".$startTime."' and DATETIME(timestamp)<='".$endTime."' group by timestamp";
$rs=$db->query($sql) or die(ERR_SELECT_DB);
$row=$rs->fetchArray();
$total=$row['sum(price*quantity)'];
echo $total;
$rs=$db->query($sql1) or die(ERR_SELECT_DB);
$db=openSQLite3Dish() or die(ERR_CONNECT_DB);
echo "<table style='text-align: center;'><thead><tr><th>时间</th><th>该时间菜品数量</th><th>该时间总价</th></tr></thead><tbody>";
while($row=$rs->fetchArray())
{  
   // $sql2=sprintf("select name,price from dishInfo where id=%d",$row['dish_id']);
   // $rsName=$db->query($sql2) or die(ERR_SELECT_DB);
   // $rowName=$rsName->fetchArray();
	//$percentage=$row['sum(price*quantity)']/$total*100;
	//$percentage=number_format($percentage,2);
	echo "<tr>";
	//echo "<td>".$rowName['name']."</td>";
	//echo "<td>".$rowName['price']."</td>";
	echo "<td>".$row['timestamp']."</td>";
	echo "<td>".round($row['sum(quantity)'],2)."</td>";
	echo "<td>".round($row['sum(price*quantity)'],2)."</td>";
	echo "<td>".round($total,2)."</td>";
    //echo "<td>".$percentage."%"."</td>";
	echo "<tr>";
}
echo "</tbody></table>";

$db->close();
$db=null;

?>