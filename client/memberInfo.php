<?php
include("quote.php");
$cardNo=$_POST['cardNumber'];
$gradeID=$_POST['cardCategory'];
$cardCategoryName=$_POST['cardCategoryName'];
$memberName=$_POST['memberName'];
$memGender=$_POST['memGender'];
$memberPhone=$_POST['memberPhone'];
$credentialsNum=$_POST['credentialsNum'];
$memberBirthday=$_POST['memberBirthday'];
$memberAddress=$_POST['memberAddress'];
$income=$_POST['income'];
$startTime=$_POST['startTime'];
$endTime=$_POST['endTime'];
$personHandling=$_POST['person'];
$due=$_POST['personMoney'];
$remark=$_POST['remark'];
$cardStatue=$_POST['cardStatue'];
$zhengsong=$_POST['zhengsong'];
$firstChongzhi=$_POST['firstChongzhi'];
$touzhi=$_POST['touzhi'];
$firstPassword=$_POST['firstPassword'];
$againPassword=$_POST['againPassword'];

//echo $cardNumber." ".$cardCategory." ".$memberName." ".$memberPhone." ".$credentialsNum." ".$memberBirthday." ".$memberAddress." ".$startTime." ".$endTime." ".$person." ".$personMoney." ".$remark." ".$cardStatue." ".$zhengsong." ".$firstChongzhi." ".$touzhi." ".$firstPassword." ".$againPassword;
$db=openSQLite3Member();
$sql1=sprintf("insert into memInfo values(null,\"%s\",%d,\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",%d)",$memberName,$memGender,$memberBirthday,$memberPhone,$credentialsNum,$memberAddress,$income,$personHandling,$remark,$cardNo);
$rs = $db->exec($sql1) or die(ERR_INSERT_DB);

$sql2=sprintf("insert into cardInfo values(null,%d,\"%s\",%d,%d,%d,\"%s\",%d,\"%s\",\"%s\",%d,%d,%d)",$cardNo,$cardCategoryName,0,$zhengsong+$firstChongzhi,$touzhi,$firstPassword,$cardStatue,$startTime,$endTime,$due,$gradeID,0);
$rs = $db->exec($sql2) or die(ERR_INSERT_DB);

echo $sql1."\r\n";

echo $sql2;


$db->close();
$rs=null;
?>