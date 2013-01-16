<?php
include("../client/quote.php");
date_default_timezone_set("Asia/chongqing");
$date=date('Y-m-d',time());
$sql="select * from reservationInfo where DATE(reservationTime)='".$date."'";
$db=new SQLite3("../../db/reservation.db3");
$rs=$db->query($sql) or die(ERR_SELECT_DB);
if(!$row=$rs->fetchArray())
{
	echo '<ul class="yd_member"><li><div class="pic_li"><img src="./images/20101103233352496smail.png" height="60" width="60"/></div><div class="content_li"><p>';
	echo '<span>今日暂无预定</span>';
	echo '</p></div></li></ul>';
	
}
else{
	echo '<ul class="yd_member"><li><div class="pic_li"><img src="./images/20101103233352496smail.png" height="60" width="60"/></div><div class="content_li"><p>';
	echo '<span>姓名：'.$row['customerName'].'('.$row['telephone'].')</span><span>备注：'.$row['remark'].'</span>';
	echo '</p></div></li></ul>';
}

while($row=$rs->fetchArray())
{
	echo '<ul class="yd_member"><li><div class="pic_li"><img src="./images/20101103233352496smail.png" height="60" width="60"/></div><div class="content_li"><p>';
	echo '<span>姓名：'.$row['customerName'].'('.$row['telephone'].')</span><span>备注：'.$row['remark'].'</span>';
	echo '</p></div></li></ul>';
}

$db->close();
$rs=null;
?>
