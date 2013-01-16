<?php
include("quote.php");
date_default_timezone_set("Asia/chongqing");
$date=date('Y-m-d',time());
$sql="select * from reservationInfo where DATE(reservationTime)='".$date."'";
$db=openSQLite3Reservation();
$rs=$db->query($sql) or die(ERR_SELECT_DB);
echo "<h3>今日预定情况：</h3>";
while($row=$rs->fetchArray())
{
	echo "<div class='todayInfo'>";
	echo '<ul>';
    echo '<li class="return">姓名：'.$row['customerName'].'</li>';
    echo '<li class="return">电话：'.$row['telephone'].'</li>';
    echo '<li class="return">预定日期：'.$row['reservationTime'].'</li>';
    echo '<li class="return">押金：'.$row['cashPledge'].'</li>';
    echo '<li class="return">人数：'.$row['personNum'].'</li>';
	echo '</ul>';
	echo "</div>";
}

$db->close();
$rs=null;
?>