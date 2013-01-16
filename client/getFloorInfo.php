<?php
include("quote.php");
$db=openSQLite3Table_info_temporary();
$sql="select tableFloor from tableInfo group by tableFloor order by tableFloor";
$rs = $db->query($sql) or die(ERR_SELECT_DB);
echo ' <li><a href="#" id="all">所有区域</a></li>';
while ($row = $rs->fetchArray())
{
	$fnum=$row['tableFloor'];
	echo '<li><a href="#" id="'.$fnum.'">'.$fnum.'楼</a></li>';
}
 $rs->finalize();
 $db->close(); 
 $rs = null;
 $db = null;	   
 ?>