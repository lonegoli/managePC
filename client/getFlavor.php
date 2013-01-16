<?php
include("quote.php");
$db=openSQLite3Table_info_temporary() or die(ERR_CONNECT_DB);
$sql=sprintf("select tableName from tableInfo where id=%d",$tableID);
$rs=$db->query($sql) or die(ERR_SELECT_DB);
while($row=$rs->fetchArray())
{ 
}
$db->close();
$db=null;
?>