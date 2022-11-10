<?php


    function hcaptchaverify($token, $secret)
    {
        
        $url = "https://hcaptcha.com/siteverify";

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, array("secret" => $secret, "response" => $token));


        $data = curl_exec($ch);

        curl_close($ch);

        return $data;


    }



?>