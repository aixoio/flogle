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
    <script src="https://www.google.com/recaptcha/api.js?&render=explicit" async defer></script>
    <script src="../js/recaptchainfositekey.js"></script>
    <script src="../js/libs/jquery-3.6.1.min.js"></script>
    <script src="../js/ajax.js"></script>
    <script src="js/captgascoreapi.js"></script>
    <script src="js/recaptchacaptga.js"></script>
    <title>Flogle - Games - Captga - reCaptcha</title>
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
        <h1>reCaptcha</h1>
        <div id="recaptcha"></div>
    </div>
    <br><br>
    <div class="container">
        <h4>You will get 12 points from this captcha!</h4>
        <hr>
        <div class="d-flex justify-content-center">
            <a class="btn btn-secondary" href="index.php">Back to Captga Home</a>
        </div>
    </div>

</body>

</html>