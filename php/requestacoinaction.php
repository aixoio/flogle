<?php
    session_start();

    require "info.php";

    if (!$_SESSION["safe"]) {

        die("Can not Continue");

    }

    $conn = new mysqli(getSQLhost(), getSQLusername(), getSQLpassword(), getSQLdb());
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $toID = filter_var($_POST["toID"]);
    $fromID = filter_var($_POST["fromID"]);
    $acoins = filter_var($_POST["acoins"]);

    $sql = sprintf(
        "CALL requestAcoin(%s, %s, %s)",
        $toID,
        $fromID,
        $acoins
    );


    $data = array();


    if ($conn->query($sql) === TRUE) {
        $data[] = true;
    }
    else {
        $data[] = false;
    }
    $conn->close();

    echo json_encode($data);

?>