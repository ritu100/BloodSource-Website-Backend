var express = require('express');
const bodyParser = require('body-parser')
var donationRouter = express.Router();
const cors = require('./cors')
var db = require('../models/mysql').pool

donationRouter.use(bodyParser.json())
/* GET users listing. */
donationRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all(cors.corsWithOptions,(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(cors.corsWithOptions,(req,res,next) => {
    const sqlInsert ="select * from Donation natural join Donor ;"
    db.query(sqlInsert,(err,result)=>{
        res.send(result)
    })
})
.post(cors.corsWithOptions,(req,res,next) => {
    const adhar_no= req.body.newDonation.adhar_no
    const component_name= req.body.newDonation.component_name
    const quantity= req.body.newDonation.quantity
    const nurse_id= req.body.newDonation.nurseid
    const d_date= req.body.newDonation.d_date
    const sqlInsert ="INSERT INTO Donation(aadhar_no,component_name,qty,d_date,nurse_id)VALUES(?,?,?,?,?);"
    db.query(sqlInsert,[adhar_no,component_name,quantity,d_date,nurse_id],(err,result)=>{
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
    const sqlInsert ="delete from Donation where id='?';"
    db.query(sqlInsert,[id],(err,result)=>{
        if(err){
            console.log(err)
        }
    })
})
donationRouter.route('/Donor')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions,(req,res,next)=>{
    const sqlInsert ="select aadhar_no,name from Donor where donationDate < (sysdate() - INTERVAL 3 month);"
    db.query(sqlInsert,(err,result)=>{
        res.send(result)
    }) 
})
donationRouter.route('/Nurse')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions,(req,res,next)=>{
    const sqlInsert ="select nurse_id,name from Nurse;"
    db.query(sqlInsert,(err,result)=>{
        res.send(result)
    }) 
})
module.exports = donationRouter;
