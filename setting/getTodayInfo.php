<?php
include("../client/quote.php");
date_default_timezone_set("Asia/chongqing");
$count=0;
$date=date('Y-m-d',time());
$sql="select * from reservationInfo where DATE(reservationTime)='".$date."'";
$db=new SQLite3("../../db/reservation.db3");
$rs=$db->query($sql) or die(ERR_SELECT_DB);
while($row=$rs->fetchArray())
{
	$count++;
}

$db->close();
$rs=null;
echo $count;
?>