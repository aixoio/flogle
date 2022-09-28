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

    $newMessage = filter_var($_POST["newMessage"]);
    $messageID = filter_var($_POST["messageID"]);

    $sql = sprintf(
        "UPDATE messages SET message = '%s' WHERE id = %s",
        base64_encode($newMessage),
        $messageID
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