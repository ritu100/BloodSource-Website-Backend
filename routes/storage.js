var express = require('express');
const bodyParser = require('body-parser')
var storageRouter = express.Router();
const cors = require('./cors')
var db = require('../models/mysql').pool

storageRouter.use(bodyParser.json())
/* GET users listing. */
storageRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all(cors.corsWithOptions,(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(cors.corsWithOptions,(req,res,next) => {
    const sqlInsert ="select * from storage;"
    db.query(sqlInsert,(err,result)=>{
        if(result){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.send(result)
        }
    })
})
module.exports = storageRouter;
