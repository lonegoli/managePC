<?php
$tableID=$_POST['ID'];
//$historyTotalPrice=0;
include("quote.php");
$db=openSQLite3Order_temporary() or die(ERR_CONNECT_DB);
$sql=sprintf("select dish_id ,sum(quantity) from order_detail where order_id in (select id from table_order where table_id=%d) group by dish_id",$tableID);
$rs=$db->query($sql) or die(ERR_SELECT_DB);
$db=openSQLite3Dish() or die(ERR_CONNECT_DB);
echo '<div class="WR_dishInfo">
         <table>
            <tbody>';
while($row=$rs->fetchArray())
{ 
	$sql=sprintf("select * from dishInfo where id=%d",$row['dish_id']);
	$rs1=$db->query($sql) or die("查询失败！");
	$row1=$rs1->fetchArray();
	/////////////////
	$sql2=sprintf("select unitName from unit where id=%d",$row1['unitID']);
	$rs2=$db->query($sql2);
	$row2=$rs2->fetchArray();
	///////////////////
	$priceOne=$row1['price']*$row['sum(quantity)'];
	//$historyTotalPrice+=$priceOne;
	
echo '<tr dishID="'.$row['dish_id'].'" printer="'.$row1['sortPrintID'].'" price="'.$row1['price'].'" quan="'.round($row['sum(quantity)'],2).'" name="'.$row1['name'].'">
          <td class="WR_dishName">'.$row1['name'].'</td>
          <td class="WR_dishPrice">'.$row1['price'].'元/'.$row2['unitName'].'</td>
		  <td class="WR_allPrice">'.round($priceOne,2).'元'.'</td>
          <td class="WR_dishNum">'.round($row['sum(quantity)'],2).'</td>
		  <td class="WR_delete" value="'.$row2['unitName'].'"><img src="./images/delete.png" height="18" width="18"></td>
		  <td class="WR_delquan"></td>
      </tr>'; 
}
echo ' </tbody>
   </table>';
$db->close();
$db=null;
?>
 