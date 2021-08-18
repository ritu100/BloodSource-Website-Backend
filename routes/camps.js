var express = require('express');
const bodyParser = require('body-parser')
var campsRouter = express.Router();
const cors = require('./cors')
var db = require('../models/mysql').pool

campsRouter.use(bodyParser.json())
/* GET users listing. */
campsRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all(cors.corsWithOptions,(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(cors.corsWithOptions,(req,res,next) => {
    const sqlInsert ="select * from campaigns;"
    db.query(sqlInsert,(err,result)=>{
        res.send(result)
    })
})
.post(cors.corsWithOptions,(req,res,next) => {
    const name= req.body.newCamp.name
    const mobile= req.body.newCamp.mobile
    const address= req.body.newCamp.address
    const cdate= req.body.newCamp.cdate
    const donationamt= req.body.newCamp.donationamt
    const sqlInsert ="INSERT INTO campaigns(name,c_date,location,mob_no,createdon)VALUES(?,?,?,?,?);"
    db.query(sqlInsert,[name,cdate,address,mobile,donationamt],(err,result)=>{
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
campsRouter.route('/event')
.options(cors.corsWithOptions)
.get(cors.corsWithOptions,(req,res,next)=>{
    const sqlExists ="select name as title,c_date as date from campaigns;"
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
campsRouter.route('/:id')
.options(cors.corsWithOptions)
.get(cors.corsWithOptions,(req,res,next)=>{
    const sqlExists ="select * from campaigns where camp_id=?;"
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
    const cdate=req.body.cdate
    const address = req.body.address
    const mob = req.body.mob
    const donationamt = req.body.donationamt
    console.log(req.body)
    const sqlInsert ="update campaigns set name=?,c_date=?,mob_no=?,location=?,createdon=? where camp_id=?;"
    db.query(sqlInsert,[name,cdate,mob,address,donationamt,id],(err,result)=>{
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
    const sqlInsert ="delete from campaigns where camp_id=?;"
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

module.exports = campsRouter;
