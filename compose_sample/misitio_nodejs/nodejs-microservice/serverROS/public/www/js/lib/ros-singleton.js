var MySingleton = (function () {

    var INSTANCE;
    var ros;
    var subs = [];
   // var eventEmitter = new EventEmitter();
    
    function MySingleton(arguments) {
      this.arguments=arguments;
      if (!(this instanceof MySingleton)) {
        return new MySingleton(arguments);
      }
      if(arguments) this.ros = new ROSLIB.Ros({url : arguments});
      else this.ros = new ROSLIB.Ros({url : 'ws://localhost:9090'});
      this.ros.on('error', function(error) {
        console.log("[ROS] ERROR")
      
      });
      
      this.ros.on('connection', function(error) {
        console.log("[ROS] ERROR")
      
      });
      //this.subs=[];
     
      this.ros.on('close', function() {
        console.log("[ROS] CLOSE")
      });

      this.subs =createInstance();
      
    }

    

    MySingleton.prototype.listTopics = function () {
        //do something;
        
        /*return INSTANCE.ros.getTopics(function(array) {
            
            INSTANCE.subs.addAll(array);
            console.log("[INSTANCE subs] ",INSTANCE.subs.subs().topics);
            return INSTANCE.subs.subs().topics;
          });*/
      };
    
      MySingleton.prototype.myFunction = function () {
        //do something;
        console.log(this,"myFunction")
      };
    var one=true;
    var one2=true;

    MySingleton.prototype.connectSubs = function (name,type) {
      //do something;
      subs.push( new ROSLIB.Topic({
        ros : ros,
        name : name,
        messageType : type
      }))
      subs[subs.length-1].subscribe(function(m) { 
        var n = this.name.includes("turtle");
        if(n){
          if(m){
            if(one)console.log(m);
            one=false;
          }
        }else{
          var n = this.name.includes("vrpn_client_node");
          if(n){
            if(one2)console.log(m.pose);
            one2=false;           
          }
        }
    });
    };

    // function for the creation of the SingletonClass class
    var createInstance = function() {

      // public methodes
      return {
          add : function(sub) {
              subs.push(sub);
          },
          addAll : function(all) {
            subs=all;
          },
          subs : function() {
              return subs;
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
          console.log("[NEW INSTANCE]")
          return this.init.apply(this, arguments)
          
        }else console.log("[EXIST INSTANCE]")
        return INSTANCE;
      }
    };
  }());
 