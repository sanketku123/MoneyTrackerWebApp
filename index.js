const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')

const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

//Database
const userSchema=new mongoose.Schema({
    category_select:{
        type:String,
        require:true,
    },
    amount_input:{
        type:String,
        require:true,
    },
    info:{
        type:String,
        require:true,
    },
    date_input:{
        type:String,
        require:true,
    }
})
const User=mongoose.model('MoneyTrackerWebApp',userSchema)
mongoose.connect("mongodb+srv://anuraggupta2993:Anurag%401612@cluster0.jcrv6rl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>console.log('mongoose connected successfully')).catch((err)=>console.log(err))


app.post('/add',async(req,res)=>{
   const result=await User.create({ 
    category_select:req.body.category_select,
     amount_input:req.body.amount_input,
     info:req.body.info,
     date_input:req.body.date_input
    })
    console.log('Record Inserted Successfully')
})

app.get('/',(req,res)=>{
 res.sendFile('index.html',{root:'./public'})
})

app.listen(5000,()=>{
    console.log('server started successfully')
})