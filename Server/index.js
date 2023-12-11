const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolver");
const cors = require("cors");
const mongoose = require("mongoose");
const {graphqlUploadExpress} = require('graphql-upload');
async function startServer() {
    const app = express();
  
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
    server.applyMiddleware({ app });
   
    
    mongoose.connect("mongodb://127.0.0.1:27017/swdProject");
  console.log("mongoose connected");
  
  app.use(express.static("public"));
  app.use(cors());
  

  
   
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  }
  
  startServer();