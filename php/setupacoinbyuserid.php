<?php

    require "info.php";

    $conn = new mysqli(getSQLhost(), getSQLusername(), getSQLpassword(), getSQLdb());
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = sprintf(
        "INSERT INTO acoin_data (user_id, acoins, locked, admin) VALUES (%s, 0, 0, 0)",
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