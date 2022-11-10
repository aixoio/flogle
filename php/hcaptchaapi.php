<?php


    require "hcaptchaverify.php";
    require "hcaptchainfo.php";

    echo filter_var(hcaptchaverify($_POST["token"], gethCaptchaSecretKey()));


?>