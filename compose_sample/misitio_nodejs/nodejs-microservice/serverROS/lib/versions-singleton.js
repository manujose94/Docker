const util = require('util');

var VersionSingleton = (function () {
  var tests_finished = [];
  const exec = util.promisify(require('child_process').exec);
  var INSTANCE;
  var machine = { linux_version:"", linux_detail:"", ros_version:""}
   function VersionSingleton(arguments) {
      this.arguments=arguments;
      if (!(this instanceof VersionSingleton)) {
        return new VersionSingleton(arguments);
      }
      //The first time that it's initiated
      this.instance =createInstance();
    }

    /**
     *  
     *  TODO: metodo of singleton
     *  ASDA
     */

    VersionSingleton.prototype.myCommands = async () => {
        try {

        {   
            let { stdout, stderr } = await exec('lsb_release -a');
            machine.linux_version=stdout;
        }
        {
            let { stdout, stderr } = await exec('uname -a');
            machine.linux_detail=stdout;
        }
        {  
           let  { stdout, stderr } = await exec('rosversion -d');
            machine.ros_version=stdout;
        } 
            //if(stderr) machine.ros_version=stderr;
            
            return machine;
        }catch (err){
           console.error(err);
           return "Some error during test of commands in localhost"
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
          toStringMachine: () =>{

            return 'Linux version: '+ machine.linux_version +'\n'
                    +'Linux detail: '+ machine.linux_detail +'\n'+'\n'
                    +'ROS version: '+ machine.ros_version +'\n'

            
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
          
          return this.init.apply(this, arguments)
          
        }
        return INSTANCE;
      }
      
    };
  }());
 
  module.exports=VersionSingleton;