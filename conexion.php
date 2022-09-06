<?php
    function conectar(){
        $user="root";
        $password="";
        try{
            $conexion = new PDO('mysql:host=localhost;dbname=people',$user,$password);
            $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //echo "Conexión realizada Satisfactoriamente";
        }catch(PDOException $e){

            echo "fallo la conexion". $e->getMessage();
        }

        return $conexion;

    }

        
?>