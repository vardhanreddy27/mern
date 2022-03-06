const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
app.use(cors(req, res) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.use(express.json())


const SignupModel =require('./models/Signup');
mongoose.connect('mongodb+srv://newuser:vardhan27@cluster0.0yrtx.mongodb.net/custumer?retryWrites=true&w=majority',{
    useNewUrlParser:true,
})
app.post('/sinsert',async(req,res)=>{
const name=req.body.name;
const email=req.body.email;
const password=req.body.password;
const custumer = new SignupModel({Name:name,Email:email,Password:password,});
try{
await custumer.save();  
res.send("data inserted");

}catch(err){
    console.log(err);
}
});
app.post('/read',async(req,res)=>{
    console.log(req.body)
    SignupModel.find({ Email: req.body.email, Password: req.body.password},(err,result)=>{
        if(err){
            res.send(err)
        }res.send(result)
    });
    });
app.listen(process.env.PORT || 5000,()=>{
    console.log('server running port 3001');
});
