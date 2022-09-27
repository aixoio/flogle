<?php

    session_start();

    $_SESSION["safe"] = true;
    $_SESSION["username"] = filter_var($_POST["username"]);

    echo "true";

?>
