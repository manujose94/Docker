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
/**function getFile(f,resp){
  var inf="not acces file"
   console.log('request',f)
   fs.readFile(f, function (err,data) {
       if (err){
         resp.writeHead(404, {'Content-Type': 'text/html'});
                 resp.end('<H1>'+f+' not found</H1>')
       } else {
         resp.writeHead(200, {'Content-Type': 'text/plain'});
		 console.log('data',data.toString())
		resp.write(data.toString()) 
                 resp.end(data.toString())        
       }
   })
    return inf;
}**/


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
	/**
	*El problema es que readFile es asincrónica, i per tant no hem d'esperar a la seua 
	*finalització, sino que hem de incloure la resposta com a part del callback
	*-> no retorna el text que després afegim a la resposta, sino que dirèctament genera la resposta
	**/

	fs.readFile(info, function (err,data) {
	       if (err){
		 response.writeHead(404, {'Content-Type': 'text/html'});
		         response.end('<H1>'+info+' not found</H1>')
	       } else {
		 response.writeHead(200, {'Content-Type': 'text/plain'});
			console.log('data',data.toString())
		        response.end(data.toString())        
	       }
	   })
      //response.write(info+" FILE  EXIST \n");
      //response.write(getFile(info,response));
    }
 
  break;
 }
}).listen('1337');
