var express = require('express');
const bodyParser = require('body-parser')
var donorRouter = express.Router();
const cors = require('./cors')
var db = require('../models/mysql').pool

donorRouter.use(bodyParser.json())
/* GET users listing. */
donorRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all(cors.corsWithOptions,(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(cors.corsWithOptions,(req,res,next) => {
    const sqlInsert ="select * from Donor;"
    db.query(sqlInsert,(err,result)=>{
        res.send(result)
    })
})
.post(cors.corsWithOptions,(req,res,next) => {
    const aadhar= req.body.newDon.aadhar
    const name= req.body.newDon.name
    const email= req.body.newDon.email
    const mobile= req.body.newDon.mobile
    const district= req.body.newDon.district
    const blood = req.body.newDon.blood
    const gender= req.body.newDon.gender
    const address= req.body.newDon.address
    const pincode= req.body.newDon.pincode
    const plasma= req.body.newDon.plasma
    const sqlInsert ="INSERT INTO Donor(aadhar_no,name,email,district,blood_grp,mob_no,gender,address,pinCode,isPlasmaDonor)VALUES(?,?,?,?,?,?,?,?,?,?);"
    db.query(sqlInsert,[aadhar,name,email,district,blood,mobile,gender,address,pincode,plasma],(err,result)=>{
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
donorRouter.route('/:aadhar')
.options(cors.corsWithOptions)
.get(cors.corsWithOptions, (req, res, next) => {
    const sqlExists = "select * from Donor where aadhar_no=?;"
    db.query(sqlExists, [req.params.aadhar], (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result) {
                res.send(result)
            }
        if (err) {
            console.log(err)
        }

        })
    })
.post(cors.corsWithOptions,(req,res,next) => {
    const aadhar= req.params.aadhar
    const name= req.body.name
    const email= req.body.email
    const mobile= req.body.mobile
    const district= req.body.district
    const address= req.body.address
    const pincode= req.body.pincode
    const sqlUpdate = "update Donor set name=?,email=?,district=?,mob_no=?,address=?,pinCode=? where aadhar_no=?;"
    db.query(sqlUpdate,[name,email,district,mobile,address,pincode,aadhar],(err,result)=>{
        if (err) {
            console.log(err)
        }
        if (result) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.send(result)
        }
        else {
            res.statusCode = 203;
            res.setHeader('Content-Type', 'text/plain');
        }
    })
})
.delete(cors.corsWithOptions, (req, res, next) => {
        console.log(req.params)
        const sqlDelete = "delete from Donor where aadhar_no=?;"
        db.query(sqlDelete, [req.params.aadhar], (err, result) => {
            if (result) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.send(result)
            }
            if (err) {
                console.log(err)
            }
        })
})
module.exports = donorRouter;
