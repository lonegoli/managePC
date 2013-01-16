<?php
include("quote.php");
$cardCategoryName=$_POST['cardCategoryName'];
$rewardPoints=$_POST['rewardPoints'];
$feeChargCard=$_POST['feeChargCard'];
$disCountCategory=$_POST['disCountCategory'];
$remark=$_POST['remark'];
$timeRestrain=$_POST['timeRestrain'];
$startTime=$_POST['startTime'];
$endTime=$_POST['endTime'];
$db=openSQLite3Member();
$sql=sprintf("insert into cardCategory values(null,\"%s\",%d,\"%s\",%d,%f,%d,%f,%d,\"%s\",\"%s\")",$cardCategoryName,$disCountCategory,$remark,$rewardPoints,0.00,$feeChargCard,0.00,$timeRestrain,$startTime,$endTime);
$rs = $db->exec($sql) or die(ERR_INSERT_DB);
$sql="select cardCategoryID as '序列',cardCategoryName as '卡类型名',gradeName as '打折类型',gradeID as '打折类型序号',remark as '备注',rewardPointsYN as '是否积分',rewardPoints as '积分',feeChargingCardYN as '是否存储卡',feeChargingCard as '存储卡余额',restrain as '约束',startTime as '开始时间',endTime as '结束时间' from cardCategoryAndGrade";
$rs=$db->query($sql) or die(ERR_SELECT_DB);
$colNum = $rs->numColumns();
echo "<table>";
echo "<thead><tr>";
for ($i = 0; $i < $colNum; $i++)
 {
	
     echo '<th>' . $rs->columnName($i).'</th>';
 }
 echo "</tr></thead>";
while($row=$rs->fetchArray())
{
	echo'<tr>';
	for($i=0;$i<$colNum;$i++)
	{
	echo '<td>'.$row[$i].'</td>';
	}
	echo'</tr>';
}
echo "</table>";





 $db->close();
 $rs = null;
 $db = null;
?>