const express = require('express');
const router = express.Router();

const path = require('path');
// [CircularJSON] https://stackoverflow.com/questions/4816099/chrome-sendrequest-error-typeerror-converting-circular-structure-to-json


router.use (function (req,res,next) {
    console.log('/' + req.method);
    next();
  });

router.get('/', async (req, res) => {
    //res.render('index');
    res.sendFile(path.resolve('public/www/index.html'));
});




module.exports = router;