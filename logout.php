<?php

session_start();
session_destroy();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flogle - Logout</title>
    <? require "php/ga4code.php"; echo getGA4Code(); ?>
</head>
<body>
    Wait...
    <script type="text/javascript">
        location.href = "login.html";
    </script>
</body>
</html>