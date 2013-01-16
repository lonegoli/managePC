<?php
include("quote.php");
$reservationDate=$_REQUEST['reservationDate'];
$unixdate=strtotime($reservationDate);
$reservationDate=date("Y-m-d",$unixdate);
$tableIDArr=array();
$db=openSQLite3Reservation();
$sql="select tableID from reservationTableInfo where reservationID in (select reservationID from reservationInfo where DATE(reservationTime)='".$reservationDate."')";
$rs = $db->query($sql);
while ($row = $rs->fetchArray())
{
	array_push($tableIDArr,$row['tableID']);
}
$db->close();
$rs = null;
$db = null;
 ////////////////////////////
$db=openSQLite3Table_info_temporary();
$sql="select * from tableInfo";
$rs = $db->query($sql);
while ($row = $rs->fetchArray())
{
	if(in_array($row['id'],$tableIDArr))
	{
		echo '<option value="'.$row['id'].'" style="color:red">'.$row['tableName'].'</option>';
	}
	else
	{
	    echo '<option value="'.$row['id'].'">'.$row['tableName'].'</option>';
	}
}
 $db->close();
 $rs = null;
 $db = null;
		   
 ?>