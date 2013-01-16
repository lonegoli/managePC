<?php
include("quote.php");
$db=openSQLite3Dish();
$sql="select * from package";
$rs=$db->query($sql) or die(ERR_SELECT_DB);
$key=0;
while($row=$rs->fetchArray())
{
	if($key%2==0)
	{
		echo '<tr class="odd">';
	}
	else
	{
		echo '<tr class="even">';
	}
	echo '<td class="tool">
              <input type="checkbox"  name="selectd_package[]" value="'.$row['packageName'].'">
          </td>';
    echo '<td class="name">
              <a href="">'.$row['packageName'].'</a>
          </td>';
	echo '<td class="tool">
              <label>'.$row['price'].'</label>
          </td>';
    echo '<td class="tool">
              <a href="" title="查看/修改">
                 <span class="nowrap">
                     <img class="icon" width="16" height="16" alt="查看/修改" title="查看/修改" src="./images/s_rights.png">
                                                 查看/修改
                 </span>
              </a>
           </td>';
	echo '</tr>';
	$key++;
}
echo '<tr id="pa_summary_row">
         <th>
         </th>
         <th>
            总计：'.$key.'
         </th>
         <th>
         </th>
         <th>
         </th>
      </tr>';
$db->close();
$rs=null;
?>
