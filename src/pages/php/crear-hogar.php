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
            $idUsuarios     =filter_var($_REQUEST['idUsuarios']);
            //$idUsuarios=7;
         // $apellido   = filter_var($_REQUEST['apellido'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
                       echo ($idUsuarios);
         // Attempt to run PDO prepared statement
         try {
           // $sql  = ('INSERT INTO Hogares(nombre, idUsuarios ) VALUES(:nombre, :idUsuarios)');
           $sql  = "INSERT INTO Hogares(nombre, idUsuarios) VALUES(:nombre, :idUsuarios)";
           $stmt    = $pdo->prepare($sql);
           $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
           $stmt->bindParam(':idUsuarios', $idUsuarios, PDO::PARAM_STR);
           
           
           $stmt->execute();

            echo json_encode(array('message' => 'se ha agregado ' . $nombre . ' a la base de datos'));
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

?>

