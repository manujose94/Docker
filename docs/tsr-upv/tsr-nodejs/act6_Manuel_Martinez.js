//node act6.js 10 /home/manel/Escritorio/Test/
var fs = require('fs');
var file;
var numFiles=0;
function entrada( num_ficheros , dir){
if(!num_ficheros || !dir ){console.log("Faltan Argumentos");return}
//Lectura de tots els fitxers de una carpeta
fs.readdir(dir, (err, files) => {
  if(err){console.log(dir+" Not Found");return;}
  numFiles=files.length;
  files.forEach(file => {
    llegirf(file,logMaxFile);
  });
})
}
function llegirf(f,callback){
  fs.readFile(f, 'utf8', function (err,data) {
  --numFiles; //Un ficher menys que espera a ser llegit
  if (err)console.log("Fitxer "+f+"  descartat.")
  else{
    if(!file)file=f;
    if(file.length<f.length)file=f;
  }
  logMaxFile();
});
}

function logMaxFile() {
  //console.log("numFiles: "+numFiles);

  if(numFiles==0){
    if(!file){console.log("Cap fitxer amb el format correcte");return;}
    console.log("File: "+file+" size:"+file.length);
  }
}

          //Num de fichers   Directori
entrada( process.argv[2] , process.argv[3]); //Realment se ignora el Num de Fichers, llistarem tots els del Directori que li pasem
