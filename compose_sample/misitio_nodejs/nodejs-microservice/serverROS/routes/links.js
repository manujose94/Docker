const express = require('express');
const router = express.Router();
const pool = require('../db/database');
//Check possible errors Errors +HttpStatus
const Errors = require('../lib/utils/errors'); // my collection of custom exceptions
const HttpStatus = require('http-status-codes');
const utils = require('../lib/utils/utils');

/**
 * Database information
 */
router.get('/bd/tables', async (req, res) => {
    let links = await pool.query('SHOW FULL TABLES');
    res.send(links);
});

/**
 * ? PARAM MODEL_NAME and MODEL_ID
 */
router.get('/bd/translatetopic', async (req, res) => {
    /**
     * If req.query is null, only show name topic wihout adding name node [NAME NODE]/robotnik_base_control/cmd_vel
     */
    const { model_name, model_id } = req.query;
    
    let result = await pool.query('SELECT * FROM translatetopic WHERE id_robot_model='+model_id);
    //console.log("translatetopic",{links})
    
    res.send(utils.generateJSONTranslation(result,model_name));
});


router.get('/bd/mytopics', async (req, res) => {
    let links = await pool.query('SELECT * FROM topic');
    res.send(links);
});

/** Get Robot unit */
router.get('/bd/robotunits', async (req, res) => {
    let links = await pool.query('SELECT * FROM robots_unit');
    res.send(links);
});

router.post('/bd/robotunits', async (req, res) => {
    if (req.body ==null) res.send({ message: "Error Insert without content" , succes: false})

    let {id,name,description,comment,robot_model_id,ip}=req.body;
 
    try {
           let set = ' INSERT INTO robots_unit '+
               '(id, name, comment,description,robot_model_id,ip)'+
           ' VALUES '+
               '( '+id+', "'+name+'", "'+comment+'",  "'+description+'", '+robot_model_id+',"'+ip+'")'+
           ' ON DUPLICATE KEY UPDATE '+
               'name = "'+name+'",'+
               'comment = "'+comment+'",'+
               'description =  "'+description+'",'+
               'robot_model_id = '+robot_model_id+','+
               'ip = "'+ip+'";'
        console.log("[POST]", {set})    
        let rows = await pool.query(set);
        // If it has been UPDATE affectedRows=2 else INSER affectedRows=1
        let {affectedRows} =rows;
            
        res.send({ message: name , succes: true});

    }catch (err) {
        console.log({err});
        if (err instanceof Errors.NotFound)
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message , succes: false}); // 404
       
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message , succes: false}); // 500

    }

});

router.post('/bd/robotmodels', async (req, res) => {
    if (req.body ==null) res.send({ message: "Error Insert without content" , succes: false})

    let {id,name,foto,description,supplier,username,password}=req.body;
 
    try {
           let set = ' INSERT INTO robot_model '+
               '(id, name, foto,description,supplier,username,password)'+
           ' VALUES '+
               '( '+id+', "'+name+'", "'+foto+'",  "'+description+'", "'+supplier+'","'+username+'","'+password+'")'+
           ' ON DUPLICATE KEY UPDATE '+
               'name = "'+name+'",'+
               'foto= "'+foto+'",'+
               'description =  "'+description+'",'+
               'supplier = "'+supplier+'",'+
               'username =  "'+username+'",'+
               'password = "'+password+'";'
        console.log("[POST]", {set})    
        let rows = await pool.query(set);
        // If it has been UPDATE affectedRows=2 else INSER affectedRows=1
        let {affectedRows} =rows;
            
        res.send({ message: name , succes: true});

    }catch (err) {
        console.log({err});
        if (err instanceof Errors.NotFound)
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message , succes: false}); // 404
       
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message , succes: false}); // 500

    }

});

/** Get Robot models */
router.get('/bd/robotmodels', async (req, res) => {
    let links = await pool.query('SELECT * FROM robot_model');   
    res.send(links);
});

/**Get Tests Ready */
router.get('/bd/testsready', async (req, res) => {
    let links = await pool.query('SELECT * FROM robotnikdb.tests_ready;');
    res.send(links);
});

router.get('/bd/testsready/moreinfo', async (req, res) => {
    let q = 'SELECT tr.*, t.name as test_name, t.type as test_type, o.name as operario_name FROM robotnikdb.tests_ready tr '+
    'INNER JOIN test t '+
    'ON t.id = tr.test_id '+
    'INNER JOIN operario o '+
    'ON o.id = tr.operario_id '
    let links = await pool.query(q);
    res.send(links);
});

router.get('/bd/testsready/moreinfolast', async (req, res) => {
  
    let q = 'SELECT tr.*, t.name as test_name, t.type as test_type, o.name as operario_name FROM robotnikdb.tests_ready tr '+
    'INNER JOIN test t '+
    'ON t.id = tr.test_id '+
    'INNER JOIN operario o '+
    'ON o.id = tr.operario_id ORDER BY tr.id DESC LIMIT 8'

    let q2 = 'SELECT * FROM ('+
    q+   
    ') sub '+
    'ORDER BY id DESC';
    let links = await pool.query(q2);
    res.send(links);
});


/** Get Robot units from id robot_model */
router.get('/bd/robotmodels/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let q = 'SELECT  * FROM robot_model WHERE robot_model_id = '+id+' order by name'
        let units= await pool.query(q)
        if (!units.length)
                throw new Errors.NotFound('robotmodel not found');
        res.send(units);
    }catch (err) {
        if (err instanceof Errors.NotFound)
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message , succes: false}); // 404
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message , succes: false}); // 500

    }
   
});

/**
 * Todo:  /bd/models utilizado para listar test con todos los datos necesarios
 */
router.get('/bd/models' , async (req, res) => {
    /**
     * ? Hace una consulta de todos los modelos y todos los test que contiene
     */
    try {
        let q = 'SELECT rm.id as model_id, rm.name as model_name, rm.description, rm.supplier, rm.username, rm.password, unit.name as unit_name, unit.ip ,'+ 
        't.id as test_id, t.name as test_name, t.description as test_description, t.type, t.comment as test_comment  '+
        'FROM robot_model rm '+
        'INNER JOIN robot_model_test m '+
        'ON m.robot_model_id=rm.id '+
        'inner join test t on m.tests_id = t.id '+
        'inner join robots_unit unit on rm.id = unit.robot_model_id;';
        
        let model_load = await pool.query(q);
        if (!model_load.length)
                throw new Errors.NotFound('Information models not found');
        res.send(model_load);
    }catch (err) {
        if (err instanceof Errors.NotFound)
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message , succes: false}); // 404
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message , succes: false}); // 500

    }

});

router.get('/bd/testmachine', async (req, res) => {
    /**
     * ? Hace una consulta de todos los test sin modelo robot
     */
    try {
        let q = 'SELECT  DISTINCT t.id as test_id, t.name as test_name, t.description test_description, t.type , t.comment as test_comment '+
        'FROM test t '+
        'WHERE t.id NOT IN (SELECT tests_id from robot_model_test)';
   
        let tests_not_robot = await pool.query(q);
        if (!tests_not_robot.length)
            throw new Errors.NotFound('Test without robots not found');    
        res.send(tests_not_robot);
    }catch (err) {
        if (err instanceof Errors.NotFound)
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message , succes: false}); // 404
           
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message , succes: false}); // 500
    }
});
/**
 * ? Here id is an id of specific test
 */
router.get('/commands/:id', async (req, res) => {
    const { id } = req.params;
    let commands= await pool.query('SELECT  com.name, com.order from commands com '+
    'WHERE com.test_id = '+id+' order by com.order;')
    res.send(commands);
});


router.get('/bd/qa', async (req, res) => {
    const links = await pool.query('SELECT * FROM qa');
    res.send(links);
});

/**
 *  todo: Todos los topics referente a id test
 *  ? id = ID del test
 */
router.get('/bd/topics/:id', async (req, res) => {
    let { id } = req.params;
    let q='SELECT * FROM robotnikdb.topic t '+
    'INNER JOIN topic_test tt '+
    'ON tt.topic_id = t.id '+
    'tt.test_id= '+id
    let topic = await pool.query(q)
    res.send(topic);
});

module.exports = router;