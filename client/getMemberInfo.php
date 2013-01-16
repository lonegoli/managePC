<?php
include("quote.php");
$db=openSQLite3Member();
$sql="select * from memInfoAndcardInfo";
$rs = $db->query($sql) or die(ERR_SELECT_DB);
echo "<table>";
echo "<thead>";
echo "<tr>";
echo "<th></th><th>会员名</th><th>会员卡号</th><th>会员类型</th><th>联系电话</th><th>会员生日</th>";
echo "</tr>";
echo "</thead>";
echo "<tbody>";
while($row=$rs->fetchArray())
{
	echo "<tr value=".$row['cardNo']."><td><input type='checkbox' name='memberCheckbox'/></td><td>".$row['memName']."</td><td>".$row['cardNo']."</td><td>".$row['cardName']."</td><td>".$row['telephone']."</td><td>".$row['birthday']."</td></tr>";
}
echo "</tbody>";
echo "</table>";
$db->close();
$rs=null;
?>