var express = require('express');
const bodyParser = require('body-parser')
var eventRouter = express.Router();
const cors = require('./cors')
var db = require('../models/mysql').pool

eventRouter.use(bodyParser.json())
/* GET users listing. */
eventRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all(cors.corsWithOptions,(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(cors.corsWithOptions,(req,res,next) => {
    const sqlInsert ="select * from event;"
    db.query(sqlInsert,(err,result)=>{
        res.send(result)
    })
})
.post(cors.corsWithOptions,(req,res,next) => {
    const title= req.body.title
    const date= req.body.date
    const color = req.body.color
    const sqlInsert ="INSERT INTO event(title,date,color)VALUES(?,?,?);"
    db.query(sqlInsert,[title,date,color],(err,result)=>{
        if(result){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.send(result)
        }
        if(err){
            console.log(err)
        }
    })
})
module.exports = eventRouter;
