<?php
    require("conexion.php");

    $conexion =conectar();

    if(isset($_POST['idPers'])and isset($_POST['nombres'])and isset($_POST['apellidos'])and isset($_POST['direccion']) and isset($_POST['email'])and isset($_POST['telefono'])){
      
        $sql = $conexion->prepare("UPDATE people SET name=:nombres, lname=:apellidos, address=:direccion, email=:email, phone=:telefono WHERE idPerson=:idPers");
        $sql->bindParam(':nombres',$_POST['nombres']);
        $sql->bindParam(':apellidos',$_POST['apellidos']);
        $sql->bindParam(':direccion',$_POST['direccion']);
        $sql->bindParam(':email',$_POST['email']);
        $sql->bindParam(':telefono',$_POST['telefono']);
        $sql->bindParam(':idPers',$_POST['idPers']);
        
        $nombres = $_POST['nombres'];
        $apellidos = $_POST['apellidos'];
        $direccion = $_POST['direccion'];
        $email = $_POST['email'];
        $telefono = $_POST['telefono'];
        $idPers = $_POST['idPers']; 
          
        $sql->execute();

        if(!$sql){
            die('Error en la consulta');
        }else{
            echo "datos actualizados";
        }

    }else{
        echo "no se ha recibido ningun dato";
    }

  

?>