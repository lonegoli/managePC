<?php
ob_start();
include('quote.php');
if(isset($_POST["sub"]))
{
	session_start();
	$_SESSION[CAINAOKEUSERNAME]=$_POST['name'];

}
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<script language="javascript" >
function showAuto()
{
	setTimeout("delePass()",100);
	
}
function delePass()
{
	$("#password").val("");
}
</script>
<title>菜脑壳无线点餐后台管理系统</title>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	overflow:hidden;
}
.STYLE3 {color: #528311; font-size: 12px; }
.STYLE4 {
	color: #42870a;
	font-size: 12px;
}
-->
</style>
</head>
<body onLoad="showAuto()">
<?php

if(isset($_POST["sub"]))
{  
	$db=openSQLite3User();
	$txt="select * from userInfo where username='".$_POST['name']."'";
	$rs=$db->query($txt);
	$row = $rs->fetchArray();
if($row!=null)
{ 
   if($row['password']!=$_POST['password'])
    {
     $db->close();
	 $db=null;
     echo "密码错误。"; 
    }
   else
    {
		if($row['permission']!=0)
		{
			$db->close();
	        $db=null;
			echo "权限不够。";
		}
		else
		{
	   $db->close();
	   $db=null;
	   $_SESSION['quanxian']="yes";
	   header("location:view.html");
	   ob_end_flush();
		}
	}
}
else
{
	echo "用户不存在。"; 
	$db->close();
	$db=null;
}
}
?>
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td bgcolor="#e5f6cf">&nbsp;</td>
  </tr>
  <tr>
    <td height="608" background="images/login_03.gif"><table width="862" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td height="266" background="images/login_04.gif">&nbsp;</td>
      </tr>
      <tr>
        <td height="95"><table width="100%" border="0" cellspacing="0" cellpadding="0">
		<form action="index.php" method="post" charset="UTF-8">
          <tr>
            <td width="424" height="95" background="images/login_06.gif">&nbsp;</td>
            <td width="183" background="images/login_07.gif"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                <td width="28%" height="30"><div align="center"><span class="STYLE3">用户：</span></div></td>
                <td width="72%" height="30"><input type="text" name="name"  style="height:18px; width:130px; border:solid 1px #cadcb2; font-size:12px; color:#81b432;"></td>
              </tr>
              <tr>
                <td height="30"><div align="center"><span class="STYLE3" >密码：</span></div></td>
                <td height="30"><input type="password" name="password" id="password" autocomplete= "off" style="height:18px; width:130px; border:solid 1px #cadcb2; font-size:12px; color:#81b432;" onFocus="this.value=''" value=""></td>
              </tr>
              <tr>
                <td height="30">&nbsp;</td>
                <td height="30"><input type="submit" name="sub" value="登陆"/></td>
              </tr>
            </table></td>
            <td width="255" background="images/login_08.gif">&nbsp;</td>
          </tr>
		  </form>
        </table></td>
      </tr>
      <tr>
        <td height="247" valign="top" background="images/login_09.gif"><table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="22%" height="30">&nbsp;</td>
            <td width="56%">&nbsp;</td>
            <td width="22%">&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td height="30"><table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="44%" height="20">&nbsp;</td>
                <td width="56%" class="STYLE4">cainaoke版本 2012V1.0 </td>
              </tr>
            </table></td>
            <td>&nbsp;</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td bgcolor="#a2d962">&nbsp;</td>
  </tr>
</table>

<map name="Map"><area shape="rect" coords="3,3,36,19" href="#"><area shape="rect" coords="40,3,78,18" href="#"></map></body>
</html>
