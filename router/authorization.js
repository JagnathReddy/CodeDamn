const fs = require('fs');
const express = require('express')
const router=express.Router();
const auth=require('./../controller/userAuth');

const sendhome=(req,res)=>{
    res.writeHead(200, {
        'Content-type': 'text/html'
      });
      res.end(fs.readFileSync("./html/problem.html"));
}

module.exports = sendhome;