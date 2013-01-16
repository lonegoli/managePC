<?php
include('quote.php');
$db=openSQLite3Dish();
$rs=$db->query('select * from category');
while ($row = $rs->fetchArray())
	{ 
	 echo "<li><a value='".$row['categoryID']."'>".$row['categoryName']."</a></li>";
	}
echo "<li><a value='all'>所有</a></li>";
$rs->finalize();
$db->close();
$rs = null;
$db = null;
?>