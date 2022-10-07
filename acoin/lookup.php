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
    <link rel="stylesheet" href="css/lookup.css">
    <script src="../js/libs/jquery-3.6.1.min.js"></script>
    <script src="../js/ajax.js"></script>
    <script src="js/lookup.js"></script>
    <title>Flogle - aCoin - Dash - Lookup</title>
</head>

<body>
    <h1>Lookup aCoin user</h1>
    <div class="askForUser">
        <label for="userNameIn" class="form-label">Username:</label>
        <input type="text" id="userNameIn" class="form-control"><br>
        <button class="btn btn-info" id="lookupUser">Lookup</button><br>
    </div>
    <div class="resultData">
        <h3>Results</h3>
        <span id="usernameR"></span><br>
        <span id="acoinsR"></span><br>
        <span id="lockedR"></span><br>
        <span id="adminR"></span><br>
    </div>
    <hr>
    <a class="btn btn-secondary" href="tools.php">Back</a>

</body>

</html>