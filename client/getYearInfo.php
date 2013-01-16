<?php
include("quote.php");
$db=openSQLite3Sales() or die(ERR_CONNECT_DB);
//$sql='select * from sales_data where strftime("%Y",timestamp)="2012"';//sql 用 getdate()实现当前时间slite3用datetime('now', 'localtime'))   
//$sql='select sum(price*quantity) from sales_data group by strftime("%m",timestamp)';
$sql='select sum(price*quantity),strftime("%d",timestamp) from sales_data group by strftime("%dd",timestamp)';
$rs=$db->query($sql) or die(ERR_SELECT_DB);
while($row=$rs->fetchArray())
{
	echo $row['strftime("%d",timestamp)'].":";
	echo $row['sum(price*quantity)']."\n\r";   
	}
?>