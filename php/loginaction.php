<?php

    session_start();

    $_SESSION["safe"] = true;
    $_SESSION["username"] = $_POST["username"];

    echo "true";

?>
