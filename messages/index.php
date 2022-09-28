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
    <script src="../js/libs/bootstrap.bundle.min.js"></script>
    <script src="../js/libs/jquery-3.6.1.min.js"></script>
    <script src="../js/ajax.js"></script>
    <script src="../js/uuid_gen.js"></script>
    <script src="js/messages.js"></script>
    <title>Flogle - Messages</title>
</head>

<body>
    <span id="canStay" hidden><?php echo $_SESSION["safe"]; ?></span>
    <span id="userName" hidden><?php echo $_SESSION["username"]; ?></span>
    <h1>Chats</h1>
    <button class="btn btn-secondary" id="backToDash">Back to Dash</button>
    <hr>
    <div id="chats"></div>
</body>

</html>