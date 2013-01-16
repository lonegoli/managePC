<?php
function openSQLite3Dish()
{
	$db=new SQLite3("../../db/dish.db3");
	return $db;
}
function openSQLite3Table_info()
{
	$db=new SQLite3("../../db/temp/orderInfo.db3");
	return $db;
}
function openSQLite3Table_info_temporary()
{
	$db=new SQLite3("../../db/temporary/orderInfo.db3");
	return $db;
}
function openSQLite3Order_temporary()
{
	$db=new SQLite3("../../db/temporary/order.db");
	return $db;
}
function openSQLite3User()
{
	$db=new SQLite3("../../db/user.db3");
	return $db;
}
function openSQLite3Sales()
{
	$db=new SQLite3("../../db/sales.db");
	return $db;
}
function openSQLite3Member()
{
	$db=new SQLite3("../../db/member.db3");
	return $db;
}
function openSQLite3Reservation()
{
	$db=new SQLite3("../../db/reservation.db3");
	return $db;
}

?>