const fs=require("fs");
const express=require('express');

const userData=JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`,"utf-8"));

exports.get=(req,res)=>{
    let o=userData.find(el=>el.name==req.body.name);
    if(o){
        res.json({status:"unavailable"})
    }else{
    let addingNew={name:req.body.name,phNO:req.body.phNo,branch:req.body.branch,year:req.body.year};
    userData[userData.length]=addingNew;
    res.json(userData);}
}

exports.addUser=(req,res)=>{
    res.json({ok:"ok"})
}
