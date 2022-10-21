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

    $docUUID = filter_var($_POST["docUUID"]);

    $sql = "SELECT * FROM docs WHERE BINARY uuid = '" . $docUUID . "' LIMIT 1";
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