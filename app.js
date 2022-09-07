$(document).ready(function(){

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
        const postData = {
            nombres: $('#nombres').val(),
            apellidos: $('#apellidos').val(),
            direccion: $('#direccion').val(),
            email: $('#email').val(),
            telefono    : $('#telefono').val()
        };
        $.post('personas-add.php', postData, function(response){
            fetchPersonas();    
            $('#table-persona').trigger('reset');
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
                            <tr>
                                <td>${persona.idPerson}</td>
                                <td>${persona.name}</td>
                                <td>${persona.lname}</td>
                                <td>${persona.address}</td>
                                <td>${persona.email}</td>
                                <td>${persona.phone}</td>
                                <td>
                                    <button class="delete-persona btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        `                
                });
                $('#tPersonas').html(template);
            }    
        });         
    }

});

