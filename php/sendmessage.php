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

    $chatID = filter_var($_POST["chatID"]);
    $fromID = filter_var($_POST["fromID"]);
    $message = filter_var($_POST["message"]);
    $chatUUID = filter_var($_POST["chatUUID"]);
    $time = filter_var($_POST["time"]);

    $sql = sprintf(
        "INSERT INTO messages (chat_id, from_id, message, chat_uuid, time) VALUES (%s, %s, '%s', '%s', '%s')",
        $chatID,
        $fromID,
        base64_encode($message),
        $chatUUID,
        $time
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