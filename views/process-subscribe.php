<?php

    $to = "#";
    $from = "Subscribe form from Welldone";
    $name = "";
    $headers = "From subscribe form Welldone";
    $subject = "You have a message from Welldone";

	
	$email = $_REQUEST['subscribemail'];
	

    $body = "Please add this email to your subcribe list :\n\n";
	$body .= $email; 

    $send = mail($to, $subject, $body, $headers);

?>
