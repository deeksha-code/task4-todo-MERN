const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const Item = require('./models/itemModel');


mongoose.connect("mongodb://127.0.0.1:27017/todo");



const app=express();
app.use(cors());
app.use(express.json())

app.post('/createItem',async (req,res)=>{
 
  try {
   
    console.log(req.body);
    const item=new Item({
      itemName:req.body.title
    })
    const data=await item.save();
    res.send(data)
  } catch (error) {
    console.log(error);
  }
})

app.get('/getItems',async (req,res)=>{
 
  try{
    
    const item=await Item.find({})
    // res.json(users,quiz)
    res.send(item)

  }catch(err){
    console.log(err);
    res.send(err)

  }
})

app.put('/updateItem/:id',async (req,res)=>{
 
  try{
    const {id}=req.params;
    console.log(req.params);
    console.log(req.body);
    const item=await Item.findByIdAndUpdate({_id:id},{
      itemName:req.body.title
    })
    // res.json(users,quiz)
    res.send(item)

  }catch(err){
    console.log(err);
    res.send(err)

  }
})

app.delete('/deleteItem/:id',async (req,res)=>{
 
  try{
    const {id}=req.params;
    console.log(req.params);
    await Item.findByIdAndDelete({_id:id})
    // res.json(users,quiz)
  }catch(err){
    console.log(err);
    res.send(err)

  }
})

mongoose.connection.once("open", () => {
    console.log("connected to mongoDB");
    app.listen(8000, () => {
      console.log("Server is listening on port 8000");
    });
});
