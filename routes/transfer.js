var express = require('express');
const bodyParser = require('body-parser')
var transferRouter = express.Router();
const cors = require('./cors')
var db = require('../models/mysql').pool

transferRouter.use(bodyParser.json())
/* GET users listing. */
transferRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all(cors.corsWithOptions,(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(cors.corsWithOptions,(req,res,next) => {
    const sqlInsert ="select * from Transfer natural join Hospital;"
    db.query(sqlInsert,(err,result)=>{
        res.send(result)
    })
})
.post(cors.corsWithOptions,(req,res,next) => {
    const hId= req.body.hospitalId
    const reqDate= req.body.requestDate
    const quantity= req.body.quantity
    const component= req.body.component
    const bloodGroup= req.body.bloodGroup
    const status= req.body.status
    const sqlInsert ="INSERT INTO Transfer(h_id,t_date,component_name,Qty,blood_grp,status)VALUES(?,?,?,?,?,?);"
    db.query(sqlInsert,[hId,reqDate,component,quantity,bloodGroup,status],(err,result)=>{
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
.delete(cors.corsWithOptions,(req,res,next)=>{
    const id='2'
    const sqlInsert ="delete from Transfer where t_id='?';"
    db.query(sqlInsert,[id],(err,result)=>{
        console.log(result)
        if(err){
            console.log(err)
        }
    })
})
transferRouter.route('/hospital')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions,(req,res,next)=>{
    const sqlInsert ="select h_id,name from Hospital;"
    db.query(sqlInsert,(err,result)=>{
        res.send(result)
    }) 
})
module.exports = transferRouter;
