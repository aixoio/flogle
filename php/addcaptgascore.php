<?php

    session_start();

    require "info.php";

    $conn = new mysqli(getSQLhost(), getSQLusername(), getSQLpassword(), getSQLdb());
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }


    $sql = sprintf(
        "CALL addCaptgaScore(%s, %s)",
        filter_var($_POST["userID"]),
        filter_var($_POST["score"])
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