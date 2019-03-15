$( document ).ready(function() {
    'use strict'
    var contadorFilas = 0;
    var cantidadFaltanteCaramelosFila = [];
    //funcion para animar MATCH
    var animacionMatch = function(){
        $('.main-titulo').animate({color: '#DCFF0E'}, 300, function () {
            $('.main-titulo').animate({color: 'white'}, 300, animacionMatch());
              }
        )
    };
    //funcion para llenar de caramelos el tablero
    var inicioDeTablero = function(){
        contadorFilas = 0;
        setInterval(function(){inicioDeTableroAux();}, 200);
    };
    var inicioDeTableroAux = function () {
        if(contadorFilas < 7){
            for(var jj = 1; jj <= 7 ; jj++){
                var identificadorImagen = Math.floor((Math.random() * 4) + 1);
                $('.col-'+jj).append('<img class="imagen'+identificadorImagen+'" data-validar="noRepetido" style="height: calc(680px/7);" src="/image/'+identificadorImagen+'.png">');
            }
            contadorFilas++;
        }
    }
    //funcion para buscar y eliminar si hay 3 o mas seguidos de un mismo
    var buscarCoincidencias = function(){
        detectarCadenaVertical();
        detectarCadenaHorizontal();
        detectarElesVertical();
        detectarElesHorizontal();
        //imprimir(1);
        eliminarCadenas();
        setTimeout(function(){rellenarVacios();} ,700);
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
    var imprimir = function (x) {
        console.log(x+'--------------------------------------------------------------------------------------------');        
        for(var jj = 1; jj <= 7 ; jj++){
            console.log('-----------------COL'+jj+'----------------------');
            for(var ii = 0; ii < 7 ; ii++){
                console.log($('.col-'+jj+' img:eq('+ii+')'),$('.col-'+jj+' img:eq('+ii+')').attr('data-validar'));
            };
        };
    };
    var eliminarCadenas = function(){
        for(var jj = 1; jj <= 7 ; jj++){
            for(var ii = 0; ii < 7 ; ii++){
                if($('.col-'+jj+' img:eq('+ii+')').attr('data-validar') == 'repetido'){
                    $('.col-'+jj+' img:eq('+ii+')').hide("pulsate",600,function(){$(this).remove();});
                };
            };
        };
    };
    var rellenarVacios = function(){
        for(var jj = 0; jj < 7 ; jj++){
                cantidadFaltanteCaramelosFila[jj] = 7-$('.col-'+(jj+1)).children().length;
                //console.log(cantidadFaltanteCaramelosFila);
        };
        setInterval(function(){rellenarVaciosAux();},200);
    };
    var rellenarVaciosAux = function(){
      
        for (var jj = 0; jj < 7; jj++){
            if (cantidadFaltanteCaramelosFila[jj] >0){
            //    console.log(cantidadFaltanteCaramelosFila[jj],'anadir');
                var identificadorImagen = Math.floor((Math.random() * 4) + 1);
                $('.col-'+(jj+1)).prepend('<img class="imagen'+identificadorImagen+'" style="height: calc(680px/7);" src="/image/'+identificadorImagen+'.png">');
                cantidadFaltanteCaramelosFila[jj]--;
            };
        };
        resetearRepetidos();
    };
    var resetearRepetidos = function(){
        for(var jj = 1; jj <= 7 ; jj++){
            for(var ii = 0; ii < 7 ; ii++){
                $('.col-'+jj+' img:eq('+ii+')'),$('.col-'+jj+' img:eq('+ii+')').attr('data-validar','noRepetido');
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
            setTimeout(sensarMovimientos,1500)
        });
    };
    var sensarMovimientos = function(){
        $('img').draggable({
            containment: '.panel-tablero',
            droppable: 'img',
            revert: true,
            revertDuration: 500,
            grid: [100, 100],
            zIndex: 10,
            drag: restingirMovimientos
        });
        $('img').droppable({
            drop: swapCandy
        });    
    }
    var restingirMovimientos = function(event, candyDrag) {
        candyDrag.position.top = Math.min(100, candyDrag.position.top);
        candyDrag.position.bottom = Math.min(100, candyDrag.position.bottom);
        candyDrag.position.left = Math.min(100, candyDrag.position.left);
        candyDrag.position.right = Math.min(100, candyDrag.position.right);
    }
    function swapCandy(event, candyDrag) {
        console.log(candyDrag, $(candyDrag.draggable).attr('src'), $(candyDrag.draggable).parent());
        
        var candyDrag = $(candyDrag.draggable);
        var dragSrc = candyDrag.attr('src');
        var candyDrop = $(this);
        var dropSrc = candyDrop.attr('src');
        var dragClass = candyDrag.attr('class');
        var dropClass = candyDrop.attr('class');
        candyDrag.attr('class', dropClass);
        candyDrop.attr('class', dragClass);
        candyDrag.attr('src', dropSrc);
        candyDrop.attr('src', dragSrc);
        setTimeout(function () {
            buscarCoincidencias();
        }, 800);
    
    }

    //inicializar el programa
    animacionMatch();
    inicioDeTablero();
    sensarBotonStart();
    //  sensarMovimientos();
    window.imprimir = function(){ imprimir()};
    window.rellenarVacios = function(){rellenarVacios()};
    window.buscarCoincidencias = function(){buscarCoincidencias()};
});
