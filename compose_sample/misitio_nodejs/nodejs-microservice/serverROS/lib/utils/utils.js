module.exports.generateJSONTranslation = function(translatetopic,model_name){
    /**
     * TABLE
     * {
       id: 8,
       origin: 'move_feedback',
       translate: '/move/feedback',
       id_robot_model: 3 },
       {
       id: 8,
       origin: 'move_feedback',
       translate: '/move/feedback',
       id_robot_model: 3 },
     */
    var out = {}
    if(!model_name)model_name="";
    for (const key in translatetopic) {  
        //console.log(`${key}: ${translatetopic[key]}`)
        let obj=translatetopic[key];
        var keys = Object.keys(obj);
        if(keys.length==4)out[obj[ keys[ 1 ] ]]=model_name+obj[ keys[ 2 ] ];
      }
      //console.log(out)
     return out;
}

