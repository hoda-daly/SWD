import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navs from "./components/Navs/Navs";
import Initiation from "./components/SDLC/Initiation";
import Requirments from "./components/SDLC/Requirements";
import Design from "./components/SDLC/Design";
import Home from "./components/Home/Home";
import Files from "./components/Files/Files";
import { createUploadLink } from "apollo-upload-client";
import Update from "./components/Form/Update";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import UpdateAnalysis from "./components/Form/UpdateAnalysis";

const client = new ApolloClient({
  link: createUploadLink({
    uri: "http://localhost:4000/graphql",
  }),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      <Navs />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Initiation" element={<Initiation />} />
        <Route path="/Requirments" element={<Requirments />} />
        <Route path="/Design" element={<Design />} />
        <Route path="/Files" element={<Files />} />
        <Route path="/Update/:id" element={<Update />} />
        <Route path="/UpdateAnalysis/:id" element={<UpdateAnalysis />} />
      </Routes>
    </BrowserRouter>
    </ApolloProvider>
    
  );
}

export default App;
