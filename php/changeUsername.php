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

    $oldUsername = filter_var($_POST["oldUsername"]);
    $newUsername = filter_var($_POST["newUsername"]);

    $sql = sprintf(
        "UPDATE users SET username = '%s' WHERE username = '%s'",
        $newUsername,
        $oldUsername
    );


    $data = array();


    if ($conn->query($sql) === TRUE) {
        $data[] = true;
    } else {
        $data[] = false;
    }
    $conn->close();

    echo json_encode($data);

?>