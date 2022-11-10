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
    <link rel="stylesheet" href="css/tools.css">
    <script src="../js/libs/bootstrap.bundle.min.js"></script>
    <script src="../js/libs/jquery-3.6.1.min.js"></script>
    <script src="../js/ajax.js"></script>
    <script src="js/isAcoinAdmin.js"></script>
    <script src="js/tools.js"></script>
    <title>Flogle - aCoin - Dash</title>
    <? require "../php/ga4code.php"; echo getGA4Code(); ?>
</head>

<body>
    <span id="canStay" hidden><?php echo $_SESSION["safe"]; ?></span>
    <span id="userName" hidden><?php echo $_SESSION["username"]; ?></span>
    <h1>aCoin Dash</h1>
    <div class="btns">
        <a class="btn btn-info" href="lookup.html">Lookup aCoin User</a>
        <a class="btn btn-dark" href="top15acoinuser.html">Top 15 aCoin Users</a>
        <a class="btn btn-dark" href="allacoinuser.html">All aCoin Users</a>
        <a class="btn btn-primary" href="sendacoin.php">Send aCoin</a>
        <a class="btn btn-primary" href="requestacoin.php">Request aCoin</a>
        <button class="btn btn-primary" id="reloadData">Refresh</button>
        <br>
        <hr>
        <h1 id="acoinsENum">aCoins:</h1>
        <hr>
        <div class="btns-gen"></div>
    </div>
    <a class="btn btn-secondary" href="index.php">Back</a>

</body>

</html>