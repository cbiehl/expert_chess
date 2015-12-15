<?php
	$empfaenger = "expertchess@gmx.de";
	$betreff = "!Customer message from expert chess website!";
	$from = "From: " . $_POST['name'] . "<" . $_POST['email'] . ">";
	$text = $_POST['nachricht'];

	mail($empfaenger, $betreff, $text, $from);
	/*
	echo $_POST['email'];
	echo $_POST['nachricht'];
	echo $_POST['name'];
	*/
?>

<script>
	window.location.href = "index.html";
</script>