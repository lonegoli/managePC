<?php
include("quote.php");
$startTime=$_POST['start'];
$endTime=$_POST['end'];
$db=openSQLite3Sales() or die(ERR_CONNECT_DB);
$unixtime=strtotime($startTime);
$startTime=date("Y-m-d H:i:s",$unixtime);
$unixtime=strtotime($endTime);
$endTime=date("Y-m-d H:i:s",$unixtime);
$sql="select sum(price*quantity) from sales_data  where DATETIME(timestamp)>='".$startTime."' and DATETIME(timestamp)<='".$endTime."'";
$sql1="select waiter_id,sum(price*quantity),sum(quantity) from sales_data where DATETIME(timestamp)>='".$startTime."' and DATETIME(timestamp)<='".$endTime."' group by waiter_id";
$rs=$db->query($sql) or die(ERR_SELECT_DB);
$row=$rs->fetchArray();
$total=$row['sum(price*quantity)'];
$rs=$db->query($sql1) or die(ERR_SELECT_DB);
$db=openSQLite3User() or die(ERR_CONNECT_DB);
if($total==0)
{
	echo "此段时间无销售数据！";
}
else{
echo "<table>
            <caption>";
	echo $startTime."到".$endTime."员工绩效统计信息";

echo "</caption>
            <thead>
			    <tr>
			       <th>员工名称</th>
				   <th>销售数量</th>
				   <th>销售值（元）</th>
				   <th>总销售值（元）</th>
				   <th>所占销售额的百分比</th>
				</tr>
			</thead>
			<tbody>
			";
while($row=$rs->fetchArray())
{   
    $sql2=sprintf("select username from userInfo where id=%d",$row['waiter_id']);
    $rsName=$db->query($sql2) or die(ERR_SELECT_DB);
    $rowName=$rsName->fetchArray();
	$percentage=$row['sum(price*quantity)']/$total*100;
	$percentage=number_format($percentage,2);
	echo "<tr>";
	echo "<td>".$rowName['username']."</td>";
	echo "<td>".round($row['sum(quantity)'],2)."</td>";
	echo "<td>".round($row['sum(price*quantity)'],2)."</td>";
	echo "<td>".round($total,2)."</td>";
    echo "<td>".$percentage."%"."</td>";
	echo "<tr>";
}
echo "<tbody></table>";
}
$db->close();
$db=null;

?>