<?php
include("quote.php");
$startTime=$_POST['start'];
$endTime=$_POST['end'];
$now=$_POST['now'];
$db=openSQLite3Sales() or die(ERR_CONNECT_DB);
$unixtime=strtotime($startTime);
$startTime=date("Y-m-d H:i:s",$unixtime);
$unixtime=strtotime($endTime);
$endTime=date("Y-m-d H:i:s",$unixtime);
$sql="select sum(price*quantity) from sales_data  where DATETIME(timestamp)>='".$startTime."' and DATETIME(timestamp)<='".$endTime."'";
$sql1="select dish_id,sum(price*quantity),sum(quantity) from sales_data where DATETIME(timestamp)>='".$startTime."' and DATETIME(timestamp)<='".$endTime."' group by dish_id";
$rs=$db->query($sql) or die(ERR_SELECT_DB);
$row=$rs->fetchArray();
$total=$row['sum(price*quantity)'];
$rs=$db->query($sql1) or die(ERR_SELECT_DB);
$db=openSQLite3Dish() or die(ERR_CONNECT_DB);
if($total==0)
{
	echo "此段时间无销售数据！";
}
else{
echo "<table>
            <caption>";
if($now=="yes")
{
	echo "今日销售信息";
}
else
{
	echo $startTime."到".$endTime."销售信息";
}
echo "</caption>
            <thead>
			    <tr>
			       <th>名称</th>
				   <th>单价(元)</th>
				   <th>数量</th>
				   <th>单品总价(元)</th>
				   <th>总价(元)</th>
				   <th>单品百分比</th>
				</tr>
			</thead>
			<tbody>
			";
while($row=$rs->fetchArray())
{   
    $sql2=sprintf("select name,price from dishInfo where id=%d",$row['dish_id']);
    $rsName=$db->query($sql2) or die(ERR_SELECT_DB);
    $rowName=$rsName->fetchArray();
	$percentage=$row['sum(price*quantity)']/$total*100;
	$percentage=number_format($percentage,2);
	echo "<tr>";
	echo "<td>".$rowName['name']."</td>";
	echo "<td>".$rowName['price']."</td>";
	echo "<td>".round($row['sum(quantity)'],2)."</td>";
	echo "<td>".round($row['sum(price*quantity)'],2)."</td>";
	echo "<td>".round($total,2)."</td>";
    echo "<td>".$percentage."%"."</td>";
	echo "<tr>";
}
echo "</tbody></table>";
}
$db->close();
$db=null;

?>