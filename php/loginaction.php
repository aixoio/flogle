<?php
    
    require "info.php";

    session_start();


    $conn = new mysqli(getSQLhost(), getSQLusername(), getSQLpassword(), getSQLdb());
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $sql = "SELECT * FROM users WHERE username = '" . filter_var($_POST["usernameIn"]) . "' LIMIT 1";
    $result = $conn->query($sql);


    $data = array();

    

    if ($result->num_rows > 0) {
    // output data of each row
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    $conn->close();

    if (isset($data[0])) {

        if ($data[0]["password_hash"] == filter_var($_POST["password_hash_in"])) {


            $_SESSION["safe"] = true;
            $_SESSION["username"] = filter_var($_POST["usernameIn"]);

            echo json_encode(array(true));

        } else {

            echo json_encode(array(false));

        }

    } else {

        echo json_encode(array(false));

    }



?>
