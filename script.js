import express from 'express';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import axios from 'axios'

const app=express();
const PORT=1000;
const dir=dirname(fileURLToPath(import.meta.url))

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(dir+"/index.html")
})

app.post("/submit",async(req,res)=>{
var url=req.body.url;
var cname=req.body.cname;
var request=await axios.get("https://ulvis.net/api.php?url=https://"+url+"&custom="+cname+"&private=1")
var m =request.data;
if(m=="Error: Custom name already taken."){
    m="Custom name already taken"
}
else if(m=="Error: Invalid Url!"){
    m="Please don't use https://"
}
res.render("index.ejs",{
    url:m
})
})

app.listen(PORT,()=>{
console.log("Server Started")
})