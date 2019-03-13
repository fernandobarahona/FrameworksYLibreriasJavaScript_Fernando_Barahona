$( document ).ready(function() {
    'use strict'
    //funcion para animar MATCH
    var animacionMatch = function(){
        $('.main-titulo').animate({color: '#DCFF0E'}, 300, function () {
            $('.main-titulo').animate({color: 'white'}, 300, animacionMatch());
              }
        )
    };
    //funcion para llenar de caramelos el tablero
    var inicioDeTablero = function(){
        for(var jj = 1; jj <= 7 ; jj++){
            for(var ii = 0; ii < 7 ; ii++){
                var identificadorImagen = Math.floor((Math.random() * 4) + 1);
                $('.col-'+jj).append('<img class="imagen'+identificadorImagen+'" style="height: calc(680px/7);" src="/image/'+identificadorImagen+'.png">');
            }
        }
    };
    //funcion para buscar y eliminar si hay 3 o mas seguidos de un mismo
    var buscarCoincidencias = function(){
        detectarCadenaVertical();
        detectarCadenaHorizontal();
        detectarElesVertical();
        detectarElesHorizontal();
        eliminarCadenas();
        rellenarVacios();  
    };
    var rellenarVacios = function(){
        $('html').delay(1200).queue(function () {
            for(var jj = 1; jj <= 7 ; jj++){
                if($('.col-'+jj).children().length != 7){
                    var cantidadFaltante = 7-$('.col-'+jj).children().length;
                    console.log(cantidadFaltante);
                    for(var ii = 0; ii < cantidadFaltante; ii++){
                        var identificadorImagen = Math.floor((Math.random() * 4) + 1);
                        $('.col-'+jj).append('<img class="imagen'+identificadorImagen+'" style="height: calc(680px/7);" src="/image/'+identificadorImagen+'.png">');
                    }
                }
            };
            for(var jj = 1; jj <= 7 ; jj++){
                for(var ii = 0; ii < 7 ; ii++){
                    $('.col-'+jj+' img:eq('+ii+')'),$('.col-'+jj+' img:eq('+ii+')').attr('data-validar','No-repet');
                };
            };
        });

    };
    var detectarCadenaVertical = function(){
        for(var jj = 1; jj <= 7 ; jj++){
            for(var ii = 0; ii < (7-2) ; ii++){
                if($('.col-'+jj+' img:eq('+ii+')').attr('class') == $('.col-'+jj+' img:eq('+(ii+1)+')').attr('class')){
                    if($('.col-'+jj+' img:eq('+ii+')').attr('class') == $('.col-'+jj+' img:eq('+(ii+2)+')').attr('class')){
                        $('.col-'+jj+' img:eq('+ii+')').attr('data-validar','repetido');
                        $('.col-'+jj+' img:eq('+(ii+1)+')').attr('data-validar','repetido');
                        $('.col-'+jj+' img:eq('+(ii+2)+')').attr('data-validar','repetido');
                    };
                };
            }
        }
    };
    var detectarCadenaHorizontal = function(){
        for(var jj = 1; jj <= (7-2) ; jj++){
            for(var ii = 0; ii < 7 ; ii++){
                if($('.col-'+jj+' img:eq('+ii+')').attr('class') == $('.col-'+(jj+1)+' img:eq('+ii+')').attr('class')){
                    if($('.col-'+jj+' img:eq('+ii+')').attr('class') == $('.col-'+(jj+2)+' img:eq('+ii+')').attr('class')){
                        $('.col-'+jj+' img:eq('+ii+')').attr('data-validar','repetido');
                        $('.col-'+(jj+1)+' img:eq('+ii+')').attr('data-validar','repetido');
                        $('.col-'+(jj+2)+' img:eq('+ii+')').attr('data-validar','repetido');
                    };
                };
            }
        }
    };
    var detectarElesVertical = function(){
        for(var jj = 1; jj <= 7 ; jj++){
            for(var ii = 0; ii < (7-1) ; ii++){
                if($('.col-'+jj+' img:eq('+ii+')').attr('data-validar') == 'repetido' &&
                $('.col-'+jj+' img:eq('+ii+')').attr('class') == $('.col-'+jj+' img:eq('+(ii+1)+')').attr('class')){
                    $('.col-'+jj+' img:eq('+(ii+1)+')').attr('data-validar','repetido');
                }
            };
        };
    };
    var detectarElesHorizontal = function(){
        for(var jj = 1; jj <= (7-1) ; jj++){
            for(var ii = 0; ii < 7 ; ii++){
                if($('.col-'+jj+' img:eq('+ii+')').attr('data-validar') == 'repetido' &&
                $('.col-'+jj+' img:eq('+ii+')').attr('class') == $('.col-'+(jj+1)+' img:eq('+ii+')').attr('class')){
                    $('.col-'+(jj+1)+' img:eq('+ii+')').attr('data-validar','repetido');
                }
            };
        };
    };
    var eliminarCadenas = function(){
        for(var jj = 1; jj <= 7 ; jj++){
            for(var ii = 0; ii < 7 ; ii++){
                console.log($('.col-'+jj+' img:eq('+ii+')'),$('.col-'+jj+' img:eq('+ii+')').attr('data-validar'));
                if($('.col-'+jj+' img:eq('+ii+')').attr('data-validar') == 'repetido'){
                    $('.col-'+jj+' img:eq('+ii+')').animate({backgroundColor: 'yellow'}).delay(650).queue(function() {$(this).remove();} );
                }
            };
        };
    };
    //funcion para empezar el juego al aplastar START
    var sensarBotonStart = function(){
        $(".btn-reinicio").click(function (e) {             
            $(this)[0].innerHTML = 'Reiniciar';
            e.preventDefault();
            $('#timer').timer({
                countdown: true,
                duration: '2m'	
            });
            buscarCoincidencias();
        });
    };
    //inicializar el programa
    animacionMatch();
    inicioDeTablero();
    sensarBotonStart();


});