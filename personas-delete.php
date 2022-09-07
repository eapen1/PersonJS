<?php 
    require("conexion.php");

    if(isset($_POST['id'])){

        $conexion = conectar();
        

        $sql = $conexion->prepare( "DELETE FROM people WHERE idPerson=:id");
        $sql->bindParam(':id',$_POST['id']);
        $id=$_POST['id'];
        $sql->execute();

        if(!$sql){
            die('Query Failed.');
        }else{
            echo "delete was sucefully";
        }
    }else{
        echo "Enviar el identificador para poder eliminar el registro";
    }
?>