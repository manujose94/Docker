const util = require('util');

var VersionSingleton = (function () {
  var tests_finished = [];
  const exec = util.promisify(require('child_process').exec);

  var INSTANCE;

  var machine = { linux_version:"", linux_detail:"", ros_version:""}
    
   // var eventEmitter = new EventEmitter();
    
   function VersionSingleton(arguments) {
      this.arguments=arguments;
      if (!(this instanceof VersionSingleton)) {
        return new VersionSingleton(arguments);
      }
      //The first time that it's initiated
      this.instance =createInstance();
    
    
      
    }


    VersionSingleton.prototype.myCommands = async () => {
        try {

            let { stdout, stderr } = await exec('lsb_release -a');
            machine.linux_version=stdout;
           exec('uname -a', (err, stdout, stderr) => {
                if (err) {
                  //some err occurred
                  console.error(err)
                } else {
                 // the *entire* stdout and stderr (buffered)
                 console.log(`stdout: ${stdout}`);
                 machine.linux_detail=stdout;
                 
                 console.log(`stderr: ${stderr}`);
                 exec('rosversion -d', (err, stdout, stderr) => {
                    if (err) {
                      //some err occurred
                      console.error(err)
                    } else {
                     // the *entire* stdout and stderr (buffered)
                     console.log(`stdout: ${stdout}`);
                     machine.ros_version=stdout;
                    }
                  });
                }
              });

           

              console.log("[MACHINE]",machine)
              return machine;
            
        }catch (err){
           console.error(err);
        };
      };
    
    VersionSingleton.prototype.myFunction = function () {
        //do something;
        console.log(this,"myFunction")
      };
  
    // function for the creation of the SingletonClass class
    var createInstance = function() {

      // public methodes
      return {

          add_test_finished : (test)=> {
            if(typeof test === 'object')
            tests_finished.push(sub);
              else console.log('It is not object')
          },
          get_tests_finished : ()=> {
            return tests_finished;
          },
        linux_detail: (status) =>{

            machine.ros_version = status;
            
          },
          set_status_linux: (status) =>{
            machine.linux_version = status;
            
          },
          set_status_ros: (status) =>{

            machine.ros_version = status;
            
          },
          get_status: () =>{return machine}          
      }
  }
  
    return {
      init: function () {
        if (!INSTANCE) {
          return INSTANCE = VersionSingleton.apply(null, arguments);
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
 
  module.exports=VersionSingleton;