const { gql } = require("apollo-server-express");

const typeDefs=gql`
scalar Upload
type Initialization{
    id:ID!,
    ptitle:String!,
    sdate:String!,
    edate:String!,
    pobjectives:String!,
    PM:String!,
    Budgetinfo:String!,
    pscope:String!

},
type Analysis{
  id:ID!,
  intro:String!,
  PoSW:String!,
  intendedAudience:String!,
  desc:String!,
  srs:String!,
  useCase:String!
},
type Design{
  id:ID!,
  fileName:String!,
  url:String!
},
type File {
    url: String!
  }

type Query {
    getAllinitialization: [Initialization]
    getInitDoc(id: ID!): Initialization

    getAllAnalysisDocs: [Analysis]
    getAnalysisDoc(id: ID!): Analysis

    getAllDesignDocs: [Design]
    getDesignDoc(id: ID!): Design
  }
input initializationInput{
    ptitle:String!,
    sdate:String!,
    edate:String!,
    pobjectives:String!,
    PM:String!,
    Budgetinfo:String!,
    pscope:String!

  },
  input analysisInput{
    intro:String!,
    PoSW:String!,
    intendedAudience:String!,
    desc:String!,
    srs:String!,
    useCase:String!
  }
  input designInput{
    
    fileName:String!,
    url:String!
  }


  
  type Mutation {
    createIntialization(initialization:initializationInput):Initialization
    updateIntialization(id:ID!,initialization:initializationInput):Initialization
    createAnalysis(analysis:analysisInput):Analysis
    updateAnalysis(id:ID!,analysis:analysisInput):Analysis
    uploadFile(file: Upload!): File!
    createDesign(design:designInput):Design
    updateDesign(id:ID!,design:designInput):Design
    deleteInit(id: ID!): String
    deleteAnalysis(id: ID!): String
    deleteDesign(id: ID!): String
  }

`;
module.exports = { typeDefs };
