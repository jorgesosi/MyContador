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
   
   $key  = strip_tags($_REQUEST['key']);
   $data = array();

   $id     = filter_var($_REQUEST['id'], FILTER_SANITIZE_NUMBER_INT);
   // Attempt to query database table and retrieve data  
   try {    
     // $stmt    = $pdo->query('SELECT id, nombre, numero, descripcion, idUsuarios, idCuentasTipo FROM Cuentas ORDER BY id ASC');
     //$sql  =('SELECT id, nombre, numero, descripcion, idHogares, idCuentasTipo FROM Cuentas WHERE idHogares = :id  ');
     $sql = (' SELECT sum(if(T1.idMovimientosTipo=1,1,0)*T1.importe)as ingresos
FROM Movimientos as T1
inner join Cuentas as T2
on T1.idCuentas = T2.id
inner join Hogares as T3
on T2.idHogares = T3.id
inner join MovimientosTipo as T4
on T1.idMovimientosTipo = T4.id
where T3.id = :id
     ');
     $stmt =  $pdo->prepare($sql);
     $stmt->bindParam(':id', $id, PDO::PARAM_INT);
     $stmt->execute();
     while($row  = $stmt->fetch(PDO::FETCH_OBJ))
      {
         // Assign each row of data to associative array
         $data[] = $row;
      }

      // Return data as JSON
      echo json_encode($data);
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }


?>
