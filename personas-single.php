<?php 
    require_once("conexion.php");
    if(isset($_POST['id'])){
        $conexion = conectar();
        $sql= $conexion->prepare("SELECT * FROM people WHERE idPerson = :id");
        $sql->bindParam(':id',$_POST['id']);
        $sql->execute();
        $resultsJson = json_encode($sql ->fetchAll(PDO::FETCH_OBJ)[0]);

        if(!$resultsJson){
            die('Query Error');
        }else{
            echo $resultsJson;
        }
    }

?>