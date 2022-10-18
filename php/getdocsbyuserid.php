<?php

    require "info.php";

    $conn = new mysqli(getSQLhost(), getSQLusername(), getSQLpassword(), getSQLdb());
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM docs WHERE BINARY user_id = " . filter_var($_POST["userid"]);
    $result = $conn->query($sql);


    $data = array();



    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    $conn->close();

    echo json_encode($data);

?>