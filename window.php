<?php
/*ob_start();
session_start();
if($_SESSION['clientquanxian']=="yes")
{
}
else
{
	header("location:index.php");
}*/
?>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="css/index_background/background_0.css" rel="stylesheet" type="text/css" id="cssfile" />
<link href="css/indexStyle.css" rel="stylesheet" type="text/css"/>
<script src="js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="js/index.js" type="text/javascript"></script>
<script src="js/infoShow.js" type="text/javascript"></script>
<title>菜脑壳管理系统</title>
</head>
<body>
      <div class="bodyContent">
           <div class="desktopView">
                <div class="tubiao">
                      <ul class="oneLie">
                          <a href="javascript:void(0);" id="client_login_go">
                             <li class="one">
                                 <img width="100" height="100" src="images/activity-monitor.png" alt="">
                                 <strong>前台管理</strong>
                             </li>
                          </a>
                          <a href="../manage/index.php">
                          <li class="two">
                              <img width="100" height="100" src="images/network-utility.png" alt="">
                              <strong>后台管理</strong>
                          </li>
                          </a>
                          <!--<li class="three">
                              <img width="100" height="100" src="images/sync.png" alt="">
                              <strong>设置</strong>
                          </li>-->
                      </ul>
                </div> 
           </div>        
       
      </div>
      <div class="footer">
 <!--          <div class="start">
                      <a id="startbott" href="javascript:void(0);"></a>
           </div>
   -->        
      </div>
  <!-- 开始键弹出层-->    
<!-- <div class="startSeting yuanjiao">
      <div id="menuwin">
           <div id="startmenu"></div>
                <ul id="programs">
                    <li class="liSetting"><a href="#">
                        <img src="images/ie.png" />设置<div class="nextList"></div></a></li>
                    <li><a href="#">
                        <img src="images/mc.png" />Microsoft Media Center</a></li>
                    <li>
                        <div id="leftspliter"></div>
                    </li>
                    <li><a href="#">
                        <img src="images/word.png" />Microsoft Word 2010</a></li>
                    <li><a href="#">
                        <img src="images/excel.png" />Microsoft Excel 2010</a></li>
                    <li><a href="#">
                        <img src="images/powerpoint.png" />Microsoft PowerPoint 2010</a></li>
                    <li><a href="#">
                        <img src="images/access.png" />Microsoft Access 2010</a></li>
                    <li><a href="#">
                        <img src="images/update.png" />Windows Update</a></li>
                    <li>
                        <div id="leftspliter"></div>
                    </li>
                    <li><a href="#">
                        <img src="images/narrow.png" />所有程序</a></li>
                    <li>
                        <img id="search" src="images/search.png" /></li>
               </ul>
               <ul id="links">
                   <li class="icon">
                      <img src="images/user.png" /></li>
                   <li id="cx_history"><a href="#"><span>查询</span></a></li>
                   <li><a href="#"><span>Pictures</span></a></li>
                   <li><a href="#"><span>Music</span></a></li>
                   <li>
                       <div id="rightspliter"></div>
                   </li>
                   <li><a href="#"><span>Games</span></a></li>
                   <li><a href="#"><span>Computer</span></a></li>
                   <li>
                       <div id="rightspliter"></div>
                   </li>
                   <li><a href="#"><span>Control Panel</span></a></li>
                   <li><a href="#"><span>Devices and Printers</span></a></li>
                   <li><a href="#"><span>Default Programs</span></a></li>
              </ul> 
              <ul id="child">
                  
              </ul>   
        </div>     
     </div>
</div>
 
 
 
 
 
 <div class='background' id="background">
    <div class="backgroundHeader" id="backgroundHeader">
    <a href="#" class="close"></a>
    </div>
    
    <div class="backgroundContent" >
        <div class="leftPermission">
            <ul>
                <li id="qiantai"><a href="#">前台权限</a></li>
                <li id="houtai"><a href="#">后台权限</a></li>
            </ul>
        </div>
        <div class="rightPermission">
             <h3 id="h3" values="qian">选择一个用户并设置其前台权限</h3>
             <div class="userShow">
                  <span>用户</span>
             </div>
             <div class="userTop">
                 <ul id="userList">
                    <li id="superUser"><a href="#"><span>超级用户>></span></a><hr/></li><span id="superUserSpan"></span>
                    <li id="oneUser"><a href="#"><span>一级管理者>></span></a><hr/></li><span id="oneUserSpan"></span>
                    <li id="twoUser"><a href="#"><span>二级管理者>></span></a><hr/></li><span id="twoUserSpan"></span>
                    <li id="threeUser"><a href="#"><span>三级管理者>></span></a><hr/></li><span id="threeUserSpan"></span>
                    <li id="generalUser"><a href="#"><span>普通员工>></span></a><hr/></li><span id="generalUserSpan"></span>
                 </ul>
             </div>
        </div>
    </div>
 </div>
 -->
<div class="wall"><!--动态墙-->
  <div class="gb_poptips_fold">
    <div class="wallInfo">
    </div>
    <div class="wallAllButtom">
         <div class="wallButtom">
             <a href="javascript:void(0);" id="wallButtom_one" class="wallButtom_public" title="ss"></a>
             <a href="javascript:void(0);" id="wallButtom_two" class="wallButtom_public" title="查询今日预定"></a>
         </div>
    </div>
  </div>   
</div>


<div class="yd_show"><!--预定提醒-->
   <div class="yd_header">
      <div class="header_margin">
       <div class="header_close">
            <a  href="#" class="close"></a>
       </div>
       <div class="header_content clearfix">
           <div class="headerUser clearfix">
                <div class="header_pic">
                     <img src="./images/finder.png" height="60" width="60"/>
                     
                </div>
           </div>
           <div class="header_seach">
                <input type="text" id="seach_text"/>
                <span class="seach_img"></span>
           </div>
       </div>
     </div>  
   </div>
   <div class="yd_content">
         <div class="yd_content_show">
               <ul class="yd_ul">
                    <li><div class="contentCenter"><div id="biaoji_snajiao" class="sanjiao_one"></div><span>今日预定</span><span>(此处用来0/0)</span></div></li>
                    
                    <li><div class="contentCenter"><div class="sanjiao_one"></div><span>今日已预定桌</span></div></li>
                    <li><div class="contentCenter"><div class="sanjiao_one"></div><span></span></div></li>
                    
               </ul>
         </div>
   </div>

</div>


<!--
<div style="height:400px;width:600px;-moz-border-radius:4px 4px 4px 4px;-webkit-border-radius:4px 4px 4px 4px;border-radius: 4px 4px 4px 4px;border:1px solid #333;position:absolute;top:50%;left:50%;margin-left:-300px;margin-top:-200px;background:none repeat scroll 0 0 #17648A;"><div style="height:70%;width:96%;background-color:#17648A;margin:auto;margin-top:8px;"><div style="height:100%;width:30%;float:left;background:none repeat scroll 0 0 #17648A;"></div><div style="height:100%;width:68%;float:right;background-color:#FFF;border:1px solid #333;-moz-border-radius:4px 4px 4px 4px;-webkit-border-radius:4px 4px 4px 4px;border-radius: 4px 4px 4px 4px;"></div></div>
</div>
 -->
 <div class="client_login">
   <img src="images/login001.png" height="398" width="398">
   <a href="#" class="client_login_close"></a>
   <input id="client_login_user" type="text"/>
   <input id="client_login_pass" type="password"/>
   <a  href="javascript:void(0);"class="client_login_sub"><span>登陆</span></a>
   <div class="message"></div>
 </div>
</body>
</html>