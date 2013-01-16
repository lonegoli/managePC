<?php
$floor=$_POST['flo'];
include("quote.php");
$db=openSQLite3Table_info_temporary();
if($floor=="all")
{
$sql="select * from tableInfo order by tableOrder";
}
else
{
	$sql=sprintf("select * from tableInfo where tableFloor=%d",$floor);
}
if($db->busyTimeout(8000))
{
$rs = $db->query($sql);
}
if(!is_object($rs))
{
	echo "<strong>获取数据错误，请重新载入或联系客服！</strong>";
	return false;
}
while ($row = $rs->fetchArray())
{
	$status=$row['status'];
	$tableID=$row['id'];
	$sql=sprintf("select * from callWaiter where tableID=%d",$tableID);
	$rservice = $db->query($sql);
	if($row1 = $rservice->fetchArray())
	{
		$status=$status+100;
	}
	switch ($status)
    {
      case 1:
          echo'<div class="table" id="'.$tableID.'"><div class="tableYellow tableRed dealTable"  value="open"></div><div class="tableName">'.$row['tableName'].'</div></div>';
          break;  
      case 0:
	      echo'<div class="table" id="'.$tableID.'"><div class="tableYellow tableYellow dealTable" value="close"></div><div class="tableName">'.$row['tableName'].'</div></div>';
          break;
	  case 50:
          echo'<div class="table" id="'.$tableID.'"><div class="tableYellow tableBlue dealTable" value="close_phone"></div><div class="tableName">'.$row['tableName'].'</div></div>';
          break; 
	  case 51:
          echo'<div class="table" id="'.$tableID.'"><div class="tableYellow tableRed tableBlue dealTable" value="open_phone"></div><div class="tableName">'.$row['tableName'].'</div></div>';
          break; 
	  case 100:
          echo'<div class="table" id="'.$tableID.'"><div class="tableYellow Notific dealTable" value="close_notific"></div><div class="tableName">'.$row['tableName'].'</div></div>';
          break; 
	  case 101:
          echo'<div class="table" id="'.$tableID.'"><div class="tableYellow tableRed Notific dealTable" value="open_notific"></div><div class="tableName">'.$row['tableName'].'</div></div>';
          break; 
	  case 150:
          echo'<div class="table" id="'.$tableID.'"><div class="tableYellow tableBlue Notific dealTable" value="close_phone_notific"></div><div class="tableName">'.$row['tableName'].'</div></div>';
          break; 
	  case 151:
          echo'<div class="table" id="'.$tableID.'"><div class="tableYellow tableRed tableBlue Notific dealTable" value="open_phone_notific"></div><div class="tableName">'.$row['tableName'].'</div></div>';
          break; 
      default:
	      echo'<div class="table" id="'.$tableID.'"><div class="tableRed dealTable" value="open"></div><div class="tableName">'.$row['tableName'].'</div></div>';
	}
 
}
 $db->busyTimeout(0);
 $db->close();
 $rs = null;
 $db = null;		   
 ?>