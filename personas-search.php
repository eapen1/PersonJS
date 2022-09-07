<?php 
require("conexion.php");

if(isset($_POST['search'])){ //verifica si existe

    $search = $_POST['search'];

    if(!empty($search)){
        $conexion = conectar();
        $sql="SELECT * FROM people WHERE name LIKE '%$search%'";
        $query = $conexion->prepare($sql);
        $query->execute();
        $resultsJson = json_encode($query->fetchAll(PDO::FETCH_OBJ));

        if(!$resultsJson){
            die('Query Error');
        }else{
            echo $resultsJson;
        }
    }

}else{
    $search=null;
    echo "por favor enviar algo para buscar";
}


?>