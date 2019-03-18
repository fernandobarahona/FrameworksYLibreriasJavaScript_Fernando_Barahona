$(document).ready(function(){
    var columnas = $('div[class^="col"]');
    var cantidadDeMovimientos = 0;
    var puntaje = 0;
    var juegoIniciado = false;
// funcion para animar el letrero MATCH
    var animacionMatch = function(){
        $('.main-titulo').animate({color: '#DCFF0E'}, 300, function () {
            $('.main-titulo').animate({color: 'white'}, 300, animacionMatch());
            }
        )
    };
// funcion para anadir los caramelos en el tablero. Es dependiente de cuantos
// casilleros estan vacios, por lo que sirve para el inicio y para rellenar.    
    var llenarTablero = function(){
        var intervaloLlenado;
        var contadorLlenado = 0;
        intervaloLlenado = setInterval(function(){
            columnas.each(function () {
                var caramelosQueTieneLaColumna = $(this).children().length;
                var caramelosAAgregar = 7 - caramelosQueTieneLaColumna;
                if (caramelosAAgregar != 0){
                    tipoDeCaramelo = Math.floor((Math.random() * 4) + 1);
                    //FAVOR ANADIR / ANTES DE img EN LA RUTA SI NO LE FUNCIONA
                    $(this).prepend('<img data-tipoCaramelo="imagen'+tipoDeCaramelo+'" data-validar="noRepetido" style="height: calc(680px/7);" src="image/'+tipoDeCaramelo+'.png">');       
                }
            })
            if(contadorLlenado<6){contadorLlenado++;}
            else{clearInterval(intervaloLlenado);contadorLlenado = 0}
        },300);
        
    };
// llama a las 4 funciones detectar, asidetecta si hay repetidos tanto vertical como horizontal y si hay algun aledano tb.
// luego llama a eliminarCadenas que borra los repetidos y rellena despues de 80ms 
    var buscarCoincidencias = function(){
        detectarCadenaVertical();
        detectarCadenaHorizontal();
        detectarElesVertical();
        detectarElesHorizontal();
        //imprimir(1);
        eliminarCadenas();
        setTimeout(function(){
            llenarTablero();
        },80);
    };
//cuatro funciones que detectan los repetidos
    var detectarCadenaVertical = function(){
        for(var jj = 1; jj <= 7 ; jj++){
            for(var ii = 0; ii < (7-2) ; ii++){
                if($('.col-'+jj+' img:eq('+ii+')').attr('data-tipoCaramelo') == $('.col-'+jj+' img:eq('+(ii+1)+')').attr('data-tipoCaramelo')){
                    if($('.col-'+jj+' img:eq('+ii+')').attr('data-tipoCaramelo') == $('.col-'+jj+' img:eq('+(ii+2)+')').attr('data-tipoCaramelo')){
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
                if($('.col-'+jj+' img:eq('+ii+')').attr('data-tipoCaramelo') == $('.col-'+(jj+1)+' img:eq('+ii+')').attr('data-tipoCaramelo')){
                    if($('.col-'+jj+' img:eq('+ii+')').attr('data-tipoCaramelo') == $('.col-'+(jj+2)+' img:eq('+ii+')').attr('data-tipoCaramelo')){
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
                $('.col-'+jj+' img:eq('+ii+')').attr('data-tipoCaramelo') == $('.col-'+jj+' img:eq('+(ii+1)+')').attr('data-tipoCaramelo')){
                    $('.col-'+jj+' img:eq('+(ii+1)+')').attr('data-validar','repetido');
                }
            };
        };
    };
    var detectarElesHorizontal = function(){
        for(var jj = 1; jj <= (7-1) ; jj++){
            for(var ii = 0; ii < 7 ; ii++){
                if($('.col-'+jj+' img:eq('+ii+')').attr('data-validar') == 'repetido' &&
                $('.col-'+jj+' img:eq('+ii+')').attr('data-tipoCaramelo') == $('.col-'+(jj+1)+' img:eq('+ii+')').attr('data-tipoCaramelo')){
                    $('.col-'+(jj+1)+' img:eq('+ii+')').attr('data-validar','repetido');
                }
            };
        };
    };
//funcion auxiliar para depurar que imprime todos los caramelos 
    var imprimir = function (x) {
        console.log(x+'--------------------------------------------------------------------------------------------');        
        for(var jj = 1; jj <= 7 ; jj++){
            console.log('-----------------COL'+jj+'----------------------');
            for(var ii = 0; ii < 7 ; ii++){
                console.log($('.col-'+jj+' img:eq('+ii+')').attr('data-tipoCaramelo'),$('.col-'+jj+' img:eq('+ii+')').attr('data-validar'));
            };
        };
    };
//funcion que borra los caramelos que tienen data-calidar == 'repetido
//tambien anade puntaje al borrar
    var eliminarCadenas = function(){
        for(var jj = 1; jj <= 7 ; jj++){
            for(var ii = 0; ii < 7 ; ii++){
                if($('.col-'+jj+' img:eq('+ii+')').attr('data-validar') == 'repetido'){
                    $('.col-'+jj+' img:eq('+ii+')').hide("pulsate",600,function(){$(this).remove();});
                    puntaje += 10;
                    $('.score span[class="data-info"]').html(puntaje);
                };
            };
        };
    };
//funcion para cuando se aplasta el boton iniciar. Llama al timer y tengo la funcion callback para cuando se acaba
//llame a hide() con el tablero y agrando panel-score. Busco las coincidencias iniciales y empiezo a sensar los 
//movimientos draggable de la funcion sensarMovimientos. En caso de ya haber dado click una vez, reseteo la pagina
    var sensarBotonIniciar = function(){
        
            $(".btn-reinicio").click(function (e) { 
                if (juegoIniciado == false){            
                    $(this)[0].innerHTML = 'Reiniciar';
                    $('#timer').timer({
                        countdown: true,
                        duration: '2m',
                        callback: function () {
                            $('.panel-tablero').hide("size", function () {
                                $('.panel-score').animate({width: "100%"}, 300);
                              });
                          }	
                    });
                    buscarCoincidencias();
                    setInterval(function(){sensarMovimientos()},200);
                    juegoIniciado = true;
                }
                else{
                    console.log('ola');
                    location.reload();
                }
            });
    };
//usando draggable y droppable de jqueryUI hago a todas las imagenes movibles
//llamo desde drag a restringirMovimientos, que limita left y top de cada elemento
//y llamo desde drop a swapCandy
    var sensarMovimientos = function(){
        $('img').draggable({
            //containment: '.panel-tablero',
            droppable: 'img',
            revert: true,
            revertDuration: 500,
            grid: [102, 102],
            zIndex: 10,
            drag: restingirMovimientos
        });
        $('img').droppable({
            drop: swapCandy
        });    
    };
//funcion llamada desde drag para restringir a donde se puede hacer el drag
    var restingirMovimientos = function(event, candyDrag) {
        console.log('top',candyDrag.position.top,Math.min(100, candyDrag.position.top),Math.max(-100, candyDrag.position.top));
        candyDrag.position.top = Math.min(100, candyDrag.position.top);
        candyDrag.position.top = Math.max(-100, candyDrag.position.top);
        candyDrag.position.left = Math.min(100, candyDrag.position.left);
        candyDrag.position.left = Math.max(-100, candyDrag.position.left);
    };
//intercambio los valores del elemento draggable por los del elmento droppable activo incluido
//src para seleccionar otra imagen y data-tipocaramelo para el identificador
    function swapCandy(event, candyDrag) {
        cantidadDeMovimientos++;
        $('.moves span[class="data-info"]').html(cantidadDeMovimientos);
        var candyDrag = $(candyDrag.draggable);
        var dragSrc = candyDrag.attr('src');
        var candyDrop = $(this);
        var dropSrc = candyDrop.attr('src');
        var dragClass = candyDrag.attr('data-tipoCaramelo');
        var dropClass = candyDrop.attr('data-tipoCaramelo');
        candyDrag.attr('data-tipoCaramelo', dropClass);
        candyDrop.attr('data-tipoCaramelo', dragClass);
        candyDrag.attr('src', dropSrc);
        candyDrop.attr('src', dragSrc);
        setTimeout(function () {
            buscarCoincidencias();
        }, 100);
    };

//inializo el programa. Primero la animacion, luego lleno el tablero, y luego senso el boton de inicio. 
//Cuando el boton de inicio se de click el juego comienza con el reloj y el sensar movimientos
    animacionMatch();
    llenarTablero();
    sensarBotonIniciar();
//como esta funcion tiene la forma $(document).ready(function(){ ...} entonces para acceder desde consola
//a alguna funcion interna, necesito copiarla a window.
    window.sensarMovimientos = function(){sensarMovimientos();};
});