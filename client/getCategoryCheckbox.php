<?php
include("quote.php");
$db=openSQLite3Dish();
$sql="select * from category";
$rs = $db->query($sql) or die(ERR_SELECT_DB);
echo '<p>选择打折除外菜品：</p>';
while ($row = $rs->fetchArray())
{
	
	echo '<input type="checkbox" name="categoryCheckbox" value ="'.$row['categoryID'].'"/>'.$row['categoryName'];
}
echo '<br/><span>其他：</span><input type="text" value="100" onFocus="this.value=\'\'" onBlur="if(!value){value=defaultValue;}" id="dazheCheckbox" onkeyup="this.value=this.value.replace(/\D/g,\'\')" onafterpaste="this.value=this.value.replace(/\D/g,\'\')";/><span>%</span>';
 $rs->finalize();
 $db->close(); 
 $rs = null;
 $db = null;
?>