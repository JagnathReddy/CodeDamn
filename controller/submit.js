const express=require('express');
const fs=require("fs");
const child_process=require("child_process");
//const codeFile=fs.readFileSync("Main.java");
const solution=JSON.parse(fs.readFileSync(`${__dirname}/../data/answers.json`,"utf-8"));
const questions=JSON.parse(fs.readFileSync(`${__dirname}/../data/questions.json`,"utf-8"));
const leaderboard=JSON.parse(fs.readFileSync(`${__dirname}/../data/leaderboard.json`,"utf-8"));

exports.sub=(req,res)=>{
    let userIndex=leaderboard.findIndex((ele)=>ele.name==req.body.name);
    if(userIndex!=-1){
        if(req.body.id==0){
            if(leaderboard[userIndex].last==5){
                res.json({status:"over"});
                return;
            }else{
                res.json({status:"correct",next:questions[leaderboard[userIndex].last+1],lan:leaderboard[userIndex].lan,id:leaderboard[userIndex].last+1});
                return;
            }
        }
        if(req.body.lan==="JAVA"){
            const code=fs.readFileSync(`./java Temp/${req.body.id}.txt`,"utf-8");
            let newcode=code.replace("//class here",(req.body.code).replaceAll("#-#",`"`));        
            //if(req.body.id==0&&user){res.json({status:"correct",next:questions[user.last]});return;}
            fs.writeFileSync("./testing.java",newcode,"utf-8")
            child_process.exec("javac testing.java",(err,stdout,stderr)=>{
                if(err){
                    res.json({status:"error",error:stderr});
                }else{
                    child_process.exec("java testing",(error,out,serr)=>{
                        if(error){
                            res.json({status:"error",error:"runtime error"});
                        }else{
                            if(out=="correct\r\n"){
                                leaderboard[userIndex].last++;
                                //prev.solve++;
                                leaderboard[userIndex].Endtime=Date.now();
                                if(req.body.id!=5){
                                    res.json({status:"correct",next:questions[req.body.id+1],lan:leaderboard[userIndex].lan,id:leaderboard[userIndex].last+1});
                                }else{
                                    res.json({status:"over"});
                                }
                            }else{
                                leaderboard[userIndex].Endtime=Date.now();
                                res.json({status:"incorrect"});
                            }
                        }
                    })
                }

            })
        }else{
            //if(req.body.id==0){res.json({status:"correct",next:questions[user.last+1]});return;}
            const code=fs.readFileSync(`./cpp Temp/${req.body.id}.txt`,"utf-8");
            let newcode=code.replace("//class here",(req.body.code).replaceAll("#-#",`"`));
            //if(req.body.id==0){res.json({status:"correct",next:questions[req.body.id+1]});return;}
            fs.writeFileSync("./cppTest.cpp",newcode,"utf-8")
            child_process.exec("g++ cppTest.cpp -o cppTest",(err,stdout,stderr)=>{
                if(err){
                    res.json({status:"error",error:stderr});
                }else{
                    child_process.exec(".\\cppTest",(error,out,serr)=>{
                        if(error){
                            res.json({status:"error",error:"runtime error"});
                        }else{
                            if(out=="correct\r\n"){
                                leaderboard[userIndex].last++;
                                //prev.solve++;
                                leaderboard[userIndex].Endtime=Date.now();
                                if(req.body.id!=5){
                                    res.json({status:"correct",next:questions[req.body.id+1],lan:leaderboard[userIndex].lan,id:leaderboard[userIndex].last+1});
                                }else{
                                    res.json({status:"over"});
                                }
                            }else{
                                leaderboard[userIndex].Endtime=Date.now();
                                res.json({status:"incorrect"});
                            }
                        }
                    })
                }

            })
        }
    }else{
        let prev={
            name:req.body.name,
            Starttime:req.body.Starttime,
            Endtime:req.body.Starttime,
            solve:0,
            lan:req.body.lan,
            last:0
        };
        leaderboard[leaderboard.length]={...prev};
        fs.writeFile(`./data/leaderboard.json`, JSON.stringify(leaderboard),()=>console.log("worte"));
        // console.log(leaderboard);
        res.json({status:"correct",next:questions[1],lan:req.body.lan,id:1});

    }
}



exports.getRanks=(req,res)=>{
    fs.writeFile(`./data/leaderboard.json`, JSON.stringify(leaderboard),()=>console.log("worte"));
    res.json(leaderboard);
    //JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`,"utf-8"))
}
