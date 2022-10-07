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
    <link rel="stylesheet" href="css/sendacoin.css">
    <script src="../js/libs/bootstrap.bundle.min.js"></script>
    <script src="../js/libs/jquery-3.6.1.min.js"></script>
    <script src="../js/ajax.js"></script>
    <script src="js/sendacoin.js"></script>
    <title>Flogle - aCoin - Dash - Send</title>
</head>

<body>
    <span id="canStay" hidden><?php echo $_SESSION["safe"]; ?></span>
    <span id="userName" hidden><?php echo $_SESSION["username"]; ?></span>
    <h1>aCoin Send</h1>
    <div class="btns">
        <label for="toUsernameE" class="form-label">To:</label>
        <input type="text" id="toUsernameE" class="form-control">
        <label for="toCoinsE" class="form-label">aCoins:</label>
        <input type="number" id="toCoinsE" class="form-control">
    </div>
    <button class="btn btn-success" id="sendB">Send</button>
    <a class="btn btn-secondary" href="tools.php">Back</a>

</body>

</html>