<?php
	$empfaenger = "expertchess@gmx.de";
	$betreff = "!Customer message from expert chess website!";
	$from = "From: " . $_POST['name'] . "<" . $_POST['email'] . ">";
	$text = $_POST['nachricht'];

	/* email verification */
	if (!(filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))) {
	
		echo ("<SCRIPT>
	    	 window.location.href=\"index.html#contact-sec\";
	    	 alert('Sorry, please enter a valid email address!');
    	   </SCRIPT>");
    	exit;
    	
   	}else{
   		mail($empfaenger, $betreff, $text, $from);
   		echo ("<SCRIPT>
	    	 window.location.href=\"index.html#contact-sec\";
	    	 //toastr[\"success\"](\"Your message has been sent to our Expert Developers!\");ICHWERDBEKLOPPTESGEHTNICHT
	    	 alert('Your message has been sent to our Expert Developers!');
    	   </SCRIPT>");
	}
    	   
?>