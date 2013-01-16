<?php
include("quote.php");
$customerName=$_POST['customerName'];
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
$reservationID=$_POST['hidden'];
$unixtime=strtotime($reservationTime);
$reservationTime=date("Y-m-d H:i:s",$unixtime);
 
$db=openSQLite3Reservation();

$sql=sprintf("update reservationInfo set customerName=\"%s\",telephone=\"%s\",reservationTime=\"%s\",cashPledgeYN=%d,cashPledge=%f,personNum=%d ,tableNum=%d,reservationTableYN=%d,remark=\"%s\",reservationJson='%s',Addr='%s' where reservationID=%d",$customerName,$phoneNum,$reservationTime,$cashPledgeYN,$cashPledge,$personNum,$tableNum,$submitTableYN,$remark,$reservationJson,$Addr,$reservationID);
if($db->busyTimeout(5000))
{
$rs = $db->exec($sql) or die(ERR_UPDATE_DB);
}
$sql=sprintf("delete from reservationTableInfo where reservationID=%d",$reservationID);
if($db->busyTimeout(5000))
{
$rs = $db->exec($sql) OR die(ERR_DELETE_DB);
}

if(intval($submitTableYN)==1)
{
$arrID=$_POST['arrID'];
foreach($arrID as $tableID)
{
	$sql=sprintf("insert into reservationTableInfo values(null,%d,%d)",$reservationID,$tableID);
	if($db->busyTimeout(5000))
	{
    $rs1=$db->exec($sql) or die(ERR_INSERT_DB);
	}
}
}

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
 $db->close();
 $rs = null;
 $db = null;
 ?>