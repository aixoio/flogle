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
    $doc = filter_var($_POST["docData"]);
    $docTitle = filter_var($_POST["docTitle"]);

    $sql = sprintf(
        "UPDATE acoin_globals SET canMine = %s WHERE id = 1",
        filter_var($_POST["newState"])
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