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
   //$id     = filter_var($_REQUEST['id']);
   //$id     ='5' ;

   // Attempt to query database table and retrieve data  
   try {    
      //$stmt    = $pdo->query('SELECT id, nombre, idUsuarios FROM Hogares  WHERE idUsuarios = :id ORDER BY nombre ASC');
      $sql  =('SELECT id, nombre, idUsuarios FROM Hogares  WHERE idUsuarios = :id ');
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
     // echo json_encode('id:'.$id);
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }


?>
