<?php

    session_start();

    require "info.php";

    $conn = new mysqli(getSQLhost(), getSQLusername(), getSQLpassword(), getSQLdb());
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "INSERT INTO users (username, password_hash) VALUES ('" . $_POST["username"] . "', '" . $_POST["password_hash"] . "')";

    $data = array();

    if ($conn->query($sql) === TRUE) {
        $data[] = true;
    } else {
        $data[] = false;
    }

    $conn->close();

    $_SESSION["safe"] = true;
    $_SESSION["username"] = $_POST["username"];

    echo json_encode($data);


?>