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
    <link rel="stylesheet" href="css/docs.css">
    <script src="../js/libs/bootstrap.bundle.min.js"></script>
    <script src="../js/libs/jquery-3.6.1.min.js"></script>
    <script src="../js/uuid_gen.js"></script>
    <script src="../js/ajax.js"></script>
    <script src="../js/libs/md5.min.js"></script>
    <script src="../js/recaptchainfositekey.js"></script>
    <script src="js/docs.js"></script>
    <title>Flogle - Docs</title>
</head>

<body>
    <div id="recaptchaUploadInvV2"></div>
    <input type="file" id="fileUE" hidden>
    <span id="canStay" hidden><?php echo $_SESSION["safe"]; ?></span>
    <span id="userName" hidden><?php echo $_SESSION["username"]; ?></span>
    <h1>Docs</h1>
    <button class="btn btn-primary" id="newDocBtn">New document</button>
    <button class="btn btn-success" id="uploadBtb">Upload document</button>
    <button class="btn btn-secondary" id="backToDash">Back to dash</button>
    <hr>
    <div class="docsbox"></div>
</body>

</html>