const mongoose=require('mongoose');

const itemSchema=new mongoose.Schema({
        itemName:{
            type:String,
            required:true
        }
       
},{timestamps:true});

module.exports=mongoose.model('item',itemSchema)