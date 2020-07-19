
var ROSLIB = require('roslib');


var MySingleton = (function () {

    var INSTANCE;
    var tests = [];
    var myros={
      info: "ros from mysingleton", status:"disconnected" , version: "",
      status_detail :"" ,
      topics:{names:[],types:[]},optitrack: 
      {status:"disconnected", status_detail:"",type_message:["m.pose.orientation.x","m.pose.orientation.y","m.pose.orientation.z"]}
  
  };
  var machine = { linux_version:"", ros_version:""}
    
   // var eventEmitter = new EventEmitter();
    
   function MySingleton(arguments) {
      this.arguments=arguments;
      if (!(this instanceof MySingleton)) {
        return new MySingleton(arguments);
      }
      if(arguments) this.ros = new ROSLIB.Ros({url : arguments});
      else this.ros = new ROSLIB.Ros({url : 'ws://localhost:9090'});
    
      
      this.ros.on('error', function(error) {
        console.log(" [ROS] ERROR".red)
        myros.status="error";
       // myros.status_detail=error;
      });
      
     /**this.ros.on('connection', function(value) {
        console.log("[ROS] CONNECTED")  
        myros.status="connected"   
        myros.status_detail=value;
      });**/

      this.ros.on('close', function() {
        console.log("[ROS] CLOSE".yellow)
      });

      this.instance =createInstance();
      
    }

    
   
    MySingleton.prototype.myros =  function (){
     // console.log("[Singleton myros]",myros);
        return myros;
      };

      MySingleton.prototype.isConnected =  function (){
       
           return myros.status=="connected";
         };
    
      MySingleton.prototype.myFunction = function () {
        //do something;
        console.log(this,"myFunction")
      };
  
    // function for the creation of the SingletonClass class
    var createInstance = function() {

      // public methodes
      return {
          add : function(test) {
            if(typeof test === 'object')
              tests.push(sub);
              else console.log('It is not object')
          },
          addAll : function(all) {
            tests=all;
          },
          tests : function() {
              return tests;
          },
          myros : function(){
            return myros;
          },
          set_myros_status: (status,detail) =>{
            if(status)myros.status=status;  
            //if(detail)myros.status_detail=detail;
          },
          set_myros_topics: (list_topic) =>{
           // list_topic = { name:[nametopic1,nametopic2] types:[] }
            if(list_topic.topics && list_topic.types){
              myros.topics.names=list_topic.topics;
              myros.topics.types=list_topic.types;
            }
           
          },

          // params = { name:[nametopic1,nametopic2] types:[] }
          existOptitrack : (params)=> {
            if(params && myros.optitrack.status && params.topics != undefined){
              let result = params.topics.find( name => name.includes("vrpn_client_node")) // return first content
              console.log("[SINGELTON RESULT OTPITRACK]".zalgo,result!=undefined)
              myros.optitrack.status=result!=undefined?"connected":"disconnected";
            }else return myros.optitrack.status
            
          }
      }
  }
  
    return {
      init: function () {
        if (!INSTANCE) {
          return INSTANCE = MySingleton.apply(null, arguments);
        }
        return INSTANCE;
      },
      getInstance: function () {
        if (!INSTANCE) {
          console.log("[NEW INSTANCE]".green)
          return this.init.apply(this, arguments)
          
        }else console.log("[EXIST INSTANCE]".blue)
        return INSTANCE;
      },
      getROS_Instance(){
        return INSTANCE.ros;
      }
    };
  }());
 
  module.exports=MySingleton;