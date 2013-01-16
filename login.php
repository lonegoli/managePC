<?php
header("content-type:text/html; charset=UTF-8"); 
ob_start();
session_start();
include('./client/quote.php');
$name=$_POST['name'];
$password=$_POST['password'];
if(empty($name))
{
	echo "请输入用户名";
}
else
{
	if(empty($password))
	{
		echo "请输入密码";
	}
	else
	{
		$_SESSION[CAINAOKECLIENT]=$_POST['name'];
	    $db=new SQLite3("../db/user.db3");
	    $txt="select * from userInfo where username='".$_POST['name']."'";
	    $rs=$db->query($txt);
	    $row = $rs->fetchArray();
        if($row!=null)
          { 
             if($row['password']!=$_POST['password'])
             {     
               echo "密码错误。"; 
             }
             else
             {
		        if($row['permission']==0||$row['fgadm']==0)
		         {
					 $_SESSION['clientquanxian']="yes";
					 $_SESSION['loginUser']=$_POST['name'];
	               //header("location:window.php");
				   echo "true";
				   
		         }
		        else
		         {
	               echo "权限不够";
		         }
	         }
         }
       else
      {
	   echo "用户不存在"; 
	  }
    $db->close();
     $db=null;
	}
}
ob_end_flush();
?>