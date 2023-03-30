const fs=require("fs");
const userData=JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`,"utf-8"));

exports.auth=(req,res)=>{

    if(req.body.password===userData[req.params.name]){
        res.json({success:true,name:req.params.name});
    }else{
        res.json({success:false});
    }
}


exports.addUser=(req,res)=>{
    const d=userData.find(el=>el.name===req.params.name);
    if(d){
        res.json({message:"username not available"});
    }else{
        res.json({message:"username available"});
    }
}
