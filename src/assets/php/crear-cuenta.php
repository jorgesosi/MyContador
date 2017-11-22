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
        $nombre       	= filter_var($_REQUEST['nombre'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $numero   	    = filter_var($_REQUEST['numero'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $descripcion   	= filter_var($_REQUEST['descripcion'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
       // $idBancos       = filter_var($_REQUEST['idBancos'], FILTER_SANITIZE_NUMBER_INT);
        $idHogares     = filter_var($_REQUEST['idHogares'], FILTER_SANITIZE_NUMBER_INT);
        $idCuentasTipo  = filter_var($_REQUEST['idCuentasTipo'], FILTER_SANITIZE_NUMBER_INT);
        //$idUsuarios	= '2';
        //$idBancos	= '2';
       // $idCuentasTipo ='2';             
         // Attempt to run PDO prepared statement
         try {
          //$sql  = "INSERT INTO Cuentas(nombre, descripcion, numero, idUsuarios, idBancos, idCuentasTipo) VALUES(:nombre, :descripcion, :numero, :idUsuarios, :idBancos, :idCuentasTipo)";
            $sql  = "INSERT INTO Cuentas(nombre, numero, descripcion, idHogares, idCuentasTipo) VALUES(:nombre,  :numero, :descripcion, :idHogares, :idCuentasTipo)";
         
          $stmt    = $pdo->prepare($sql);
          $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
          $stmt->bindParam(':numero', $numero, PDO::PARAM_STR);
          $stmt->bindParam(':descripcion', $descripcion, PDO::PARAM_STR);
          $stmt->bindParam(':idHogares', $idHogares, PDO::PARAM_INT);
          //$stmt->bindParam(':idBancos', $idBancos, PDO::PARAM_INT);
          $stmt->bindParam(':idCuentasTipo', $idCuentasTipo, PDO::PARAM_INT);
          $stmt->execute();

            echo json_encode(array('message' => 'se ha agregado ' . $nombre . ' a la base de datos'));
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
            console.log($e->getMessage());
         }

?>

