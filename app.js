// if(process.env.NODE_ENV!=='production'){
//   require('dotenv').parse();
// }

const express=require('express');
const app=express();
const expressLayouts=require('express-ejs-layouts');

const indexRouter=require('./routes/index')

app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.set('layout','layouts/layout');

app.use(expressLayouts);
app.use(express.static(__dirname));

const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/vehicle',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
});

const db=mongoose.connection;
db.on('error',error=>console.error(error));
db.once("open",()=>{
  console.log("DATABASE CONNECTED")
})

app.get('/login',(req,res)=>{
  res.render("login");
})
app.get('/passengerlogin',(req,res)=>{
  res.render("passengerlogin");
})
app.get('/driverlogin',(req,res)=>{
  res.render("driverlogin");
})
app.get('/passengerregister',(req,res)=>{
  res.render("passengerregister");
})
app.get('/driverregister',(req,res)=>{
  res.render("driverregister");
})

app.use('/',indexRouter);

app.listen(process.env.PORT||3002);

