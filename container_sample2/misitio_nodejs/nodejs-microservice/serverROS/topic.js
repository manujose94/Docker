var ROSLIB = require('roslib');
class Topic{
    constructor(name,type,id_model,type_message,pub_sub,rename) {
        this.name = name;
        this.type = type;
        this.id_model = id_model;
        this.type_message = type_message;
        this.pub_sub = pub_sub;
        this.rename = rename;
        this.object_roslib_topic=null;
    }

     start_topic(){
        console.log('Starting topic:',this.name)
    }
     
    
    set_object_roslib_topic(value){
         this.object_roslib_topic=new ROSLIB.Topic({
            ros : value,
            name : this.name,
            messageType : this.type
          }); 
    }

}
module.exports = Topic;