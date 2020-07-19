var express = require("express"),
path = require('path'),
bodyParser = require("body-parser");
const Topic = require('./topic');
const Test = require('./test');
const urls_get = require('./config/urls');
const VersionSingleton = require('./lib/versions-singleton');
const morgan = require('morgan');
const  app = express();


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.urlencoded({ extended: true }));
app.use(express.static( __dirname + '/public/www/'));
// Setting Base directory
app.use(bodyParser.json());
//CORS Middleware
app.use(morgan('dev'));
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// Global variables
app.use((req, res, next) => {
 // console.log(req);
  next();
});

//2. ROUTER
app.get('/api', function (req, res) {
    //res.send('Express(web framework) corriendo ahora con ROSLIBjs!');
    let header = '';
    let body = '<h2>Express(web framework) corriendo ahora con ROSLIBjs!</h2>';
    let list='<ul>'
    Object.keys(urls_get).forEach(key => {
      list = list+'<li>'+urls_get[key]+'</li>';
    });
    list=list+'</ul>'
    body=body+list

    var html= '<!DOCTYPE html>'
         + '<html><head>' + header + '</head><body>' + body + '</body></html>';

    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': html.length,
      'Expires': new Date().toUTCString()
    });
    res.end(html);
});
//app.use(require('./routes'));
app.use(require('./routes/index'));
//bd put a header to url
//? Code Page for DB Queries
app.use(require('./routes/links'));
//urls where server must do some action
//? Code Page for TEST Type=commands
app.use(require('./routes/actions'));

//urls where server must do some action
//? Code Page for TEST Type=python
app.use(require('./routes/action-launch'));
// Public
app.use(express.static(path.join(__dirname, 'public')));
// Connecting to ROS 


  const version_singleton = VersionSingleton.getInstance();

 
  
// Environment variables
//Setting up server ( process.env.PORT || 8080, fuction .... 
var server = app.listen( process.env.PORT  || 8080, process.env.HOST || '0.0.0.0', (err) => {
    if(err){
      console.error('Error starting  server', err);
      return;
    }
    let port = server.address().port;
    let address = server.address().address;
    console.log("[HOST URL]".green,`http://${address}:${port}/`);
    console.log("[HOST URL API]".cyan,`http://${address}:${port}/api`)
 });



 




//https://platzi.com/blog/que-es-y-como-funcionan-las-promesas-en-javascript/

/**function onConnectTopic(topicArray) {
    current_topic=topicArray[0]; //[0] name - [1] messageType
console.log(topicArray)
   new_listener = { ros : new ROSLIB.Topic({
        ros : ros,
        name : topicArray[0],
        messageType : topicArray[1]
      }) , value: "nothing" }
      new_listener.ros.subscribe(function(m) { 
       new_listener.value=m;

      //move(1, 0);
    });
      return true;
}**/


//Arranque => Init
//Promesa 
function getAsyncDataTopics(){ //Realizar al iniciar
  return new Promise(function(resolve, reject){
    singleton.ros.getTopics(function(result, error){ //OBTENER TOPICS
          if(error){
              reject(error);
          }
          else{
              resolve(result);
          }
      })
  });
}



