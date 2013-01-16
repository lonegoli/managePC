<?php
include("quote.php");
$reservationID=$_GET['reservationID'];

$sql=sprintf("select * from reservationInfo where reservationID=%d",$reservationID);
$db=openSQLite3Reservation();
$rs=$db->query($sql) or die(ERR_SELECT_DB);
$row=$rs->fetchArray();

$customerName=$row['customerName'];
$phoneNum=$row['telephone'];
$reservationTime=$row['reservationTime'];
$cashPledgeYN=$row['cashPledgeYN'];
$cashPledge=$row['cashPledge'];
$personNum=$row['personNum'];
$tableNum=$row['tableNum'];
$submitTableYN=$row['reservationTableYN'];
$remark=$row['remark'];
$reservationJson=$row['reservationJson'];
$Addr=$row['Addr'];

$rs=null;
$row=null;
$sql=sprintf("select * from reservationTableInfo where reservationID=%d",$reservationID);
$rs=$db->query($sql) or die(ERR_SELECT_DB);
$tableIDArr=array();
while($row=$rs->fetchArray())
{
	array_push($tableIDArr,$row['tableID']);
}

$arr=array('reservationID'=>$reservationID,'customerName'=>$customerName,'phoneNum'=>$phoneNum,'reservationTime'=>$reservationTime,'cashPledgeYN'=>$cashPledgeYN,'cashPledge'=>$cashPledge,'personNum'=>$personNum,'tableNum'=>$tableNum,'submitTableYN'=>$submitTableYN,'remark'=>$remark,'tableIDArr'=>$tableIDArr,'reservationJson'=>$reservationJson,'Addr'=>$Addr);
//$arr=array('name'=>'jackll');
$json_string=json_encode($arr);
echo $json_string;
$db->close();
$rs=null;
?>