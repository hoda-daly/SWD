const mongoose = require('mongoose')
const AnalysisSchema=mongoose.Schema({
    intro:{
        type:String,
        required:true
    },
    PoSW:{
        type:String,
        required:true
        
    },
    intendedAudience:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    srs:{
        type:String,
        required:true
    },
    useCase:{
        type:String,
        required:true
    }


   
});

  const Analysis = mongoose.model("analysis", AnalysisSchema);
  module.exports = { Analysis };
  