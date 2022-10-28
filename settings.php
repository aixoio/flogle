<?php

session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <? require "php/ga4code.php"; echo getGA4Code(); ?>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/libs/bootstrap.min.css">
    <link rel="stylesheet" href="css/settings.css">
    <script src="js/libs/jquery-3.6.1.min.js"></script>
    <script src="js/libs/sha256.min.js"></script>
    <script src="js/ajax.js"></script>
    <script src="js/settings.js"></script>
    <title>Flogle - Account - Settings</title>
</head>

<body>
    <span id="canStay" hidden><?php echo $_SESSION["safe"]; ?></span>
    <span id="userName" hidden><?php echo $_SESSION["username"]; ?></span>
    <h1>Settings</h1>
    <div>
        <hr>

        <button class="btn btn-primary" id="changeUsername">Change Username</button>

        <hr>

        <button class="btn btn-warning" id="changePassword">Change Password</button>

        <hr>

        <button class="btn btn-success" id="goBack">Go back</button>

        <hr>
    </div>
</body>

</html>