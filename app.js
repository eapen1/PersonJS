$(document).ready(function(){

    //verificando que jquery este cargado
    $(function(){
        console.log('jquery is ok');
        $('#people-result').hide();
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
        console.log('enviando');
        e.preventDefault(); //elimina el comportamiento pro defecto
        const postData = {
            name: $('#nombres').val(),
            lname: $('#apellidos').val(),
            address: $('#direccion').val(),
            email: $('#email').val(),
            phone: $('#telefono').val(),
        }
        console.log(postData);

    });


});

