const express = require('express');
const exec = require('../lib/utils/commands');
const router = express.Router();
const pool = require('../database');
var colors = require('colors'); // Get color and style in your node.js console
/**
 *  ? Launching python file in Nodejs
 */

router.get('/starttestros/launch', async (req, res) => {

    let {model_id, test_id , type}= req.query;
    if(type!="python")result={message: "Not type "+type+" supported", succes: false} 
    /**
     *  ? Primero se obtiene toda la información referente al test
     */
    let test= await pool.query('SELECT * FROM robotnikdb.test where id='+test_id);
    console.log(test)
    /**
     * ! Por ahora *comment* contiene la *linea de comando* a ejecutar
     */
    let {comment} = test[0];   
    let com = comment;
    result = await exec.localCommand(com);

    res.send(result);
});


router.get('/startcommands/launch', async (req, res) => {

    /**
     * Example: /usr/bin/python3 /home/student/Documents/project/ssh.py -u student -h 192.168.225.130 -p student -c 'rosversion -d,rosnode list' 
     */
    let {user,password,host,command, test_id , type}= req.query;

    if(type!="commands")result={message: "Not type "+type+" supported", succes: false}
    if(!user) result={message: "It Need more Information" , succes: false}
    /**
     *  ? Primero se obtiene toda la información referente al test
     */

    let com= './utils/exec/myssh '+' -u '+user+' -h '+host+' -p '+password+' -c '+command
    console.log(com)
    result = await exec.localCommand(com);

    res.send(result);
});

module.exports = router;