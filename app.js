const fs=require('fs');
const express = require('express');
const router=require('./router/submitToProb');
const authorization=require('./router/authorization');
const useradd=require('./router/user');

const app=  express();

let userdata=JSON.parse(fs.readFileSync('data/user.json'));

app.use(express.json());

app.get("/rightSide-removebg-preview.png",(req,res)=>{
    res.sendFile("C:/Users/jagnath reddy/Desktop/testing purpose/CodeDamn/html/rightSide-removebg-preview.png");
})
app.get("/gdsclogo.png",(req,res)=>{
    res.sendFile("C:/Users/jagnath reddy/Desktop/testing purpose/CodeDamn/html/gdsclogo.png");
})
app.use('/submit',router);
app.use('/leaderboard',useradd);
app.use('/problem',authorization);



module.exports = app;