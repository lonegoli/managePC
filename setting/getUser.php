<?php
$user=$_POST['userCategory'];
$which=$_POST['which'];
include("../client/quote.php");
$db=new SQLite3("../../db/user.db3");
if($user=="superUser")
{
	$sql="select * from userInfo where permission=0";
	
}
if($user=="oneUser")
{
	$sql="select * from userInfo where permission=1";
	
}
if($user=="twoUser")
{
	$sql="select * from userInfo where permission=2";
	
}
if($user=="threeUser")
{
	$sql="select * from userInfo where permission=3";
	
}
if($user=="generalUser")
{
	$sql="select * from userInfo where permission=8";
	
}
$rs=$db->query($sql) or die(ERR_SELECT_DB);
	echo "<ul class='isUser'>";
	if($which=="qian")
	{
    while($row=$rs->fetchArray())
     {
		 if($row['fgadm']==1)
		 {
	       echo '<li values="'.$row['username'].'" permission=0>'.$row['username'].'</li>';
		 }
		 if($row['fgadm']==0)
		 {
	       echo '<li values="'.$row['username'].'" permission=1>'.$row['username'].'<span class="right"></span></li>';
		 }
     }
	}
	if($which=="hou")
	{
    while($row=$rs->fetchArray())
     {
		 if($row['bgadm']==1)
		 {
	       echo '<li values="'.$row['username'].'" permission=0>'.$row['username'].'</li>';
		 }
		 if($row['bgadm']==0)
		 {
	       echo '<li values="'.$row['username'].'" permission=1>'.$row['username'].'<span class="right"></span></li>';
		 }
     }
	}
	 echo "</ul>";
$db->close();
$rs = null;
$db = null;
?>