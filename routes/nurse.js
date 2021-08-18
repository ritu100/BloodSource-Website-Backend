var express = require('express');
const bodyParser = require('body-parser')
var nurseRouter = express.Router();
const cors = require('./cors')
var db = require('../models/mysql').pool

nurseRouter.use(bodyParser.json())
/* GET users listing. */
nurseRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all(cors.corsWithOptions,(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(cors.corsWithOptions,(req,res,next) => {
    const sqlInsert ="select * from Nurse;"
    db.query(sqlInsert,(err,result)=>{
        res.send(result)
    })
})
.post(cors.corsWithOptions,(req,res,next) => {
    const name= req.body.newNurse.name
    const email= req.body.newNurse.email
    const mobile= req.body.newNurse.mobile
    const gender= req.body.newNurse.gender
    const address= req.body.newNurse.address
    const joinDate= req.body.newNurse.joinDate
    console.log(req.body)
    const sqlInsert ="INSERT INTO Nurse(name,gender,city,mob_no,email,join_date)VALUES(?,?,?,?,?,?);"
    db.query(sqlInsert,[name,gender,address,mobile,email,joinDate],(err,result)=>{
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
nurseRouter.route('/:id')
.options(cors.corsWithOptions)
.get(cors.corsWithOptions,(req,res,next)=>{
    const sqlExists ="select * from Nurse where nurse_id=?;"
    db.query(sqlExists,[req.params.id],(err,result)=>{
        if(err){
            console.log(err)
        }
        if(result){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.send(result)
        }
        else{
            res.statusCode = 203;
            res.setHeader('Content-Type', 'text/plain');
        }
    })
})
.post(cors.corsWithOptions,(req,res,next)=>{
    const id=req.params.id
    const name=req.body.name
    const email=req.body.email
    const address = req.body.address
    const mob = req.body.mob
    const sqlInsert ="update Nurse set name=?,email=?,mob_no=?,city=? where nurse_id=?;"
    db.query(sqlInsert,[name,email,mob,address,id],(err,result)=>{
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
    const id=req.params.id
    console.log(req.params)
    const sqlInsert ="delete from Nurse where nurse_id=?;"
    db.query(sqlInsert,[id],(err,result)=>{
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
module.exports = nurseRouter;
