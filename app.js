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
                    $('#people-result').show();
    
                }
    
            })
        }
    })
});

