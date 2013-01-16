<?php
include('quote.php');
$categoryID=$_POST['categoryID'];
$db=openSQLite3Dish();
if($categoryID=="all"||!ctype_digit($categoryID))
{
	$sql="select * from dish";
}
else
{
    $sql=sprintf("select * from dish where categoryID=%d",$categoryID);
}
$rs=$db->query($sql);
//$colNum = $rs->numColumns();
while ($row = $rs->fetchArray())
	{
		$sql=sprintf("select unitName from unit where id=%d",$row['unitID']);
		$rs1=$db->query($sql);
		$row1 = $rs1->fetchArray();
		echo "<tr class='dish_list' value='".$row['id']."' dishName='".$row['name']."' price='".round($row['price'],2)."' printer='".$row['sortPrintID']."'><td class='dishName_one'>".$row['name']."</td><td class='dishPrice_two'>".round($row['price'],2)."</td><td class='dishUnit_three'>元/".$row1['unitName']."</td></tr>";
	}
$rs->finalize();
$db->close();
$rs = null;
$db = null;
?>