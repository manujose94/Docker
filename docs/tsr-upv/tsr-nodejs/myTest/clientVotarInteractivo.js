var net = require('net');
var os = require('os');


function entrada( ip , port,msg) {
	if(!ip || !port ) console.log("Faltan Argumentos");
	else{
	console.log("Conectando: "+ip+":"+port+" "+msg)
		var client =  net.connect ({ port :port,host:ip},
		function(){ //connect listener
				//console.log('client connected');
				client.write(JSON.stringify(msg));
		});

		client.on('data',
		function(data){
			console.log("	Recepcio del server: \n"+"	->"+data.toString());
		});
		client.on('end',
		 function() {
			 recepOK();
			//console.log('client disconnected');
		 });
	}
}


var msg = JSON.stringify (
{provincia:"Sevilla", colegio:"chamberi_14" , pp:350, psoe:200, up:300, cs:150});
//Terminal node netClientLoad.js
//entrada( "127.0.0.1" , 9000 , msg)


console.log("\n\nProvincia: ")
process.stdin.on("data",function(str){
	var textChunk = str.toString('utf8');
	var prov = textChunk.slice(0,str.length-1);
	var res = JSON.parse(msg);
	if(prov)res.provincia=prov;else console.log("\nNOTHING")
	if(res){console.log(res)
	entrada("127.0.0.1",9000,res)
	}


});

function recepOK(){console.log("\nProvincia: ")}
