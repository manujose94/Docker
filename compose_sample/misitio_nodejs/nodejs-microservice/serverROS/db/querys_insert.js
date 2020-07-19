
const pool = require('./database');
var colors = require('colors');
var dateFormat = require('dateformat');

async function setInsertTest(test_id,result,model_id,model_name) {

    if(!test_id || !model_id || !model_name) return false;
    if(result==false || result==true)result=result==false?0:1;

     /**
     * ? Obtener fecha de inicio en el formato datetime
     */
    let init_date=dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"); //By default, DATETIME values range 

    let insert="INSERT INTO `robotnikdb`.`tests_ready` "+
    "(`init_date`, `end_date`, `finished`, `operario_id`, `test_id`, `qa_id`, `result`, `related_components`, `model_id`, `model_name`) "+
    "VALUES ('"+init_date+"', NOW(), '1', '1', '"+test_id+"', '1', '"+result+"', '', '"+model_id+"', '"+model_name+"')"
    console.log("[Query setInsertTest]".cyan,{insert})
    pool.query(insert);
    return true;
} 
exports.setInsertTest = setInsertTest;