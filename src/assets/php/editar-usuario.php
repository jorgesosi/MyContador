<?php session_start();
   header('Access-Control-Allow-Origin: *');

   // Define database connection parameters
   $hn      = 'localhost';
   $un      = 'root';
   $pwd     = 'jgs123';
   $db      = 'Contador';
   $cs      = 'utf8';

   // Set up the PDO parameters
   $dsn  = "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;
   $opt  = array(
                        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                        PDO::ATTR_EMULATE_PREPARES   => false,
                       );
   // Create a PDO instance (connect to the database)
   $pdo  = new PDO($dsn, $un, $pwd, $opt);

   // Retrieve specific parameter from supplied URL
   $key  = strip_tags($_REQUEST['key']);
   $data    = array();

      
               // Sanitise URL supplied values
               $nombre       = filter_var($_REQUEST['nombre'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
               $apellido     = filter_var($_REQUEST['apellido'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
               $email       =filter_var($_REQUEST['email'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
               $contrasenia =filter_var($_REQUEST['contrasenia'],FILTER_SANITIZE_STRING,FILTER_FLAG_ENCODE_LOW);
               $id     = filter_var($_REQUEST['id'], FILTER_SANITIZE_NUMBER_INT);
               // Attempt to run PDO prepared statement
               try {
                  $sql  = "UPDATE Usuarios SET nombre = :nombre, apellido = :apellido,email = :email, contrasenia = :contrasenia WHERE id = :id";
                  $stmt =  $pdo->prepare($sql);
                  $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
                  $stmt->bindParam(':apellido', $apellido, PDO::PARAM_STR);
                  $stmt->bindParam(':email', $email, PDO::PARAM_STR);
                  $stmt->bindParam(':contrasenia', $contrasenia, PDO::PARAM_STR);
                  $stmt->bindParam(':id', $id, PDO::PARAM_INT);
                  $stmt->execute();
      
                  echo json_encode('dato de post ' . $key );
               }
               // Catch any errors in running the prepared statement
               catch(PDOException $e)
               {
                  echo $e->getMessage();
               }
?>