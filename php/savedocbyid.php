<?php
    session_start();

    require "info.php";

    $conn = new mysqli(getSQLhost(), getSQLusername(), getSQLpassword(), getSQLdb());
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $docUUID = filter_var($_POST["docUUID"]);
    $doc = filter_var($_POST["docData"]);
    $docTitle = filter_var($_POST["docTitle"]);

    $sql = "UPDATE docs SET data = '" . base64_encode($doc) . "', title = '" . $docTitle . "' WHERE uuid = '" . $docUUID . "'";


    $data = array();


    if ($conn->query($sql) === TRUE) {
        $data[] = true;
    } else {
        $data[] = false;
    }
    $conn->close();

    echo json_encode($data);

?>