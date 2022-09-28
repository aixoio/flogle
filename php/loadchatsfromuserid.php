<?php


    session_start();

    require "info.php";

    if (!$_SESSION["safe"]) {

        die("Error");

    }

    $conn = new mysqli(getSQLhost(), getSQLusername(), getSQLpassword(), getSQLdb());
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $sql = sprintf(
        "SELECT * FROM chats WHERE from_id = %s OR to_id = %s",
        filter_var($_POST["userID"]),
        filter_var($_POST["userID"])
        );
    $result = $conn->query($sql);


    $data = array();

    

    if ($result->num_rows > 0) {
    // output data of each row
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    $conn->close();

    echo json_encode($data);

?>