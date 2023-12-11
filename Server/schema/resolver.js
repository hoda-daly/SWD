
const {Initialization} =require("../models/initialization");
const {Analysis} =require("../models/analysis");
const {Design}=require("../models/design"); 
const { GraphQLUpload } = require("graphql-upload");
const path = require("path");
const fs = require("fs");

function generateRandomString(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
const resolvers={
  Upload: GraphQLUpload,
    Query: {
        getAllinitialization: async () => {
          return await Initialization.find();
        },
        getInitDoc: async (_, args) => {
          const { id } = args;
          return await Initialization.findById(id);
        },
      
        getAllAnalysisDocs: async () => {
          return await Analysis.find();
        },
        getAnalysisDoc: async (_, args) => {
          const { id } = args;
          return await Analysis.findById(id);
        },

        getAllDesignDocs: async () => {
          return await Design.find();
        },
        getDesignDoc: async (_, args) => {
          const { id } = args;
          return await Design.findById(id);
        },
    }
    ,
    Mutation: {
        createIntialization: async (_, args) => {
          const { ptitle, sdate,edate,pobjectives,PM,Budgetinfo,pscope } = args.initialization;
          const initialization = new Initialization({ ptitle, sdate,edate,pobjectives,PM,Budgetinfo,pscope  });
          await initialization.save();
          return initialization;
        },
        updateIntialization: async(_, args) => {
          const { id } = args;
          const { ptitle, sdate,edate,pobjectives,PM,Budgetinfo,pscope } = args.initialization;
    
          const updates = {};
          if( ptitle !== undefined) {
            updates.ptitle = ptitle
          }
    
          if( sdate !== undefined) {
            updates.sdate = sdate
          }
          if( edate !== undefined) {
            updates.edate = edate
          }
    
          if( pobjectives !== undefined) {
            updates.pobjectives = pobjectives
          }
    
          if( PM !== undefined) {
            updates.PM = PM
          }
    
          if( Budgetinfo !== undefined) {
            updates.Budgetinfo = Budgetinfo
          }

          if( pscope!== undefined) {
            updates.pscope = pscope
          }
    
    
          return await Initialization.findByIdAndUpdate(id, updates, {new: true});
    
        },
        createAnalysis: async (_, args) => {
    
          
          const { intro,PoSW,intendedAudience,desc,srs,useCase} = args.analysis;
          const anlysis = new Analysis({ intro,PoSW,intendedAudience,desc,srs,useCase  });
          await anlysis.save();
          return anlysis;
        },

         uploadFile: async (_, args) => {
      const { createReadStream, filename} = await args.file;

      const { ext, name } = path.parse(filename);
      const randomName = generateRandomString(12) + ext;

      const stream = createReadStream();
      const pathName = path.join(__dirname, "..", `/public/images/${randomName}`);
      await stream.pipe(fs.createWriteStream(pathName));

      return {
        url: `http://localhost:4000/images/${randomName}`,
      };
    },
    updateAnalysis: async(_, args) => {
      const { id } = args;
      const { intro,PoSW,intendedAudience,desc,srs,useCase} = args.analysis;

      const updates = {};
      if( intro !== undefined) {
        updates.intro = intro
      }

      if( PoSW !== undefined) {
        updates.PoSW = PoSW
      }
      if( intendedAudience !== undefined) {
        updates.intendedAudience = intendedAudience
      }

      if( desc !== undefined) {
        updates.desc = desc
      }

      if( srs !== undefined) {
        updates.srs = srs
      }

      if( useCase !== undefined) {
        updates.useCase = useCase
      }
      return await Analysis.findByIdAndUpdate(id, updates, {new: true});

    },
    createDesign: async (_, args) => {
      const { fileName,url } = args.design;
      const design = new Design({ fileName, url });
      await design.save();
      return design;
    },
    updateDesign: async(_, args) => {
      const { id } = args;
      const { fileName,url } = args.design;

      const updates = {};
      if( fileName !== undefined) {
        updates.fileName = fileName
      }

      if( url !== undefined) {
        updates.url = url
      }
   
      return await Design.findByIdAndUpdate(id, updates, {new: true});
    },

    deleteInit: async (_, args) => {
      const { id } = args;
      await Initialization.findByIdAndDelete(id);
      return "Doc is deleted";
    },

    deleteAnalysis: async (_, args) => {
      const { id } = args;
      await Analysis.findByIdAndDelete(id);
      return "Doc is deleted";
    },

    deleteDesign: async (_, args) => {
      const { id } = args;
      await Design.findByIdAndDelete(id);
      return "Doc is deleted";
    },

    },
};

module.exports = { resolvers };