<?php

session_start();

?>
<!DOCTYPE html>
<html lang="en">

<head>
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
    <nav class="navbar navbar-expand-sm bg-dark">

        <div class="container-fluid">
            <!-- Links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <h1 class="navbar-brand" id="navbar-prepoll-text">Flogle</h1>
                </li>
                <li class="nav-item">
                    <h1 class="navbar-brand" id="hiUser">Hi, <?php echo $_SESSION["username"]; ?>!</h1>
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
        </div>
    </div>

</body>

</html>