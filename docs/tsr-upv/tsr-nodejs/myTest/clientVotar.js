var net = require('net');
var os = require('os');


function entrada( ip , port,msg) {
	if(!ip || !port ) console.log("Faltan Argumentos");
	else{
	console.log("Conectando: "+ip+":"+port)
		var client =  net.connect ({ port :port,host:ip},
		function(){ //connect listener
			console.log('client connected');
			client.write(msg);
		});

		client.on('data',
		function(data){
			console.log("	Recepcio del server: \n"+"	->"+data.toString());
		});
		client.on('end',
		 function() {
			console.log('client disconnected');
		 });
	}
}


var msg = JSON.stringify (
{provincia:"Sevilla", colegio:"chamberi_14" , pp:3500, psoe:2000, up:3000, cs:1500});
//Terminal node netClientLoad.js
//entrada( "127.0.0.1" , 9000 , msg)


var arr = ['elem1','elem2','elem3','elem4','elem5'];
var key ;
process.stdin.setRawMode(true);
process.stdin.on('readable', function () {
	if(String(process.stdin.read()==".")showArrEl (key);
	if(!key)key=String(process.stdin.read());
   else key+= String(process.stdin.read());
  //showArrEl(key);
});

function showArrEl (key) {
	console.log(key);
  //console.log(arr[key]);
}
