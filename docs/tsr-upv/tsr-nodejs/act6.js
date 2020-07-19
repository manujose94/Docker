//node act6.js 10 /home/manel/Escritorio/Test/
var fs = require('fs');
var file;
var numFiles=0;
function entrada( num_ficheros , dir){
if(!num_ficheros || !dir ){console.log("Faltan Argumentos");return}
fs.readdir(dir, (err, files) => {
  numFiles=files.length;
  //console.log("Num:"+numFiles);
  files.forEach(file => {
    //console.log(file+"File Size in Bytes: "+file.length);
    llegirf(file,logMaxFile);
  });
})
}
function llegirf(f,callback){
  fs.readFile(f, 'utf8', function (err,data) {
  if (err) return console.log(err);
    if(!file)file=f;
    if(file.length<f.length)file=f;
    logMaxFile();
    //console.log(f.length);
    //console.log(tam);
});
  /**fs.readFile(f, function (err,data) {
      if (err){
        resp.writeHead(404, {'Content-Type': 'text/html'});
                resp.end('<H1>'+f+' not found</H1>')
      } else {
        resp.writeHead(200, {'Content-Type': 'text/plain'});
    console.log('data',data.toString())
   resp.write(data.toString())
                resp.end(data.toString())
      }
  })**/
}

function logMaxFile() {
   --numFiles;
  //console.log("numFiles: "+numFiles);
  if(numFiles==0)console.log("File: "+file+" size:"+file.length);
}
entrada( process.argv[2] , process.argv[3]);
