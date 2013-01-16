<?php
include("quote.php");
$db=openSQLite3Member();
$sql="select cardCategoryID,cardCategoryName,feeChargingCardYN from cardCategory";
$rs=$db->query($sql) or die(ERR_SELECT_DB);
echo '<select>';
while($row=$rs->fetchArray())
{
	echo '<option value="'.$row['cardCategoryID'].'" feeChargingCardYN="'.$row['feeChargingCardYN'].'">'.$row['cardCategoryName'].'</option>';
}
echo '</select>';
$db->close();
$rs = null;
$db = null;
?>