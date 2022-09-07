<?php 
require "conexion.php";

if(isset($_POST['nombres'])and isset($_POST['apellidos'])
and isset($_POST['direccion'])and isset($_POST['email'])and 
isset($_POST['telefono'])){

    $conexion = conectar();

    $sql = $conexion->prepare("INSERT INTO people (name, lname, address, email, phone) VALUES (:nombres,:apellidos,:direccion,:email,:telefono)");
    $sql->bindParam(':nombres', $_POST['nombres']);
    $sql->bindParam(':apellidos',$_POST['apellidos']);
    $sql->bindParam(':direccion',$_POST['direccion']);
    $sql->bindParam(':email',$_POST['email']);
    $sql->bindParam(':telefono',$_POST['telefono']);

    $nombres = $_POST['nombres'];
    $apellidos= $_POST['apellidos'];
    $direccion= $_POST['direccion'];
    $email= $_POST['email'];
    $telefono= $_POST['telefono'];
    $sql->execute();

    if(!$sql){
        die('Connection failed');
    }else{
        echo "Succesed, data was stored";   
    }
}else{
    echo "no se recibiio ningun dato";
}

?>