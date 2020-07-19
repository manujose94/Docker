var net = require('net')
var fs = require('fs')
var votos = [ ]
var total_votos=[]
var args = process.argv.slice(2);
var numFiles=0;
var server = net.createServer(function(c) {
  c.on('data', function(data){
    var json = JSON.parse(data);
    //{provincia:madrid, colegio:chamberi_14 , pp:3500, psoe:2000, up:3000, cs:1500}
    // --------------> Transformar e ir acumulando en :
    //votos[‘madrid’] = {pp:9500, psoe:8000, up:6000, cs:4000}
    //var a =["sevilla":{"pp":0,"cu":5},"valen":  {"pp":100,"cu":200},"madrid":{pp:9500, psoe:8000, up:6000, cs:4000}]
    var provjson =json.provincia;
    //Eliminamos los elementos provincia y colegio
    delete json.provincia
    delete json.colegio
    console.log(json);
    console.log('------------>>'+provjson);
    //console.log(votos[provjson]);
    if(!votos[provjson])votos[provjson]=json;
    else{
      for( partit in json)// pp - psoe -ciu
          if(!votos[provjson][partit])votos[provjson][partit]=json[partit];
          else votos[provjson][partit]=votos[provjson][partit]+json[partit];
    }
    console.log(votos[provjson]);
    console.log("FINAL: ");
    for( prov in votos){
      console.log(prov+"!!!!");
      for(partit in votos[prov])
          console.log("-"+partit+":"+votos[prov][partit]);
    }

    c.end("Votacio OK");
  })
})
server.listen(9000,
  function() { console.log('server bound')
})
function guardar() {
  for(prov in votos){
    var json = JSON.stringify(votos[prov])
      fs.writeFileSync(prov+".txt",json)
  }
  console.log('datos volcados a disco')
}

//setInterval(guardar, 20000)
start(args[0]);
function start(x) {
    if(!x)return
    listarFicheros();
}


function listarFicheros(){
//Lectura de tots els fitxers del direvtori actual
fs.readdir(".", (err, files) => {
  if(err){console.log(dir+" Not Found");return;}
  numFiles=files.length;
  files.forEach(file => {
    llegirf(file);
  });
})
}

function llegirf(f){
  fs.readFile(f, 'utf8', function (err,data) {
  --numFiles; //Un ficher menys que espera a ser llegit
  if (err){/**menu(f,"");**/return}
  if(f.slice(-4)==".txt"){ //recorta los 4 ultimos caracteres
    var prov=f.slice(0,-4);
    var json = JSON.parse(data)
    votos[prov]=json;
      for(partit in votos[prov])
        if(!total_votos[partit])total_votos[partit]=votos[prov][partit]
        else total_votos[partit]+=votos[prov][partit]
        //m(total_votos)
  }

  if(numFiles==0) {
    console.log(total_votos);
    menu("",total_votos);}

    /**for(prov in votos)
      console.log(prov);
      for(partit in votos[prov])
        console.log("::"+"- "+partit+":"+votos[prov][partit]);**/
});
}
//function m(v){ if(!v)console.log("Nada");else console.log("Votos:"+total_votos.toString());}

function menu(err,res) {
  if (err) console.log("Error con: "+err);
  else{
    console.log("Resultados Globales");
    console.log("Votos:",total_votos);
    console.log("\n\nProvincia: ")
    process.stdin.on("data",function(str){
      var textChunk = str.toString('utf8');
      var prov = textChunk.slice(0,str.length-1);
      var res = JSON.stringify(votos[prov])
      console.log(votos[prov])
      if(res)console.log(res)
      console.log("\nProvincia: "+votos["Madrid"].toString()+" ",votos)

    });
  }
}




/**
> t
{ b: { madrid: { pp: 9500, psoe: 8000, up: 6000, cs: 4000 } },
  c: { valen: { pp: 9500, psoe: 8000, up: 6000, cs: 4000 } },
  d: { sevilla: { pp: 9500, psoe: 8000, up: 6000, cs: 4000 } } }
> t["madrid"]
undefined
> t["b"]
{ madrid: { pp: 9500, psoe: 8000, up: 6000, cs: 4000 } }
> t["b"]["madrid"]
{ pp: 9500, psoe: 8000, up: 6000, cs: 4000 }
> t["b"]["madrid"]["psoe"]
8000
>**/
