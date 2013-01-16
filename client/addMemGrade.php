<?php
include("quote.php");
$buttom=$_POST['buttom'];
if($buttom=="one")
{
$gradeName=$_POST['name'];
$discount=$_POST['discount']/100.00;
$againDiscount=$_POST['againDiscount'];
$db1=openSQLite3Member();
$sql=sprintf("insert into grade values(null,\"%s\",null,null,null)",$gradeName);
$rs = $db1->exec($sql) or die(ERR_INSERT_DB);
$gradeID=$db1->lastInsertRowID();


$db2=openSQLite3Dish();
$sql="select categoryID from category";
$rs=$db2->query($sql) or die(ERR_SELECT_DB);


$db3=openSQLite3Member();
while($row=$rs->fetchArray())
{
$sql=sprintf("insert into preferential values(null,%d,%d,%f,%d)",$gradeID,$row['categoryID'],$discount,$againDiscount);
$rs1=$db3->exec($sql) or die(ERR_INSERT_DB);
}

$db1->close();
$db2->close();
$db3->close();
$rs=null;
$rs1=null;
}



if($buttom=="two")
{
$getCategoryID=$_REQUEST['categoryID'];
$gradeName=$_POST['gradeName'];
$discount=$_POST['discount']/100.00;
$againDiscount=$_POST['againDiscount'];
$db=openSQLite3Member();
$sql=sprintf("insert into grade values(null,\"%s\",null,null,null)",$gradeName);
$rs = $db->exec($sql) or die(ERR_INSERT_DB);
$gradeID=$db->lastInsertRowID();
foreach($getCategoryID as $categoryID)
{
	$sql=sprintf("insert into preferential values(null,%d,%d,%f,%d)",$gradeID,$categoryID,$discount,$againDiscount);
    $rs1=$db->exec($sql) or die(ERR_INSERT_DB);
}
	
}



if($buttom=="three")
{
	$categoryIDAndDiscount=$_REQUEST['categoryIDAndDiscount'];
	$gradeName=$_POST['gradeName'];
    $againDiscount=$_POST['againDiscount'];
	$db=openSQLite3Member();
    $sql=sprintf("insert into grade values(null,\"%s\",null,null,null)",$gradeName);
    $rs = $db->exec($sql) or die(ERR_INSERT_DB);
    $gradeID=$db->lastInsertRowID();
    foreach($categoryIDAndDiscount as $categoryIDAndDis)
    {
	   $sql=sprintf("insert into preferential values(null,%d,%d,%f,%d)",$gradeID,$categoryIDAndDis[0],$categoryIDAndDis[1]/100.00,$againDiscount);
       $rs1=$db->exec($sql) or die(ERR_INSERT_DB);
    }
	
}




//输出
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