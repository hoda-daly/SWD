import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { NavLink } from "react-router-dom";
import Update from "../Form/Update";
import { Link } from "react-router-dom";
import "./Home.css";

const DeleteInit = gql`
  mutation DeleteInit($id: ID!) {
    deleteInit(id: $id)
  }
`;

const DeleteAnalysis = gql`
  mutation DeleteDesign($deleteDesignId: ID!) {
    deleteDesign(id: $deleteDesignId)
  }
`;

const DeleteDes = gql`
  mutation DeleteDesign($id: ID!) {
    deleteDesign(id: $id)
  }
`;

const InitializationPhase = gql`
  query Query {
    getAllinitialization {
      id
      ptitle
      sdate
      edate
      pobjectives
      PM
      Budgetinfo
      pscope
    }
  }
`;

const DesignPhase = gql`
  query Query {
    getAllDesignDocs {
      id
      fileName
      url
    }
  }
`;

const AnalysisPhase = gql`
  query Query {
    getAllAnalysisDocs {
      id
      intro
      PoSW
      intendedAudience
      desc
      srs
      useCase
    }
  }
`;

const Home = () => {
  const [deleteInit] = useMutation(DeleteInit);
  const [deleteAnalysis] = useMutation(DeleteAnalysis);
  const [deleteDesign] = useMutation(DeleteDes);
  const { data: designdata, refetch: des } = useQuery(DesignPhase);
  const { data: analysisdata, refetch: analysis } = useQuery(AnalysisPhase);
  const { data: initdata, refetch } = useQuery(InitializationPhase);

  const handleDeleteDes = async (id) => {
    try {
      const result = await deleteDesign({
        variables: { id },
      });
      console.log("Deletion Result:", result);
      des();
    } catch (error) {
      console.error("Error deleting initialization data:", error);
    }
  };

  const handleDeleteInit = async (id) => {
    try {
      const result = await deleteInit({
        variables: { id },
      });
      console.log("Deletion Result:", result);
      refetch();
    } catch (error) {
      console.error("Error deleting initialization data:", error);
    }
  };

  const handleDeleteAnalysis = async (id) => {
    try {
      const result = await deleteAnalysis({
        variables: { id },
      });
      console.log("Deletion Result:", result);
      analysis();
    } catch (error) {
      console.error("Error deleting initialization data:", error);
    }
  };
  /* */
  return (
    <div>
      {designdata &&
        designdata.getAllDesignDocs.map((doc) => {
          return (
            <div className="cards">
              <h2>
                <b className="card-h1"> Design Phase</b>
              </h2>
              <h4>File Name : {doc.fileName} </h4>
              <h4>Diagram : {doc.url} </h4>
              <button
                className="text.decoration-none btn btn-sm btn-danger  delete"
                onClick={() => handleDeleteDes(doc.id)}
              >
                Delete
              </button>
            </div>
          );
        })}

      {analysisdata &&
        analysisdata.getAllAnalysisDocs.map((doc) => {
          return (
            <div className="cards">
              <h2>
                <b className="card-h1">Analysis Phase</b>
              </h2>
              <h4> Purpose : {doc.PoSW} </h4>
              <h4>Describtion : {doc.desc} </h4>
              <h4>Audience : {doc.intendedAudience} </h4>
              <h4>Introduction : {doc.intro} </h4>
              <h4>Software Requirement Specification : {doc.srs} </h4>
              <h4>Usecase : {doc.useCase} </h4>
              <br></br>
              <Link
                className="text.decoration-none btn btn-sm btn-success"
                to={`/UpdateAnalysis/${doc.id}`}
              >
                Update
              </Link>
              <br></br>
              <button
                className="text.decoration-none btn btn-sm btn-danger delete"
                onClick={() => handleDeleteAnalysis(doc.id)}
              >
                Delete
              </button>
            </div>
          );
        })}

      {initdata &&
        initdata.getAllinitialization.map((doc) => {
          return (
            <div className="cards">
              <h2>
                <b className="card-h1">Initialization Phase</b>
              </h2>
              <h4>Project Title : {doc.ptitle} </h4>
              <h4>Start Date : {doc.sdate} </h4>
              <h4>End Date : {doc.edate} </h4>
              <h4>Objectives : {doc.pobjectives} </h4>
              <h4>Project Manager : {doc.PM} </h4>
              <h4> Budget Information : {doc.Budgetinfo} </h4>
              <h4>Project Scope Statements : {doc.pscope} </h4>
              <br></br>
              <Link
                className="text.decoration-none btn btn-sm btn-success"
                to={`/Update/${doc.id}`}
              >
                Update
              </Link>
              <button
                className="text.decoration-none btn btn-sm btn-danger delete"
                onClick={() => handleDeleteInit(doc.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
