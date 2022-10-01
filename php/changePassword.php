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

    $username = filter_var($_POST["username"]);
    $newPassword = filter_var($_POST["newPassword"]);

    $sql = sprintf(
        "UPDATE users SET password_hash = '%s' WHERE username = '%s'",
        $newPassword,
        $username
    );


    $data = array();
    $data[] = $sql;


    if ($conn->query($sql) === TRUE) {
        $data[] = true;
    } else {
        $data[] = false;
    }
    $conn->close();

    echo json_encode($data);

?>