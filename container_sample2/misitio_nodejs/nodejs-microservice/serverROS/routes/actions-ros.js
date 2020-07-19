const express = require('express');
const router = express.Router();
const pool = require('../database');
const my_ros = require('../lib/ros-singleton');
var ROSLIB = require('roslib');
var colors = require('colors');
const qr = require('../database/querys_insert');
/**
 * ? Se suscribe y obtiene el mensaje una vez, luego se deconecta
 */
router.get('/starttestros/info', async (req, res) => {

    console.log("[/starttestros/getinfo]".green,{req});

    /**
     *  ? Primero se obtiene todos los topic del test
     */
    let {model_id, test_id , type}= req.query;

    topics=null;
   if(test_id && type=="topic"){
      let topic_of_test ='SELECT * FROM robotnikdb.topic t '+
      'INNER JOIN topic_test tt '+
      'ON tt.topic_id = t.id ' +
      'WHERE tt.test_id ='+test_id;
      topics= await pool.query(topic_of_test);
    }else res.send({ message: "Incorrect params", succes:false });
    let output,result;
  
    //ROS
    var singleton = my_ros.getInstance();
    /**
     * *Por ahora solo se suscribe a un topic
     */
    if(singleton.isConnected()){ // Ros esta conectado
        if(topics && topics.length>0){
          let{name, type_message} = topics[0];
        try{
         
            output = await onConnectTopic([name,type_message],singleton);
            result = {message:JSON.stringify(output), succes:true}  
          }catch(error){
            result = {message:JSON.stringify(error), succes:false}  
          }
        }
    }else result = {message:"Ros currently not connected", succes:false}  
      /**
     * ? Guardar resultado del test en test_ready
     */
   let out = await pool.query("SELECT name FROM robotnikdb.robot_model where id="+model_id)
    if(out.length<1)console.warn("To insert new test finished, it's need that model_id exist");
    let{name} = out[0];
    await qr.setInsertTest(test_id,result.succes,model_id,name)
    /**
     * ? Este tipo de obj creado se mantendra como plantilla estandard
     * ? { message:value (String, Object etc), succes:true or false }
     */
    res.send(result);
});




function onConnectTopic(topicArray,singleton) {
  return new Promise((resolve, reject) => {
    let obj_ros = new ROSLIB.Topic({
      ros : singleton.ros,
      name : topicArray[0],
      messageType : topicArray[1]
    });
    obj_ros.subscribe((m) => { 
      console.table(this);
      console.log("Resource from topic".blue,{m})
      
      if(one2)console.log(m.pose);
          one2=false;
      resolve(m);
      obj_ros.unsubscribe();
    });
  
  });

}

/**
function onConnectTopic(topicArray,singleton) {
   
    array_listeners.push( new ROSLIB.Topic({
        ros : singleton.ros,
        name : topicArray[0],
        messageType : topicArray[1]
    }))
    let name = topicArray[0];

      array_result.push({name:""})
      array_listeners[array_listeners.length-1].subscribe(function(m) { 
        console.log(this)
        console.log(m)
        console.log(this.name)
        if(one2)console.log(m.pose);
            one2=false;
      setTimeout(function(m){console.log("finish timeout",{m}) }, 3000);
    });

}
 */
module.exports = router;