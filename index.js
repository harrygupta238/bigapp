var express =require("express");
var bodyparser=require("body-parser");
var connect=require("./middleware/connection");
var apiroutes=require("./api");

var app=express();
global["db"] ={};
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json({limit:"110mb"}));

app.use(connect.connectDB);
app.use("/api",apiroutes);
app.use("/",(req,res, next)=>{
    res.send("hello");
})
app.listen(8000,function(){
    console.log("running on port 8000")
})