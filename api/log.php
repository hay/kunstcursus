<?php
    $msg = $_GET['msg'];
    $date = date("c");
    $log = "[$date] - $msg\n";
    file_put_contents("log.txt", $log, FILE_APPEND | LOCK_EX);
    header('Access-Control-Allow-Origin: *');