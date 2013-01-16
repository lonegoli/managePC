<?php
include("quote.php");
$db=openSQLite3Member();
$sql="select cardCategoryID,cardCategoryName from cardCategory";
$rs=$db->query($sql) or die(ERR_SELECT_DB);




$db->close();
$rs = null;
$db = null;
?>