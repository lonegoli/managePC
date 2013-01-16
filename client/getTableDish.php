<?php
$tableIDArr=array();
$tableIDArr=$_POST['ID'];
$everyTableMoney=0;
//$tableIDArr=explode(",",$tableIDStr);
$historyTotalPrice=0;
include("quote.php");
echo '<div class="dishInfo">';
foreach($tableIDArr as $tableID)
{
$everyTableMoney=0;
$db=openSQLite3Table_info_temporary() or die(ERR_CONNECT_DB);
$sql=sprintf("select tableName from tableInfo where id=%d",$tableID);
$rs2=$db->query($sql) or die(ERR_SELECT_DB);
$row2=$rs2->fetchArray();

$db=openSQLite3Order_temporary() or die(ERR_CONNECT_DB);
$sql=sprintf("select dish_id ,sum(quantity) from order_detail where order_id in (select id from table_order where table_id=%d) group by dish_id",$tableID);
$rs=$db->query($sql) or die(ERR_SELECT_DB);
$db=openSQLite3Dish() or die(ERR_CONNECT_DB);
echo '<table>
            <caption value='.$row2['tableName'].'>'.$row2['tableName'].'号桌点菜信息</caption>
            <thead>
                  <tr>
                     <th>名称</th>
                     <th>单价</th>
                     <th>数量</th>
                     <th>总价</th>
                  </tr>
            </thead>
            <tbody>';
while($row=$rs->fetchArray())
{ 
	$sql=sprintf("select * from dishInfo where id=%d",$row['dish_id']);
	$rs1=$db->query($sql) or die("查询失败！");
	$row1=$rs1->fetchArray();
	$priceOne=$row1['price']*$row['sum(quantity)'];
	$historyTotalPrice+=$priceOne;
	$everyTableMoney+=$priceOne;
	
echo '<tr>
          <td class="m_dishName" value="'.$row['dish_id'].'">'.$row1['name'].'</td>
          <td class="m_dishPrice">'.round($row1['price'],2).'</td>
          <td class="m_dishNum">'.round($row['sum(quantity)'],2).'</td>
          <td>'.round($priceOne,2).'</td>
      </tr>'; 
}
echo ' </tbody>
   </table>';
echo '<strong>单桌总价：'.round($everyTableMoney,0).'</strong>';
}
//echo "总价：￥".$historyTotalPrice;
$db->close();
$db=null;
 ?>
 <?php
 echo'
     </div>
     <div class="bottom">
         <form>
         <div class="money">       
             <div class="moneyInfoEnd">
                <span>找零（￥）：</span>
                <input id="zl_money" type="text" disabled="disabled"/>
             </div> 
			 <div class="moneyInfo">
                <span>实收（￥）：</span>
                <input id="ss_money" type="text" />
             </div>
			 <div class="moneyInfo">
                <span>预付（￥）：</span>
                <input id="advance_money" type="text" value="0"/>
             </div>
			 <div class="moneyInfo clearfix">
                <span>应收（￥）：</span>
                <input id="ys_money" type="text" disabled="disabled" value="'.round($historyTotalPrice,0).'"/>
             </div>           
         </div> 
         <div class="submit">
		     <input type="checkbox" name="checkbox1" value="checkbox" id="checkbox">是否并打
             <input id="sub_money" type="submit" value="结账"/>
         </div>
         </form> 
     </div>
	 ';
?>