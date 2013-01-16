<?php
include("quote.php");
$db=openSQLite3Dish();
$sql="select * from package";
$rs=$db->query($sql) or die(ERR_SELECT_DB);
while($row=$rs->fetchArray())
{
  echo '<li><a href="">'.$row['packageName'].'</a></li>';
}

$db->close();
$rs=null;
?>
