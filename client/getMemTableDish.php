<?php
//$tableID=$_POST['ID'];
$historyTotalPrice=0;
$i=0;
include("quote.php");
$tableIDArr=$_POST['tableID'];
$cardNo=$_POST['cardNo'];
$tableName=$_POST['tableName'];
$gradeID=0;
$sql=sprintf("select gradeID from cardInfo where cardNo=%d",$cardNo);
$db=openSQLite3Member();
$rs=$db->query($sql) or die(ERR_SELECT_DB);
if(!$row=$rs->fetchArray())
{
	echo "false";
	$db->close();
    $db=null;
	return 0;
}
else
{
$gradeID=$row['gradeID'];
$db->close();
$db=null;
echo '<div class="dishInfo">';
foreach($tableIDArr as $tableID)
{
$db=openSQLite3Order_temporary() or die(ERR_CONNECT_DB);
$sql=sprintf("select dish_id ,sum(quantity) from order_detail where order_id in (select id from table_order where table_id=%d) group by dish_id",$tableID);
$rs=$db->query($sql) or die(ERR_SELECT_DB);
$db=openSQLite3Dish() or die(ERR_CONNECT_DB);
echo'<table>
            <caption>'.$tableName[$i].'号桌点菜信息</caption>
            <thead>
                  <tr>
                     <th>名称</th>
                     <th>单价</th>
                     <th>数量</th>
                     <th>单品总价</th>
					 <th>折率</th>
					 <th>折后单价</th>
					 <th>折后单品总价</th>
                  </tr>
            </thead>
            <tbody>';
while($row=$rs->fetchArray())
{ 

   
    $sql=sprintf("select * from dishInfo where id=%d",$row['dish_id']);
	$rs2=$db->query($sql) or die("查询失败！");
	$row2=$rs2->fetchArray();
	$priceOne=$row2['price']*$row['sum(quantity)'];
	//$historyTotalPrice+=$priceOne;
	
echo '<tr>
          <td  class="m_dishName" value="'.$row['dish_id'].'">'.$row2['name'].'</td>
          <td  class="dishPrice">'.round($row2['price'],2).'</td>
          <td  class="m_dishNum">'.round($row['sum(quantity)'],2).'</td>
          <td>'.round($priceOne,2).'</td>
      '; 

   
   
   

	$sql=sprintf("select categoryID from dishCategory where dishID=%d",$row['dish_id']);
	$rs3=$db->query($sql) or die("查询失败！");
	$sql="select min(discount) from preferential where (";
	while($row3=$rs3->fetchArray())
	{
	   	$sql=$sql." categoryID=".$row3['categoryID']." or";
	}
 	$sql=substr($sql, 0, -3);
	$sql=$sql. ') and gradeID='.$gradeID;
	//echo $sql;
	$db2=openSQLite3Member();
	$rs4=$db2->query($sql) or die(ERR_SELECT_DB);
	while($row4=$rs4->fetchArray())
	{
	   	echo '<td>'.$row4['min(discount)'].'</td>';
		echo '<td class="m_dishPrice">'.round($row4['min(discount)']*$row2['price'],2).'</td>';
		echo '<td>'.round($row4['min(discount)']*$row2['price']*$row['sum(quantity)'],2).'</td>';
		$historyTotalPrice+=$row4['min(discount)']*$row2['price']*$row['sum(quantity)'];
	}
	echo '</tr>';

}
echo '</tbody></table>';
}
$db->close();
$db=null;
if(isset($db2))
{
$db2->close();
$db2=null;
}
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
             <input id="sub_money" type="submit" value="结账"/>
         </div>
         </form> 
     </div>
	 ';
}
?>