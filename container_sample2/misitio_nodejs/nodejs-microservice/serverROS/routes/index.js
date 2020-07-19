const express = require('express');
const router = express.Router();
const MySingleton = require('../lib/ros-singleton');
// [CircularJSON] https://stackoverflow.com/questions/4816099/chrome-sendrequest-error-typeerror-converting-circular-structure-to-json
var singleton = MySingleton.getInstance();


router.get('/', async (req, res) => {
    //res.render('index');
    res.send('Express(web framework) corriendo ahora con ROSLIBjs!');
});


router.get('/ros', async (req, res) => {
    console.log(singleton.myros())
    res.send(singleton.myros());
});

router.get('/ros/instance', async (req, res) => {
    console.log(singleton.myros())
    res.send(singleton.getROS_Instance());
});

router.get('/ros/mytopics', async (req, res) => {
    let topics = singleton.instance.myros().topics;
    if(topics && topics.names && topics.names.length>0) res.send(topics);
    else res.send(topics)
});

module.exports = router;