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
               $fecha       	= filter_var($_REQUEST['fecha'] );
               $importe  	    = filter_var($_REQUEST['importe'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ENCODE_LOW);
               $descripcion   	= filter_var($_REQUEST['descripcion'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
               $idMovimientosTipo     = filter_var($_REQUEST['idMovimientosTipos'], FILTER_SANITIZE_NUMBER_INT);
               $idCuentas  = filter_var($_REQUEST['idCuentas'], FILTER_SANITIZE_NUMBER_INT);
                   $id             = filter_var($_REQUEST['id'], FILTER_SANITIZE_NUMBER_INT);
               // Attempt to run PDO prepared statement
               try {
                  //$stmt =  $pdo->prepare($sql);
                  //$stmt =  $pdo->prepare($sql);
                  //$sql  = "UPDATE Cuentas SET nombre = :nombre, numero = :numero, descripcion = :descripcion, idHogares = :idHogares, idCuentasTipo = :idCuentasTipo  WHERE id = :id";
                  $sql="UPDATE Movimientos SET fecha =:fecha, importe=:importe, descripcion =:descripcion, idMovimientosTipo = :idMovimientosTipo, idCuentas=:idCuentas WHERE id= :id";
                  $stmt =  $pdo->prepare($sql);
                  $stmt->bindParam(':fecha', $fecha, PDO::PARAM_STR);
                  $stmt->bindParam(':importe', $importe, PDO::PARAM_INT);
                  $stmt->bindParam(':descripcion', $descripcion, PDO::PARAM_STR);
                  $stmt->bindParam(':idMovimientosTipo', $idMovimientosTipo, PDO::PARAM_INT);
                  $stmt->bindParam(':idCuentas', $idCuentas, PDO::PARAM_INT);
                  $stmt->bindParam(':id', $id, PDO::PARAM_STR);
                  $stmt->execute();
      
                  echo json_encode('Congratulations the record ' . $id . ' was updated');
               }
               // Catch any errors in running the prepared statement
               catch(PDOException $e)
               {
                  echo $e->getMessage();
               }
?>

