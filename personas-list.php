<?php 
require("conexion.php");

    $conexion = conectar();
    $sql="SELECT * FROM people";
    $query = $conexion->prepare($sql);
    $query->execute();
    $resultsJson = json_encode($query->fetchAll(PDO::FETCH_OBJ));

    if(!$resultsJson){
        die('Query Error');
    }else{
        echo $resultsJson;
    }


?>