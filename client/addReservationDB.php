<?php
include("quote.php");
$customerName=$_POST['customerName'];
$phoneNum=$_POST['phoneNum'];
$reservationTime=$_POST['reservationTime'];
if(isset($_POST['cashPledgeYN']))
{
    if($_POST['cashPledgeYN']==0||$_POST['cashPledgeYN']==false||$_POST['cashPledgeYN']=="false"||$_POST['cashPledgeYN']=="0"||$_POST['cashPledgeYN']==null)
    {
      $cashPledgeYN=0;
	}
	else
	{
	  $cashPledgeYN=1;
	}
}
if(isset($_POST['cashPledge']))
{
  $cashPledge=$_POST['cashPledge'];
  if($cashPledge!=0||$cashPledge!="0"||$cashPledge!=null||$cashPledge!="null")
  {
	  $cashPledgeYN=1;
  }
}
else
{
	$cashPledge=0;
}
$personNum=$_POST['personNum'];
$tableNum=$_POST['tableNum'];
//$submitTableYN=$_POST['submitTableYN'];
if(isset($_POST['submitTableYN']))
{
	$submitTableYN=$_POST['submitTableYN'];
    if($submitTableYN==0||$submitTableYN==false||$submitTableYN=="false"||$submitTableYN=="0"||$submitTableYN==null)
    {
      $submitTableYN=0;
	}
	else
	{
	 $submitTableYN=1;
	}
}

$remark=$_POST['remark'];
$Addr=$_POST['Addr'];
$reservationJson=$_REQUEST['reservationJson'];
/*if($reservationJson!=null||$reservationJson!=""||$reservationJson!="null")
{
	$submitTableYN=1;
}*/

$unixtime=strtotime($reservationTime);
$reservationTime=date("Y-m-d H:i:s",$unixtime);
 
$db=openSQLite3Reservation();

$sql=sprintf("insert into reservationInfo values(null,\"%s\",\"%s\",\"%s\",%d,%f,%d,%d,%d,\"%s\",'%s','%s')",$customerName,$phoneNum,$reservationTime,$cashPledgeYN,$cashPledge,$personNum,$tableNum,$submitTableYN,$remark,$reservationJson,$Addr);
if($db->busyTimeout(5000))
{
$rs = $db->exec($sql) or die(ERR_INSERT_DB);
}
$reservationID=$db->lastInsertRowID();
if($submitTableYN==1)
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
 $db->close();
 $rs = null;
 $rs1=null;
 $db = null;
 ?>