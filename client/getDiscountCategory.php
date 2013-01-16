<?php
include("quote.php");
$db=openSQLite3Member();
$sql="select * from grade";
$rs = $db->query($sql) or die(ERR_SELECT_DB);
while ($row = $rs->fetchArray())
{
	echo '<option value="'.$row['gradeID'].'">'.$row['gradeName'].'</option>';
	

}

 $rs->finalize();
 $db->close(); 
 $rs = null;
 $db = null;
?>