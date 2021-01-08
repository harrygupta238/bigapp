var router= require("express").Router();
var mailer= require("nodemailer");
var mongodb= require("mongodb");
var {sendMail}= require("./mail");


router.post("/createShedule", function(req,res,next){
    var db=global["db"];
    var sheduleObj=req.body;
    db.collection("Shedule").insertOne(sheduleObj).then((inserted)=>{
        if(inserted){
            res.json({message:"success"});
        }
    });
    
});
router.post("/read", function(req,res,next){
    var db=global["db"];
    var sheduleID=req.body.sheduleID;
    db.collection("Shedule").findOne({_id:mongodb.ObjectId(sheduleID)}).then((shedule)=>{
            res.json({message:"success",data:shedule});
    });
    
});
router.post("/delete", function(req,res,next){
    var db=global["db"];
    var sheduleID=req.body.sheduleID;
    db.collection("Shedule").remove({_id:mongodb.ObjectId(sheduleID)}).then((removed)=>{
            res.json({message:"success",data:removed});
    });
    
});
router.get("/list", function(req,res,next){
    var db=global["db"];
    db.collection("Shedule").find({}).toArray().then((shedules)=>{
            res.json({message:"success",data:shedules});
    });
    
});
router.get("/failedshedulelist", function(req,res,next){
    var db=global["db"];
    db.collection("Shedule").find({Status:'failed'}).toArray().then((err,shedules)=>{
        if(err){
            res.json({message:"error",data:err});
        }
        else{
            res.json({message:"success",data:shedules});
        }
    });
    
});
router.post("/update", function(req,res,next){
    var db=global["db"];
    var sheduleID=req.body.sheduleID;
    var updateObj=req.body.updateObj;
    
    // var updateObj={
    //     from: 'noreply@gmail.com',
    //     to: 'harrygupta238@gmail.com',
    //     subject: 'Sending Email using Node.js',
    //     text: 'That was easy!',
    //     SheduleDate: new Date()
    // }
    updateShedule(sheduleID,updateObj,function(response){
        res.json(response);
    });
});
function updateShedule(sheduleID, updateObj,callback){
    var db=global["db"];
    db.collection("Shedule").updateOne({_id:mongodb.ObjectId(sheduleID)},{$set:updateObj}).then((err,updated)=>{
        if(err){
            callback({message:"error",data:err});
        }
        else{
            callback({message:"success",data:updated});
        }
    });

}

router.post("/shedulemail", function(req,res,next){
    var sheduleID=req.body.sheduleID;
    db.collection("Shedule").findOne({_id:mongodb.ObjectId(sheduleID)}).then((shedule)=>{
            var mailOptions={
                from: shedule.from,
                to: shedule.to,
                subject: shedule.subject,
                text: shedule.text,
            };
            sendMail(mailOptions,function(response){
                let updateObj={};
                if(response.status==500)
                updateObj.Status="failed";
                else
                updateObj.Status="success";

                updateShedule(sheduleID,updateObj,function(data){
                    res.json(data);
                });
            });
        
    });
    
});
router.get("/sendmail", function(req,res,next){
    var mailOptions={
        from: 'noreply@gmail.com',
        to: 'kagaywdjgaawdytywgawye@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
    sendMail(mailOptions,function(response){
        res.json(response);
    });
});
module.exports=router;