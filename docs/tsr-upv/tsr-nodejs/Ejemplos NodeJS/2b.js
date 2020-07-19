var ev = require('events');
var emitter = new ev.EventEmitter;
var e1 = "num1";
var e2 = "num2";
var e3 = "num3";
var contEvent = [ num1:0, num2:0 ,num3:0 ];

// Constructor for class Listener.
function Listener(n1,n2,n3) {
	this.num1 = 0;
	this.name1 = n1;
	this.num2 = 0;
	this.name2 = n2;
	this.num3 = 0;
	this.name3 = n3;
	this.time2= 2000;
}

Listener.prototype.event1 = function() {
	this.num1++;
	console.log( "Listener activo:" + this.num1 + " eventos de tipo "+this.name1 );
}

Listener.prototype.event2 = function(a) {
	if(!a)console.log( "Hay más eventos de tipo uno" );
	this.num2++;
	console.log( "Event dos.";
}

Listener.prototype.event3 = function() {
	this.num3++;
	console.log( "Evento tres.");
}

// A Listener object is created.
var lis = new Listener(e1,e2);

// Listener is registered on the event emitter.
emitter.on(e1, function() {lis.event1()});
emitter.on(e2, function(x) {lis.event2(x)});
emitter.on(e3, function(x) {lis.event3(x});

// There might be more than one listener for the same event.
emitter.on(e1, function() {});

// Auxiliary function for generating e2(read).
var counter=0;
function generateEvent2() {
	emitter.emit(e2,this.num1<this.num2);
}

// Generate the events periodically...
// First event generated every 3 seconds.
setInterval( function() {
	emitter.emit(e1);},
	3000 );

// Second event generated every 2 seconds.
setInterval( generateEvent2, 2000 );

// Finally third event generated every 10 seconds.
setInterval( generateEvent2, 10000 );
