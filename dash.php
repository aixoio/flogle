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
    <link rel="stylesheet" href="css/dash.css">
    <script src="js/libs/jquery-3.6.1.min.js"></script>
    <script src="js/dash.js"></script>
    <title>Flogle - Dash</title>
</head>

<body>
    <span id="canStay" hidden><?php echo $_SESSION["safe"]; ?></span>
    <nav class="navbar navbar-expand-sm bg-dark">

        <div class="container-fluid">
            <!-- Links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <h1 class="navbar-brand" id="navbar-prepoll-text">Flogle</h1>
                </li>
                <li class="nav-item">
                    <h1 class="navbar-brand" id="hiUser">Hi, <?php echo filter_var($_SESSION["username"]); ?>!</h1>
                </li>
                <li class="nav-item">
                    <button type="button" class="btn btn-success nav-link" id="setsBtn">Settings</button>
                </li>
                <li class="nav-item">
                    <button type="button" class="btn btn-warning nav-link" id="logoutBtn">Logout</button>
                </li>
            </ul>
        </div>

    </nav>

    <div class="container text-center">
        <div class="row">
            <div class="col" id="map">
                <h1><a href="maps/index.html">Maps</a></h1>
                <img src="images/map.svg" alt="Map icon" width="128" height="128">
            </div>
            <div class="col" id="docs">
                <h1><a href="docs/index.php">Docs</a></h1>
                <img src="images/docs.svg" alt="Docs icon" width="128" height="128">
            </div>
            <div class="col" id="mess">
                <h1><a href="messages/index.php">Messages</a></h1>
                <img src="images/messages.svg" alt="Messages icon" width="128" height="128">
            </div>
            <div class="col" id="acoin">
                <h1><a href="acoin/index.php">aCoin</a></h1>
                <img src="images/acoin.svg" alt="aCoin icon" width="128" height="128">
            </div>
            <div class="col" id="weather">
                <h1><a href="weather/index.html">Weather</a></h1>
                <img src="images/weather.svg" alt="Weather icon" width="128" height="128">
            </div>
        </div>
    </div>

</body>

</html>