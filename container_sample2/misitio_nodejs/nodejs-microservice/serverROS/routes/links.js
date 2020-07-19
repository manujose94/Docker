const express = require('express');
const router = express.Router();
const pool = require('../database');
const Errors = require('../lib/utils/errors'); // my collection of custom exceptions

router.get('/bd/mytopics', async (req, res) => {
    let links = await pool.query('SELECT * FROM topic');
    console.log("[BD] ",links);
    res.send(links);
});

/** Get Robot unit */
router.get('/bd/robotunits', async (req, res) => {
    let links = await pool.query('SELECT * FROM robots_unit');
    res.send(links);
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
    let links = await pool.query('SELECT tr.*, t.name as test_name, t.type as test_type, o.name as operario_name FROM robotnikdb.tests_ready tr '+
    'INNER JOIN test t '+
    'ON t.id = tr.test_id '+
    'INNER JOIN operario o '+
    'ON o.id = tr.operario_id ');
    res.send(links);
});


/** Get Robot units from id robot_model */
router.get('/bd/robotmodels/:id', async (req, res) => {
    const { id } = req.params;
    let units= await pool.query('SELECT  * FROM robot_model '+
    'WHERE robot_model_id = '+id+' order by name;')
    res.send(units);
   
});

/**
 * Todo:  /bd/models utiilizado para listar test con todos los datos necesarios
 */
router.get('/bd/models', async (req, res) => {
    /**
     * ! Hace una consulta de todos los modelos y todos los test que contiene
     */
    let q = 'SELECT rm.id as model_id, rm.name as model_name, rm.description, rm.supplier, rm.username, rm.password, unit.name as unit_name, unit.ip ,'+ 
    't.id as test_id, t.name as test_name, t.description as test_description, t.type, t.comment as test_comment  '+
    'FROM robot_model rm '+
    'INNER JOIN robot_model_test m '+
    'ON m.robot_model_id=rm.id '+
    'inner join test t on m.tests_id = t.id '+
    'inner join robots_unit unit on rm.id = unit.robot_model_id;';
    console.log("[Query]".blue,q)
    let model_load = await pool.query(q);
    res.send(model_load);
});

router.get('/bd/testmachine', async (req, res) => {
    /**
     * ? Hace una consulta de todos los test sin modelo robot
     */
    let q = 'SELECT  DISTINCT t.id as test_id, t.name as test_name, t.description test_description, t.type , t.comment as test_comment '+
    'FROM test t '+
    'WHERE t.id NOT IN (SELECT tests_id from robot_model_test)';
    console.log(q)
    let tests_not_robot = await pool.query(q);

    res.send(tests_not_robot);
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
    console.log("[BD] ",links);
    res.send(links);
});

/**
 *  todo: Todos los topics referente a im test
 *  ? id = ID del test
 * * sdasd
 * ! Pendiente de terminar
 */
router.get('/bd/topics/:id', async (req, res) => {
    let { id } = req.params;
    console.log("ID MODEL", id);
    let topic = await pool.query('SELECT * FROM robotnikdb.topic t '+
    'INNER JOIN topic_test tt '+
    'ON tt.topic_id = t.id '+
    'tt.test_id= '+id)
    res.send(topic);
});

module.exports = router;