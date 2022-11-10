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
    <link rel="stylesheet" href="css/captga.css">
    <script src="../js/libs/jquery-3.6.1.min.js"></script>
    <script src="../js/ajax.js"></script>
    <script src="js/captgascoreapi.js"></script>
    <script src="js/captga.js"></script>
    <title>Flogle - Games - Captga</title>
    <? require "../php/ga4code.php"; echo getGA4Code(); ?>
</head>

<body>
    <span id="canStay" hidden><?php echo $_SESSION["safe"]; ?></span>
    <span id="usernameE" hidden><?php echo $_SESSION["username"]; ?></span>

    <br>

    <?php

        if (!$_SESSION["safe"]) {

            echo "<hr><div class='container'><h5 class='error'>You are not logged in to Flogle, you can still play Captga but you will not be payed in aCoin and your score will be saved to this computer and this message will be on every Captga page!</h5></div><hr>";

        }

    ?>

    <div class="container">
        <div class="row">
            <div class="col">
                <h5><b>reCaptcha</b></h5>
                <hr>
                <h6><a href="recaptcha.php">reCaptcha</a></h6>
            </div>
            <div class="col">
                <h5><b>hCaptcha</b></h5>
                <hr>
                <h6><a href="hcaptcha.php">hCaptcha</a></h6>
            </div>
            <div class="col">
                <h5><b>fCaptcha</b></h5>
                <hr>
                <h6><a href="fcaptcha.php">fCapthca Text</a></h6>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col">
                <h5><b>aCoin</b></h5>
                <hr>
                <h6><a href="convert.php">Convert score to aCoin!</a></h6>
            </div>
        </div>
    </div>
    <br><br>
    <div class="container">
        <h4>Your score is <span id="scoreID"></span></h4>
        <hr>
        <div class="d-flex justify-content-center">
            <a class="btn btn-secondary" href="../dash.php">Back to dash</a>
        </div>
    </div>

</body>

</html>