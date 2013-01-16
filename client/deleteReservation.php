<?php
include("quote.php");
$reservationID=$_POST['reservationID'];
$sql=sprintf("delete from reservationInfo where reservationID=%d",$reservationID);
$db=openSQLite3Reservation();
$rs=$db->exec($sql) or die(ERR_DELETE_DB);
$rs=null;

$sql=sprintf("delete from reservationTableInfo where reservationID=%d",$reservationID);
$rs=$db->exec($sql) or die(ERR_DELETE_DB);
$db->close();
$rs=null;
echo "true";
return true;
?>