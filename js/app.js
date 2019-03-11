$( document ).ready(function() {
    'use strict'
    //funcion para animar MATCH
    var animacionMatch = function(){
    };
    //inicializar el programa
    animacionMatch();
    $(".btn-reinicio").click(function (e) { 
        e.preventDefault();
        $('#timer').timer({
            countdown: true,
            duration: '2m'	
        });
    });
});