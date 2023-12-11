const mongoose = require('mongoose')
const Initializationschema=mongoose.Schema({
    ptitle:{
        type:String,
        required:true
    },
    sdate:{
        type:String,
        required:true
        
    },
    edate:{
        type:String,
        required:true
    },
    pobjectives:{
        type:String,
        required:true
    },
    PM:{
        type:String,
        required:true
    },
    Budgetinfo:{
        type:String,
        required:true
    },
    pscope:{
        type:String,
        required:true
    }

   
});

  const Initialization = mongoose.model("initialization", Initializationschema);
  module.exports = { Initialization };
  