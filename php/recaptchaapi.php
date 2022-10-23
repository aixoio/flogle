<?php


    require "recaptchaverify.php";
    require "recaptchainfo.php";

    if ($_POST["mode"] == "v2checkbox") {

        echo filter_var(recaptchaverify($_POST["token"], getreCaptchaSecretKeyCheckbox()));

    }

    if ($_POST["mode"] == "v3") {

        echo filter_var(recaptchaverify($_POST["token"], getreCaptchaSecretKeyV3()));

    }

    if ($_POST["mode"] == "v2inv") {

        echo filter_var(recaptchaverify($_POST["token"], getreCaptchaSecretKeyInv()));

    }


?>