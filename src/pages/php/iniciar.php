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
   $row_count ="";
   // Sanitise URL supplied values
    $email       =filter_var($_REQUEST['email'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $contrasenia =filter_var($_REQUEST['contrasenia'],FILTER_SANITIZE_STRING,FILTER_FLAG_ENCODE_LOW);
    // Attempt to run PDO prepared statement
    try {
        $sql  = ('SELECT id, nombre, apellido, email , contrasenia  FROM Usuarios WHERE email = :email and contrasenia = :contrasenia');
        $stmt =  $pdo->prepare($sql);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':contrasenia', $contrasenia, PDO::PARAM_STR);
        $stmt->execute();
        while($row  = $stmt->fetch(PDO::FETCH_OBJ))
        //while($row  = $stmt->fetch(PDO::FETCH_ASSOC))
        {
            //Assign each row of data to associative array
            $data[] = $row;
        }
        //$row  = $stmt->fetch(PDO::FETCH_OBJ);
       // $data[] = $row;
        
        $row_count=$stmt->rowCount();
        if($row_count==1){
            $row  = $stmt->fetch(PDO::FETCH_ASSOC);
            $_SESSION["id"]         =   json_encode($data[0]->id);
            $_SESSION['nombre']     =   json_encode($data[0]->nombre);
            $_SESSION["apellido"]   =   json_encode($data[0]->apellido);
            //echo $data;
           // echo json_encode( $data);
           // echo (json_encode($_SESSION["id"].$_SESSION['nombre'].$_SESSION["apellido"] ));
            //echo ("dato id". json_encode($data[0]->nombre));
        }
        
        //Return data as JSON
        echo json_encode( $data);
       // echo ("dato id". json_encode($data[0]->nombre));
        //echo json_encode('dato de post key: ' . $key .' email: ' . $email. ' contrasenia: '.$contrasenia );
    }
    // Catch any errors in running the prepared statement
    catch(PDOException $e)
    {
        echo $e->getMessage();
    }
?>