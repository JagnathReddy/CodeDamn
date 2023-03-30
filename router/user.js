const express = require('express')
const fs=   require('fs');
const router=express.Router();
const usercon=require('./../controller/useradd');

module.exports = (req,res)=>{
    res.writeHead(200,{'Content-Type': 'text/html'}).end(fs.readFileSync(`./html/newUser.html`, 'utf8'));
};