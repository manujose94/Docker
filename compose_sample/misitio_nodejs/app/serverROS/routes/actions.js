const express = require('express');
const exec = require('../lib/utils/commands');
const router = express.Router();
const pool = require('../database');
const qr = require('../database/querys_insert');
const Errors = require('../lib/utils/errors'); // my collection of custom exceptions
var colors = require('colors');
const HttpStatus = require('http-status-codes');

/**
 * ! Post de prueba
 */
router.post('/start/:id', async (req, res) => {
    const { id } = req.params;
    /**
     * TODO: HAY QUE CAMBIAR ESTO EN EL FUTURO
     * Crear clase generica donde se determine si contiene comandos o no
     * El segundo elemento del array es el rb1
     */

    if (req.body != null && req.body.length > 0) //lista de comandos ultimo elemento del array
        commands = req.body[req.body.length - 1];
    var config;
    for (let i = 0; i < req.body.length - 1; i++) {
        if (req.body != null && req.body[i].type == "comandos") {
            config = { user: '', host: '', password: '' };
            config.user = req.body[i].username;
            config.host = req.body[i].ip;
            config.password = req.body[i].password;
        }
        console.log(config)
        if (config.user == "rb1") {
            result = await exec.sshSequence(commands, config);
        }
    }

    //req.flash('success', 'Link Updated Successfully');
    //console.log("send", result)


    res.send(result);
});
/**
 * /**
 *  TODO: Implementado Headling Error
 * 
 *  ! HACE FALTA ID MODELO Y ID TEST
 * * start: Realizar comandos con SSH de un determiando TEST
 */
router.get('/start/:id', async (req, res) => {
    /**
     * ? id = test_id
     */
    const { id } = req.params;

    /**
     *  ? Primero se obtiene todos los topic del test
     */
    //let {model_id, test_id , type}= req.query;
    
    try {

        let test_model_unit = await pool.query('SELECT rm.id as model_id, rm.name as model_name, rm.description, ' +
            'rm.supplier, rm.username, rm.password, unit.name as unit_name, unit.ip , t.id as test_id ' +
            'FROM robot_model rm ' +
            'INNER JOIN robot_model_test m ON m.robot_model_id=rm.id ' +
            'INNER JOIN test t on m.tests_id = t.id ' +
            'INNER JOIN robots_unit unit on rm.id = unit.robot_model_id ' +
            'WHERE  t.id=' + id);

        if (!test_model_unit.length)
            throw new Errors.NotFound('model not found');

        let { model_id, model_name, test_id, username, ip, password } = test_model_unit[0];
        

        /**
         * ? Comandos del test a realizar
         */
        let commands = await pool.query('SELECT  com.name, com.order from commands com ' +
            'WHERE com.test_id = ' + test_id + ' order by com.order desc')

        /**
         * ? Crear obj de Configuración para SSH
         */
        var config;
        config = { user: '', host: '', password: '' };
        config.user = username;
        config.host = ip;
        config.password = password;

        let output = await exec.sshSequence(commands, config);

        /**
         * ? Guardar resultado del test en test_ready
         */
        qr.setInsertTest(test_id, output.succes, model_id, model_name)
         /**
         * ? Debe de enviar un json como paquete de renvio
         */

        res.send(output);
        }catch (err) {
            if (err instanceof Errors.NotFound)
                return res.status(HttpStatus.NOT_FOUND).send({ message: err.message , succes:false}); // 404
            
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message, succes: false}); // 500

        }
    });
/**
 * ! PENDIENTE DE TERMINAR
 */
router.get('/start/test/:id', async (req, res) => {
    const { id } = req.params;

    let myparams = [];
    for (let param in req.query)
        myparams.push(req.query[param]);

    let test_model_unit = await pool.query('SELECT rm.id as model_id, rm.name, rm.description, ' +
        'rm.supplier, rm.username, rm.password, unit.name as unit_name, unit.ip , t.* ' +
        'FROM robot_model rm ' +
        'INNER JOIN robot_model_test m ON m.robot_model_id=rm.id ' +
        'INNER JOIN test t on m.tests_id = t.id ' +
        'INNER JOIN robots_unit unit on rm.id = unit.robot_model_id ' +
        'WHERE t.id=' + id);
    if (!test_model_unit.length) return { message: "not found test's model", succes: false }
    let { type, username, password } = test_model_unit[0];
    if (type != "commands") return { message: "Type of test is not valid in this url", succes: false }

    let commands = await pool.query('SELECT  com.name, com.order from commands com ' +
        'WHERE com.test_id = ' + test_model_unit[0].id + ' order by com.order desc')

    var config;
    config = { user: '', host: '', password: '' };
    config.user = username;
    config.host = ip;
    config.password = password;
    console.log(config);
    let output = await exec.sshSequence(commands, config);

    /**
     * ? Debe de enviar un json como paquete de renvio
     */

    res.send(output);
});

/**
 * ? Get commands via params inside url
 */
router.get('/start/commands/', async (req, res) => {
    let commands = [];
    for (let param in req.query)
        commands.push(req.query[param]);

    result = await exec.localSequence(commands);
    res.send(result);
});

/**
 * ? Get commands via params inside url
 */
router.get('/startcommands/', async (req, res) => {
    let commands = [];
    for (let param in req.query)
        commands.push(req.query[param]);

    result = await exec.localSequence(commands);
    res.send(result);
});

module.exports = router;