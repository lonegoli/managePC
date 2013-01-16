<?php
include("quote.php");
$gradeID=$_POST['gradeID'];
$gradeName=$_POST['gradeName'];
$db=openSQLite3Member();
$sql=sprintf("select * from preferential where gradeID=%d",$gradeID);
$rs=$db->query($sql) or die(ERR_SELECT_DB);
while($row=$rs->fetchArray())
{
  $db1=openSQLite3Dish();
  $sql=sprintf("select categoryName from category where categoryID=%d",$row['categoryID']);
  $rs1=$db1->query($sql) or die(ERR_SELECT_DB);
  $row1=$rs1->fetchArray();
  $discount=$row['discount']*10;
  echo '<ul>
           <li>
		       <span>打折类别名：'.$gradeName.'</span>
           </li>
		   <li>
		        <span>'.$row1['categoryName'].':'.$discount.'折</span>
		   </li>
	   </ul>';
}

?>