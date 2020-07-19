const express = require('express');
const exec = require('../lib/utils/commands');
const router = express.Router();
const pool = require('../db/database');
var colors = require('colors'); // Get color and style in your node.js console
/**
 *  ? Launching python file in Nodejs
 *  * Types: python or pythoncommand
 */


/**
 * * Required
 * @param req test_id ,type
 */
router.get('/startlaunch/ros', async (req, res) => {

    let {model_id, test_id , type}= req.query;
    if(type!="python")result={message: "Not type "+type+" supported", succes: false} 
    /**
     *  ? Primero se obtiene toda la información referente al test
     */
    let test= await pool.query('SELECT * FROM robotnikdb.test where id='+test_id);
    /**
     * launch contain a command line to launch a specific test via python
     */
    
    let {launch} = test[0]; //@remind launch col
    result = await exec.localCommand(launch);

    res.send(result);
});

/**
 * 1. Detecta si se le han pasado comandos por param donde command="com1,com2,com3"
 * 2. Si no Detecta, lee en la base de datos los comandos que tenga asignado el test SI EXISTE
 */
router.get('/startlaunch/commands', async (req, res) => {

    /**
     * Example: /usr/bin/python3 /home/student/Documents/project/ssh.py -u student -h 192.168.225.130 -p student -c 'rosversion -d,rosnode list' 
     */
    let {username,password,ip,command, test_id , type}= req.query;

    if(!command){
        try { 
            // ? Comandos del test a realizar
            let commands = await pool.query('SELECT  com.name, com.order from commands com ' +
                'WHERE com.test_id = ' + test_id + ' order by com.order desc')
            if (!commands.length)
                    throw new Errors.NotFound('No commands assigned');
            var commands_line='';
            for (let com of commands) {     
               commands_line = commands_line+com.name+',';
            }
            command= "'"+commands_line.slice(0, -1)+"'"; //delete last character "",""
  
            }catch (err) {
                if (err instanceof Errors.NotFound)
                    return res.status(HttpStatus.NOT_FOUND).send({ message: err.message , succes: false}); // 404
                console.log(err);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message , succes: false}); // 500
            }
    }

    if(type!="python")result={message: "Not type "+type+" supported", succes: false}
    if(!username || !password || !ip ) result={message: "It Need more Information" , succes: false}
    else{
    let com= './utils/exec/myssh '+' -u '+username+' -h '+ip+' -p '+password+' -c '+command
    console.log("launch myssh",{com})
    result = await exec.localCommand(com);
    }
    res.send(result);
});

module.exports = router;