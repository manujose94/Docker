var ev = require('events');
var emitter = new ev.EventEmitter;
var listEv = { uno:"uno", dos:"dos",tres:"tres"};
var contEv = { uno:0, dos:0,tres:0};
var sleep = 2000;

//Function contador
function print(x){
   ++contEv[x];
   console.log( "Listener actiu: " + contEv[x] + " esdeveniments de tipus "+listEv[x]);
  // console.log( "Event " + listEv[x] + " has happened  " + contEv[x] + " times." );
}
// Cada tres segundos. Sin argumentos
setInterval( function() {emitter.emit(listEv.uno)}, 3000 );
//var i para obtener su identificador
var i = setInterval( function() {emitter.emit(listEv.dos)}, sleep );

setInterval( function() {emitter.emit(listEv.tres)}, 10000 );

// Listener is registered on the event emitter.
emitter.on(listEv.uno, function() {print('uno')});

emitter.on(listEv.dos, function() {
        if(contEv.dos > contEv.uno) print('uno')
        else console.log("There are more events of type 1")
      });


emitter.on(listEv.tres, function() {
      print('tres')
      if(sleep<18000){
        clearInterval(i);
        sleep*=3; //se multiplica el valor de sleep*3
        i=setInterval( function() {emitter.emit(listEv.dos);}, sleep );
      }
});
