$(document).ready(function(){

    let editar = false;
    //verificando que jquery este cargado
    $(function(){
        console.log('jquery is ok');
        $('#people-result').hide();
        fetchPersonas();
    })
    
    //capturando lo que el usuario ingresa
    $('#search').keyup(function(e){
        if($('#search').val()){ //validacion si hay algo, entonces realiza la busqueda
            let search = $('#search').val();
            $.ajax({
                url: 'personas-search.php',
                type: 'POST',
                data: {search},
                success: function(response){
                    let personas = JSON.parse(response);
                    let template = '';

                    personas.forEach(persona => {
                        template +=`<li>
                            ${persona.name}
                        </li>`                        
                    });

                    $('#container').html(template);
                    $('#people-result').show();//muestra los datos 
    
                }
    
            })
        }
    })

    //formulario para enviar datos al servidor
    $('#table-persona').submit(function (e){ 
        let url = editar === false ? 'personas-add.php' : 'personas-edit.php';
        const postData = {
            idPers: $('#idPers').val(),
            nombres: $('#nombres').val(),
            apellidos: $('#apellidos').val(),
            direccion: $('#direccion').val(),
            email: $('#email').val(),
            telefono: $('#telefono').val(),
        }

        $.post(url, postData, function(response){
            console.log(response);
            fetchPersonas();    
            $('#table-persona').trigger('reset');
            editar=false;
        });
        e.preventDefault(); //elimina el comportamiento por defecto
    });
    
    //actualiza en tiempo real la tabla
    function fetchPersonas(){
        $.ajax({
            url: 'personas-list.php',
            type: 'GET',
            success: function(response){
                let template='';
                let personas = JSON.parse(response);
                personas.forEach(persona => {
                        template += `
                            <tr personId="${persona.idPerson}">
                                <td>${persona.idPerson}</td>
                                <td>${persona.name}</td>
                                <td>${persona.lname}</td>
                                <td>${persona.address}</td>
                                <td>${persona.email}</td>
                                <td>${persona.phone}</td>
                                <td>
                                <button id="btnEditar" class="update-persona btn btn-primary">Editar</button>
                                </td>
                                <td>
                                <button class="delete-persona btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        `                
                });
                $('#tPersonas').html(template);
                $('#submit').text('Guardar');
            }    
        });         
    }

    //Boton para eliminar un registro
    $(document).on('click','.delete-persona', function(){

        if(confirm('¿Esta seguro de querer eliminar el registro?')){
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('personId');
            $.post('personas-delete.php',{id},function(response){
               // console.log(response);
                fetchPersonas();
            })
        }
    });


    //llena los datos en el formulario
    $(document).on('click','.update-persona', function(){

            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('personId');
            $.post('personas-single.php',{id},function(response){
                const per = JSON.parse(response);
                $('#idPers').val(per.idPerson),
                $('#nombres').val(per.name),
                $('#apellidos').val(per.lname),
                $('#direccion').val(per.address),
                $('#email').val(per.email),
                $('#telefono').val(per.phone)
                editar=true;
            })
            if(editar!=false){
                $('#submit').text('Guardar');    
            }else{
                $('#submit').text('actualizar');    
            }
    

    });


});

