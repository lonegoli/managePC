<?php
include("quote.php");
$wich=$_POST['wich'];
if($wich=="radio1")
{
	$customerName=$_POST['customerName'];
	$sql=sprintf("select * from reservationInfo where customerName=\"%s\"",$customerName);
	//echo $customerName;
}
if($wich=="radio2")
{
	$telephone=$_POST['telephone'];
	$sql=sprintf("select * from reservationInfo where telephone=\"%s\"",$telephone);
	//echo $telephone;
}
if($wich=="radio3")
{
	$findTime=$_POST['findTime'];
	$unixtime=strtotime($findTime);
    $findDate=date("Y-m-d",$unixtime);
	$sql="select * from reservationInfo where DATE(reservationTime)='".$findDate."'";
	//echo $findTime;
}
if($wich=="radio4")
{
	$findStartTime=$_POST['findStartTime'];
	$findEndTime=$_POST['findEndTime'];
	$unixtime=strtotime($findStartTime);
	$findStartTime=date("Y-m-d H:i:s",$unixtime);
	
	$unixtime=strtotime($findEndTime);
    $findEndTime=date("Y-m-d H:i:s",$unixtime);
	
	$sql="select * from reservationInfo where DATETIME(reservationTime)>='".$findStartTime."'and DATETIME(reservationTime)<='".$findEndTime."'";
	//echo $findStartTime.' '.$findEndTime;
}
if($wich=="radio5")
{
	$date=date('Y-m-d',time());
	$sql="select * from reservationInfo where DATE(reservationTime)='".$date."'";
	//echo $findTime;
}
$db=openSQLite3Reservation();
$db_tn=openSQLite3Table_info_temporary();
if($db->busyTimeout(5000))
{
$rs=$db->query($sql) or die(ERR_SELECT_DB);
}
echo "<table>";
echo "<thead>";
echo "<tr>";
echo "<th>序号</th><th>顾客名</th><th>联系号码</th><th>预定时间</th><th>预定桌号</th>";
echo "</tr>";
echo "</thead>";
echo "<tbody>";
while($row=$rs->fetchArray())
{
	$tableArr=array();
	$sql=sprintf("select tableID from reservationTableInfo where reservationID='%d'",$row['reservationID']);
	if($db->busyTimeout(5000))
    {
        $rs1=$db->query($sql) or die(ERR_SELECT_DB);
    }
	while($row1=$rs1->fetchArray())
	{
		$sql=sprintf("select tableName from tableInfo where id='%d'",$row1['tableID']);
		if($db_tn->busyTimeout(5000))
        {
           $rs_tn=$db_tn->query($sql) or die(ERR_SELECT_DB);
        }
		$row_tn=$rs_tn->fetchArray();
		array_push($tableArr,$row_tn['tableName']);
	}
	echo '<tr value="'.$row['reservationID'].'">';
	echo '<td>'.$row['reservationID'].'</td>';
	echo '<td>'.$row['customerName'].'</td>';
	echo '<td>'.$row['telephone'].'</td>';
	echo '<td>'.$row['reservationTime'].'</td>';
	echo '<td>'.join(" ",$tableArr).'</td>';
	echo '</tr>';

}
echo "</tbody>";
echo "</table>";
$db_tn->close();
$rs_tn=null;
$db->close();
$rs=null;
$rs1=null;
?>