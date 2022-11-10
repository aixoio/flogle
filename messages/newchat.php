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
    <link rel="stylesheet" href="css/newchat.css">
    <script src="../js/libs/bootstrap.bundle.min.js"></script>
    <script src="../js/libs/jquery-3.6.1.min.js"></script>
    <script src="../js/ajax.js"></script>
    <script src="../js/uuid_gen.js"></script>
    <script src="../js/recaptchainfositekey.js"></script>
    <script src="js/newchat.js"></script>
    <title>Flogle - Messages - New Chat</title>
    <? require "../php/ga4code.php"; echo getGA4Code(); ?>
</head>

<body>
    <span id="canStay" hidden><?php echo $_SESSION["safe"]; ?></span>
    <span id="userName" hidden><?php echo $_SESSION["username"]; ?></span>
    <h1>New Chat</h1>
    <hr>
    <div class="form">
        <label for="titleE" class="form-label">Chat Name:</label>
        <input type="text" id="titleE" class="form-control">
        <label for="toE" class="form-label">To:</label>
        <input type="text" id="toE" class="form-control"><br>
        <div id="captcha"></div><br>
        <button class="btn btn-outline-primary form-control" id="makeChatBtn">Create</button><br>
    </div>
    <span id="error"></span>
</body>

</html>