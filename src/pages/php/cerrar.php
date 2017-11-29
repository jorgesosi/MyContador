<?php session_start(); // que no se te olvide iniciar el uso de sesiones. 
header('Access-Control-Allow-Origin: *');
echo (json_encode($_SESSION["id"] ));
//foreach ($_SESSION as $variable => $data){ 
  //echo $variable." = ".$data."<br>"; 
  
///} 
//echo json_encode($data);
session_destroy();

 ?>