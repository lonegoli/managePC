<?php
include("quote.php");
$arr=$_REQUEST['arr'];
$db=openSQLite3Member();
foreach($arr as $value)
{
$sql=sprintf("delete from memInfo where cardNo=%d",$value);
$rs = $db->exec($sql) or die(ERR_DELETE_DB);
}
$db->close();
$rs=null;
?>