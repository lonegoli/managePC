<?php
include("quote.php");
$db=openSQLite3Member();
$sql="select gradeID,gradeName from grade";
$rs=$db->query($sql) or die(ERR_SELECT_DB);
echo "<ul>";
while($row=$rs->fetchArray())
{
echo '<li value="'.$row['gradeID'].'">'.$row['gradeName'].'</li>';
}
echo "</ul>";
$db->close();
$rs=null;


?>