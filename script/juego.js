var juego = {
  filas:[[],[],[]],
  espacioVacio: {
  fila:2,
  columna:2
  },

  iniciar:function(elemento){
    console.log(this.filas);
    console.log(elemento);
    this.instalarPiezas(elemento);
    this.capturarTeclas();
    this.mezclarFichas(2);
  },

  crearPieza:function(numero, filas, columnas){
    var elemento = $('<div/>');
      elemento.addClass("pieza");
      elemento.css({
       backgroundImage:"url('piezas/"+numero+".jpg')",
       top: filas*200,
       left: columnas*200
    });
    var retorno = {
      nuevoElemento : elemento,
      filaInicial: filas,
      columnaInicial: columnas,
      numero: numero
    }
    return retorno;
  },

  moverFichaFilaColumna:function(ficha, fila, columna){
    ficha.nuevoElemento.animate({
    top: this.espacioVacio.fila*200,
    left: this.espacioVacio.columna*200,
    },50);
      this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
  },

  guardarEspacioVacio:function(fila, columna){
    this.filas [fila] [columna] = null;
    this.espacioVacio.fila=fila;
    this.espacioVacio.columna=columna;
  },

  intercambiarPosicionConEspacioVacio:function(fila, columna){
    var pieza= this.filas [fila] [columna];
    this.moverFichaFilaColumna(pieza,fila,columna);
    this.guardarEspacioVacio(fila,columna);
  },

  instalarPiezas:function(elemento){
    var numero=1;
    for (var filas = 0; filas < 3; filas++) {
      for (var columnas = 0; columnas < 3; columnas++) {
      if (filas===this.espacioVacio.fila && columnas===this.espacioVacio.columna) {
        this.filas[filas][columnas]=null;
      }
      else{
        var derivada = this.crearPieza(numero, filas, columnas);
        elemento.append(derivada.nuevoElemento);
        this.filas[filas][columnas]=derivada;
        numero++; 
        }
      }
    }
  },

  moverHaciaAbajo:function(){
    console.log("Abajo");
    if (this.espacioVacio.fila-1>-1) {
    var filaOrigen = this.espacioVacio.fila-1;
    var columnaOrigen =this.espacioVacio.columna;
    this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);

    }
  },

  moverHaciaArriba:function(){
    console.log("Arriba");
    if (this.espacioVacio.fila+1<3) {
    var filaOrigen = this.espacioVacio.fila+1;
    var columnaOrigen =this.espacioVacio.columna;
    this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    }
  },

  moverHaciaLaDerecha:function(){
    console.log("Derecha");
    if (this.espacioVacio.columna-1>-1) {
    var filaOrigen = this.espacioVacio.fila;
    var columnaOrigen =this.espacioVacio.columna-1;
    this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);

    }
  },

  moverHaciaLaIzquierda:function(){
    console.log("izquierda");
    if (this.espacioVacio.columna+1<3) {
    var filaOrigen = this.espacioVacio.fila;
    var columnaOrigen =this.espacioVacio.columna+1;
    this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    }
  },

  chequearSiGano:function(){
    for (var fila = 0; fila <3; fila++) {
      for (var columna = 0; columna <3; columna ++){
        var ficha= this.filas [fila] [columna];
        if(ficha && !(fila===ficha.filaInicial && columna===ficha.columnaInicial)) {
          return false;
        }
      }
    }
    return swal("winiaste el juego ", "pudiste armar el pikachu", "success");
  },

  capturarTeclas:function(){
    var fn = function(evento){
    console.log(evento.which);
    switch(evento.which){
      case 38:
        this.moverHaciaArriba();
        break;
      case 39:
        this.moverHaciaLaDerecha();
        break;
      case 40:
        this.moverHaciaAbajo();
        break;
      case 37:
        this.moverHaciaLaIzquierda();
        break;
      default:
        return false;
        break;
      }
    this.chequearSiGano();
    }
   $(document).keyup(fn.bind(this));
  },

  mezclarFichas:function(veces){
    if(veces < 0){return};

    var aleatorio= ["moverHaciaAbajo", "moverHaciaArriba", "moverHaciaLaIzquierda", "moverHaciaLaDerecha"];
    //for (var i = 0; i < veces; i++) {
      var random= Math.floor((Math.random()*4));
      var funcionEjecutar=aleatorio[random];
      this[funcionEjecutar]();
    //}
    var that = this;
    setTimeout(function(){
      veces--;
      that.mezclarFichas(veces);
    },5)

  }

}

$(document).ready(function(){
	juego.iniciar($("#juego"));

});