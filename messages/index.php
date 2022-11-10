<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/libs/bootstrap.min.css">
    <link rel="stylesheet" href="css/messages.css">
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <script src="../js/libs/bootstrap.bundle.min.js"></script>
    <script src="../js/libs/jquery-3.6.1.min.js"></script>
    <script src="../js/ajax.js"></script>
    <script src="../js/recaptchainfositekey.js"></script>
    <script src="js/messages.js"></script>
    <title>Flogle - Messages</title>
    <? require "../php/ga4code.php"; echo getGA4Code(); ?>
</head>

<body>
    <span id="canStay" hidden><?php echo $_SESSION["safe"]; ?></span>
    <span id="userName" hidden><?php echo $_SESSION["username"]; ?></span>
    <h1>Chats</h1>
    <button class="btn btn-secondary" id="backToDash">Back to Dash</button>
    <button class="btn btn-primary" id="newChat">New Chat</button><br>
    <div class="googlemess">
        This site is protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
    </div>
    <hr>
    <div id="chats"></div>
</body>

</html>