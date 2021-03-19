<?php
	$updatedData = $_POST['newData'];
	$response = file_put_contents('db.json', $updatedData);
?>