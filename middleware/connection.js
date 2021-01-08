var mongodb=require("mongodb");
function connectDB(req,res,next){
    if(global["db"]){
        mongodb.MongoClient.connect("mongodb://localhost:27017",{ useUnifiedTopology: true },function(error, client){
            if(error)
                console.log(error);
            else
            global["db"]=client.db("test");
            next();
        });
        //var a=9;
    }else{
        next();
    }
    
}

module.exports ={
    connectDB
}