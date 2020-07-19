var express = require("express"),
path = require('path'),
bodyParser = require("body-parser");
const Topic = require('./topic');
const Test = require('./test');
const MySingleton = require('./lib/ros-singleton');
const VersionSingleton = require('./lib/versions-singleton');
const morgan = require('morgan');
const  app = express();

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

  console.log(req);
  next();
});

//2. ROUTER
app.get('/', function (req, res) {
    res.send('Express(web framework) corriendo ahora con ROSLIBjs and Docker!');
});
app.use(require('./routes'));
app.use(require('./routes/index'));
//bd put a header to url
//? Code Page for DB Queries
app.use(require('./routes/links'));
//urls where server must do some action
//? Code Page for TEST Type=commands
app.use(require('./routes/actions'));
//urls where server must do some action ros
//? Code Page for TEST Type=topic
app.use(require('./routes/actions-ros'));
//urls where server must do some action
//? Code Page for TEST Type=python
app.use(require('./routes/action-launch'));
// Public
app.use(express.static(path.join(__dirname, 'public')));
// Connecting to ROS 

const singleton = MySingleton.getInstance();
  const version_singleton = VersionSingleton.getInstance();
  test1_init();
  async function test1_init() {
    await version_singleton.myCommands();
    console.log("[FIRST TEST VERSION]",version_singleton.instance.get_status())
  }
 
  
// Environment variables
//Setting up server ( process.env.PORT || 8080, fuction .... 
var server = app.listen( process.env.PORT  || 8080, process.env.HOST || '0.0.0.0', (err) => {
    if(err){
      console.error('Error starting  server', err);
      return;
    }
    let port = server.address().port;
    let address = server.address().address;
   
    console.log(`http://${address}:${port}/`);
 });

// Mejorar con https://www.sitepoint.com/get-url-parameters-with-javascript/
 app.get("/api/ros",function(req,res) {
  res.send(myros);
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

singleton.ros.on('connection', function(value) { //Listener que se activa si ros se ha connectdo
  console.log("[SERVER ROS] CONNECTED") 
  singleton.instance.set_myros_status("connected",value)
  getAsyncDataTopics()
    // Calling resolve in the Promise will get us here, to the first then(…)
    .then(function(result){ //Se no hay topics en la base de datos
        // Do stuff
       
        if(result){
          let exist = singleton.instance.existOptitrack(result);
          singleton.instance.set_myros_topics(result);
        }
        //usingItNow(myCallback)
    })
    // Calling reject in the Promise will get us here, to the catch(…)
    // Also if there is an error in any then(..) it will end up here
    .catch(function(error){
        // Handle error
        console.log("[SERVER] some error to get topics")
        console.log(error)
    })
});



 var myCallback = (err, data) => {
  if (err) throw err; // Check for the error and throw if it exists.
  console.log('got data: '+data); // Otherwise proceed as usual.
};

var usingItNow = (callback) => {
  callback(null, 'get it?'); // I dont want to throw an error, so I pass null for the error argument
};

//usingItNow(myCallback)

//Obejecto ejemplo, debe ser leido de la base de datos

//Estado del ros instanciado
//singleton.myros();
let topic = new Topic("/turtle1/pose","turtlesim/Pose","1","object:x:y:z","sub","Posicion");
topic.set_object_roslib_topic(singleton.ros)
//console.log("[TOPIC_ROS] ",topic_ros);

//Array por si hay mas de un topic
var list_topics =[topic];
let test = new Test(list_topics,"test1");
/**console.log("[TEST]: ", test.name);
console.log("[TOPIC]: ", topic.object_roslib_topic);
console.log("[COMPARE TOPICS]: ", topic.object_roslib_topic);**/

