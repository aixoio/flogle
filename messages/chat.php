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
    <link rel="stylesheet" href="css/chat.css">
    <script src="../js/libs/bootstrap.bundle.min.js"></script>
    <script src="../js/libs/jquery-3.6.1.min.js"></script>
    <script src="../js/ajax.js"></script>
    <script src="js/chat.js"></script>
    <title>Flogle - Messages - Chat</title>
</head>

<body>
    <span id="canStay" hidden><?php echo $_SESSION["safe"]; ?></span>
    <span id="userName" hidden><?php echo $_SESSION["username"]; ?></span>
    <span id="chatUUID" hidden><?php echo filter_var($_GET["chatUUID"]); ?></span>
    <h1>Messages</h1><br>
    <button class="btn btn-secondary" id="backToChats">Back to Chats</button><br>
    <span id="toMessage"></span>
    <hr>
    <div class="messs"></div>
    <div class="input">
        <input type="text" id="messageE">
        <button class="btn btn-primary" id="sendBtn">Send</button>
    </div>
</body>

</html>