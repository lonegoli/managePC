<?php
include("quote.php");
$db=openSQLite3Sales() or die(ERR_CONNECT_DB);
$date=$_POST['date'];
//$date="2012-12-05 12:14:21";
$sql="select dish_id,sum(price*quantity),sum(quantity) from sales_data where DATETIME(timestamp)='".$date."' group by dish_id";
$rs=$db->query($sql) or die(ERR_SELECT_DB);
//$row=$rs->fetchArray();
$db=openSQLite3Dish() or die(ERR_CONNECT_DB);
echo "<table style='text-align: center;'><thead><tr><th>菜名</th><th>单价</th><th>数量</th><th>单品总价</th><tr></thead><tbody>";
while($row=$rs->fetchArray())
{  
    $sql2=sprintf("select name,price from dishInfo where id=%d",$row['dish_id']);
    $rsName=$db->query($sql2) or die(ERR_SELECT_DB);
    $rowName=$rsName->fetchArray();
	//$percentage=$row['sum(price*quantity)']/$total*100;
	//$percentage=number_format($percentage,2);
	echo "<tr>";
	echo "<td>".$rowName['name']."</td>";
	echo "<td>".$rowName['price']."</td>";
	//echo "<td>".$row['dish_id']."</td>";
	echo "<td>".round($row['sum(quantity)'],2)."</td>";
	echo "<td>".round($row['sum(price*quantity)'],2)."</td>";
	//echo "<td>".round($total,2)."</td>";
    //echo "<td>".$percentage."%"."</td>";
	echo "<tr>";
}
echo "</tbody></table>";

$db->close();
$db=null;

?>