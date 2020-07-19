var http = require('http');
var url = require('url');
var qs = require('querystring');
var path=require('path');
var fs = require('fs');
function dd(i) {return (i<10?"0":"")+i;}

function printTimer(x){
  var d = new Date();
  console.log('alguien ha accedido a las '+
              d.getHours() +":"+
              dd(d.getMinutes()) +":"+
              dd(d.getSeconds()));
  console.log("INFO= "+x);
}
function time(){
  var d = new Date();
  return  d.toLocaleString()
}
function printTimer(){
  var d = new Date();
  console.log('alguien ha accedido a las '+
              d.getHours() +":"+
              dd(d.getMinutes()) +":"+
              dd(d.getSeconds()));
}
function printDir(r){
  var p = path.join(__dirname, r.url)
  var dir = p.split("?")[0] ; ///home/manel/Escritorio/
  return "Directorio Padre: "+dir+getFiles(dir);
}

function getFiles (dir, files_){
  var fs = require('fs');
 files_ = files_ || [];
 var files = fs.readdirSync(dir);
 for (var i in files){
   var name = dir + '/' + files[i];
   //Listado de forma iterativa
   /**if (fs.statSync(name).isDirectory()){
     getFiles(name, files_);
    } else {
      files_.push(name);
    }**/
    files_.push("\n--"+name);
  }
 return files_;
}
function checkFileExistsSync(filepath){
  var flag = true;
  try{
    fs.statSync(filepath);
  }catch(e){
    flag = false;
  }
  return flag;
}
function getFile(f){
  var inf="not acces file"
	/**
	El problema es que readFile es asincrónica, i per tant no hem d'esperar a la seua finalització, 
	sino que hem de incloure la resposta com a part del callback [Implemantacio den act5Asincrona.js]
	**/
    /** fs.readFile(f, 'utf8', function (err,data) {
      if (err){
        console.log(err);
        return "ERROR en "+f;
      }else{
        console.log(data.toString());
        return  data.toString();
      }
    });**/
    //De aquesta manera si que se espera a que llegixca el fitxer, sense dixar que altre cliente
	// faja una solicitud mentres a part esta obtenim la funcio el fitxer, i ja avisara amb un callback,
	// Aixana se pot continuar funcionan sense esperarlo
    inf = fs.readFileSync(f,'utf8').toString();
    return inf;
}
//http://localhost:1337?info=time
http.createServer( function(request,response) {
 //request.url = http://localhost:1337/?info=dir
 var query = url.parse(request.url).query;
 var info = qs.parse(query).info; //http://localhost?info=time
 printTimer(info);
 response.writeHead(200, {'Content-Type':'text/plain'});
 switch( info ) {
  case 'time':
     response.write(time());
     response.end('Value = ' + time());
  break;
  case 'dir':
  //response.write(request.url);//http://localhost?info=dir
  response.write(printDir(request));
  response.end('\n Value = ' + info);
  break;
  default:
    if(!checkFileExistsSync(info))
    response.write("FILE NOT EXIST");
    else {
      response.write(info+" FILE  EXIST \n");
      response.write(getFile(info));
    }
  response.end('\n Value = ' + info);
  break;
 }
}).listen('1337');
