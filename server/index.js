const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const Item = require('./models/itemModel');

mongoose.connect("mongodb+srv://deekshashetty736:liQEsHPRTvrM7Lrj@cluster0.ardch.mongodb.net/");

const app=express();
app.use(cors());
app.use(express.json())

app.post('/createItem',async (req,res)=>{
 
  try {
   
    const item=new Item({
      itemName:req.body.title
    })
    const data=await item.save();
    return res.send(data)
  } catch (error) {
    console.log(error);
  }
})

app.get('/getItems',async (req,res)=>{
 
  try{
    
    const item=await Item.find({})
    res.send(item)

  }catch(err){
    console.log(err);
    res.send(err)

  }
})

app.put('/updateItem/:id',async (req,res)=>{
 
  try{

    const {id}=req.params;   
    const updatedItem=await Item.findByIdAndUpdate({_id:id},{itemName:req.body.title},{new:true})

    // const item=await Item.find({})
    return res.send(updatedItem)
  
  }catch(err){
    console.log(err);
  }
})

app.delete('/deleteItem/:id',async (req,res)=>{
 
  try{

    const {id}=req.params;
    const deletedItem=await Item.findByIdAndDelete({_id:id})
    return res.send(deletedItem);

    // const item=await Item.find({})   
    // return res.send(item)
   

  }catch(err){
    return res.send(err)

  }
})

mongoose.connection.once("open", () => {
    console.log("connected to mongoDB");
    app.listen(8000, () => {
      console.log("Server is listening on port 8000");
    });
});
