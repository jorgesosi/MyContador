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
   $data1    = array();


      // Sanitise URL supplied values
         $nombre       = filter_var($_REQUEST['nombre'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $apellido   = filter_var($_REQUEST['apellido'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $email       =filter_var($_REQUEST['email'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $contrasenia =filter_var($_REQUEST['contrasenia'],FILTER_SANITIZE_STRING,FILTER_FLAG_ENCODE_LOW);
         
         // Attempt to run PDO prepared statement
         try {
            $sql  = ('SELECT id, nombre, apellido, email , contrasenia  FROM Usuarios WHERE email = :email ');
            $stmt =  $pdo->prepare($sql);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->execute();
            while($row  = $stmt->fetch(PDO::FETCH_OBJ)){
                //while($row  = $stmt->fetch(PDO::FETCH_ASSOC)){
                //Assign each row of data to associative array
                $data1[] = $row;
            }
            $row_count=$stmt->rowCount();// verifica que no exista el  email del usuario a ingresar
            if($row_count==0){// si no existe el usuario 
                $sql  = "INSERT INTO Usuarios(nombre, apellido, email, contrasenia) VALUES(:nombre, :apellido, :email, :contrasenia)";
                $stmt    = $pdo->prepare($sql);
                $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
                $stmt->bindParam(':apellido', $apellido, PDO::PARAM_STR);
                $stmt->bindParam(':email', $email, PDO::PARAM_STR);
                $stmt->bindParam(':contrasenia', $contrasenia, PDO::PARAM_STR);
                $stmt->execute();
                while($row  = $stmt->fetch(PDO::FETCH_OBJ))
                {
                // Assign each row of data to associative array
                $data[] = $row;
                }
            }
            // Return data as JSON
            echo json_encode($data);

            //echo json_encode(array('message' => 'se ha agregado ' . $nombre . ' a la base de datos'));
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
            console.log($e->getMessage());
         }

?>
