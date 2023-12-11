const mongoose = require('mongoose')
const DesignSchema=mongoose.Schema({
    fileName:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
        
    },


   
});

  const Design = mongoose.model("design", DesignSchema);
  module.exports = { Design };
  