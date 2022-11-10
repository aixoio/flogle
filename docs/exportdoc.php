<?php
require "../php/ga4code.php";
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/libs/bootstrap.min.css">
    <link rel="stylesheet" href="css/exportdoc.css">
    <script src="../js/libs/bootstrap.bundle.min.js"></script>
    <script src="../js/libs/jquery-3.6.1.min.js"></script>
    <script src="../js/ajax.js"></script>
    <script src="../js/libs/md5.min.js"></script>
    <script src="js/exportdoc.js"></script>
    <title>Flogle - Docs - Edit</title>
    <?php echo getGA4Code(); ?>
</head>

<body>
    <span id="canStay" hidden><?php echo $_SESSION["safe"]; ?></span>
    <span id="docID" hidden><?php echo filter_var($_GET["docid"]); ?></span>
    <span id="userName" hidden><?php echo $_SESSION["username"]; ?></span>
    <h1>Export</h1>
    <button class="btn btn-secondary" id="backToDoc">Back to doc</button>
    <br>
    <button class="btn btn-success" id="exportHTML">Export as HTML file (.html)</button>
</body>

</html>