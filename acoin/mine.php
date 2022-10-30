<?php

session_start();


?>


<!DOCTYPE html>
<html lang="en">

<head>
    <? require "../php/ga4code.php"; echo getGA4Code(); ?>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/libs/bootstrap.min.css">
    <link rel="stylesheet" href="css/mine.css">
    <script src="../js/libs/bootstrap.bundle.min.js"></script>
    <script src="../js/libs/jquery-3.6.1.min.js"></script>
    <script src="../js/ajax.js"></script>
    <script src="../js/recaptchainfositekey.js"></script>
    <script src="js/mine.js"></script>
    <title>Flogle - aCoin - Mine</title>
</head>

<body>
    <span id="canStay" hidden><?php echo $_SESSION["safe"]; ?></span>
    <span id="userName" hidden><?php echo $_SESSION["username"]; ?></span>

    <div class="main">
        <h1>Mine aCoin</h1>
            
        <h2 id="totalRnE">aCoins: 0</h2>
        <button class="btn btn-success" id="clamacoinBtn">Claim aCoin!</button>
        <br><hr>
        <div class="loading"></div>
        <br>
        <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" id="barpre"
                aria-label="Example with label" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">0%
            </div>
        </div>
        
        <h3 id="mcE"></h3>
        <hr>
        <h3>Mine faster with the aCoin mine app!<br><a href="downloadacoinmineapp.html">Download now!</a></h3>
    </div>

    <div id="captcha"></div>

    <a class="btn btn-secondary" href="index.php">Back</a>

</body>

</html>