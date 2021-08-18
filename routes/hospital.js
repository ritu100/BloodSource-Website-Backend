var express = require('express');
const bodyParser = require('body-parser')
var hospitalRouter = express.Router();
const cors = require('./cors')
var db = require('../models/mysql').pool

hospitalRouter.use(bodyParser.json())
/* GET users listing. */
hospitalRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all(cors.corsWithOptions,(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(cors.corsWithOptions,(req,res,next) => {
    const sqlInsert ="select * from Hospital;"
    db.query(sqlInsert,(err,result)=>{
        res.send(result)
    })
})
.post(cors.corsWithOptions,(req,res,next) => {
    const name= req.body.newHospital.name
    const mob_no_= req.body.newHospital.mob_no_
    const district= req.body.newHospital.district
    const city= req.body.newHospital.city
    const pincode=req.body.newHospital.pincode
    console.log(req.body)
    const sqlInsert ="INSERT INTO Hospital(name,mob_no,district,city,pincode)VALUES(?,?,?,?,?);"
    db.query(sqlInsert,[name,mob_no_,district,city,pincode],(err,result)=>{
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
    const sqlInsert ="delete from Hospital where h_id='?';;"
    db.query(sqlInsert,[id],(err,result)=>{
        if(err){
            console.log(err)
        }
    })
})

hospitalRouter.route('/:h_id')
.options(cors.corsWithOptions)
.get(cors.corsWithOptions,(req,res,next)=>{
    const sqlExists ="select * from Hospital where h_id=?;"
    db.query(sqlExists,[req.params.h_id],(err,result)=>{
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
    const h_id=req.params.h_id
    const district=req.body.district
    const address = req.body.address
    const pincode =req.body.pincode
    const mob_no = req.body.mob_no
    const sqlInsert ="update Hospital set city=?,mob_no=?,district=?,pincode=? where h_id=?;"
    db.query(sqlInsert,[address,mob_no,district,pincode,h_id],(err,result)=>{
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
    const h_id=req.params.h_id
    const sqlInsert ="delete from Hospital where h_id=?;"
    db.query(sqlInsert,[h_id],(err,result)=>{
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
module.exports = hospitalRouter;