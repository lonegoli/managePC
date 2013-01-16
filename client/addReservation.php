<?php
//include("quote.php");
include("addReservationDB.php");
/*$customerName=$_POST['customerName'];
$phoneNum=$_POST['phoneNum'];
$reservationTime=$_POST['reservationTime'];
$cashPledgeYN=$_POST['cashPledgeYN'];
$cashPledge=$_POST['cashPledge'];
$personNum=$_POST['personNum'];
$tableNum=$_POST['tableNum'];
$submitTableYN=$_POST['submitTableYN'];
$remark=$_POST['remark'];
$Addr=$_POST['Addr'];
$reservationJson=$_REQUEST['reservationJson'];

$unixtime=strtotime($reservationTime);
$reservationTime=date("Y-m-d H:i:s",$unixtime);
 
$db=openSQLite3Reservation();

$sql=sprintf("insert into reservationInfo values(null,\"%s\",\"%s\",\"%s\",%d,%f,%d,%d,%d,\"%s\",'%s','%s')",$customerName,$phoneNum,$reservationTime,$cashPledgeYN,$cashPledge,$personNum,$tableNum,$submitTableYN,$remark,$reservationJson,$Addr);
if($db->busyTimeout(5000))
{
$rs = $db->exec($sql);
}
$reservationID=$db->lastInsertRowID();

if(intval($submitTableYN)==1)
{
$arrID=$_POST['arrID'];
foreach($arrID as $tableID)
{
	$sql=sprintf("insert into reservationTableInfo values(null,%d,%d)",$reservationID,$tableID);
    $rs1=$db->exec($sql) or die(ERR_INSERT_DB);
}
}
 $db->close();
 $rs = null;
 $db = null;*/
/////////////////////////
echo '<h3>最新添加：</h3>';
echo '<ul>';
echo '<li class="return">姓名：'.$customerName.'</li>';
echo '<li class="return">电话：'.$phoneNum.'</li>';
echo '<li class="return">预定日期：'.$reservationTime.'</li>';
echo '<li class="return">押金：'.$cashPledge.'</li>';
echo '<li class="return">人数：'.$personNum.'</li>';
//echo '<li class="return">预定桌号：'.$customerName.'</li>';
if(intval($submitTableYN)==1)
{
	

	echo '<li class="return">预定桌号：'.$_POST['arrName'].'</li>';
}
else
{
	echo '<li class="return">预定桌号：未定</li>';
}
echo '</ul>';

 ?>