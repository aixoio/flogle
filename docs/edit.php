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
    <link rel="stylesheet" href="css/edit.css">
    <script src="../js/libs/bootstrap.bundle.min.js"></script>
    <script src="../js/libs/jquery-3.6.1.min.js"></script>
    <script src="../js/ajax.js"></script>
    <script src="../js/libs/md5.min.js"></script>
    <script src="js/edit.js"></script>
    <title>Flogle - Docs - Edit</title>
</head>

<body>
    <span id="canStay" hidden><?php echo $_SESSION["safe"]; ?></span>
    <span id="docID" hidden><?php echo filter_var($_GET["docid"]); ?></span>
    <span id="userName" hidden><?php echo $_SESSION["username"]; ?></span>
    <div class="editor">
        <button class="btn btn-secondary" id="goBack">Go Back</button>
        <button class="btn btn-primary" id="downloadBtn">Download</button>
        <button class="btn btn-success" id="exportBtn">Export as...</button>
        <button class="btn btn-primary" id="saveBtn">Save</button>
        <input type="text" id="titleI" placeholder="Enter your title here!">
        <span id="isSaved">Loading...</span><span id="sizeE"></span>
        <div class="styles control-btn-container">
            <button class="btn btn-dark control-btn" id="cenE">Center</button>
            <button class="btn btn-dark control-btn" id="fullE">Full</button>
            <button class="btn btn-dark control-btn" id="leftE">Left</button>
            <button class="btn btn-dark control-btn" id="rightE">Right</button>
            <button class="btn btn-dark control-btn" id="resetE">Reset</button>
            <button class="btn btn-dark control-btn" id="bE"><b>B</b></button>
            <button class="btn btn-dark control-btn" id="iE"><i>I</i></button>
            <button class="btn btn-dark control-btn" id="uE"><u>U</u></button>
            <button class="btn btn-dark control-btn" id="sE"><s>S</s></button>
            <input type="color" id="colorE">
            <label for="sizeE">Size:</label>
            <input type="number" id="sizeE2" min="1" max="512" value="3">
            <button class="btn btn-primary" id="changeSize">Change size</button>
        </div>
        <hr>
        <div class="textedit" contenteditable="true"></div>
    </div>
</body>

</html>