<?php
include("quote.php");
$db=openSQLite3Dish();
$sql="select * from category";
$rs = $db->query($sql) or die(ERR_SELECT_DB);

while ($row = $rs->fetchArray())
{
	echo '<div><span>分类：</span>';
	echo '<input type="text" value ="'.$row['categoryName'].'" disabled="disabled"/><input type="text" class="dazhe" value="100" onFocus="this.value=\'\'" onBlur="if(!value){value=defaultValue;}" categoryID="'.$row['categoryID'].'" onkeyup="this.value=this.value.replace(/\D/g,\'\')" onafterpaste="this.value=this.value.replace(/\D/g,\'\')"/><span>%</span>';
	echo '</div>';
}

 $rs->finalize();
 $db->close(); 
 $rs = null;
 $db = null;
?>