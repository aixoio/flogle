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
    $docTitle = filter_var($_POST["docTitle"]);
    $docUser_ID = filter_var($_POST["docUser_ID"]);
    $docData = filter_var($_POST["docData"]);

    $sql = sprintf(
        "INSERT INTO docs (uuid, title, user_id, data) VALUES ('%s', '%s', %s, '%s')",
        $docUUID,
        $docTitle,
        $docUser_ID,
        base64_encode($docData)
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