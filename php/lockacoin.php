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

    $sql = sprintf(
        "UPDATE acoin_data SET locked = 1 WHERE user_id = %s",
        filter_var($_POST["userID"])
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