import React from "react";
import { useState } from "react";
import "./Requirments.css";
import { useMutation, gql } from "@apollo/client";

const UPLOAD_FILE = gql`
  mutation Mutation($file: Upload!) {
  uploadFile(file: $file) {
    url
  }
}
  
`;
const CREATE_ANALYSIS = gql`
mutation Mutation($analysis: analysisInput) {
  createAnalysis(analysis: $analysis) {
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


const Requirement = () => {
  
  const [image, setImage] = useState("");
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => {
      let imageUrl = data.uploadFile.url;
      setImage(imageUrl);
      
    },
  });
  
  const [createAnalysis] = useMutation(CREATE_ANALYSIS,);
  const [formData, setFormData] = useState({
    intro: "",
    PoSW: "",
    intendedAudience: "",
    desc: "",
    srs: "",
    
    
    
    
    
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    uploadFile({
      variables: {
        file: file,
      },
      
      
    });
    
  };
 
 

  const handleSave = (e) => {
    const{intro,PoSW,intendedAudience,desc,srs}=formData;
    const useCase=image;
    console.log("TheUrl : ", useCase);
   // Handle saving the form data (you can send it to an API, update state, etc.)
    createAnalysis({
      variables: {
        analysis: {
          intro,
          PoSW,
          intendedAudience,
          desc,
          srs,
          useCase
        },
      },
    });
    console.log("Form Data:", formData);
    
    alert("Data successfully saved!");
    console.log("Form Data:", formData);
  };

  const handleReset = () => {
    // Handle resetting the form fields
    setFormData({
      intro: "",
      PoSW: "",
      intendedAudience: "",
      desc: "",
      srs: "",
      
    });
  };

  return (
    <div className="form-container">
      <form>
        <div>
          <h1 className="analysis">
            Software Requirement Specification(SRS)...
          </h1>
        </div>
        <label>
          Intoduction:
          <input
            type="text"
            name="intro"
            value={formData.intro}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <hr></hr>

        <label>
          Purpose of Software being developed:
          <input
            type="text"
            name="PoSW"
            value={formData.PoSW}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <hr></hr>

        <label>
          Intended Audience:
          <input
            type="text"
            name="intendedAudience"
            value={formData.intendedAudience}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <label>
          Overall Description:
          <input
            type="text"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
          />
        </label>
        <br></br>
        
        <hr></hr>

        <label>
          System Features and Requirement:
          <h6>1-Funcational Requirement</h6>
          <h6>2-Non-funcational Requirement</h6>
          <h6>3-External Interface Requirement</h6>
          <textarea
            name="srs"
            value={formData.srs}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <hr></hr>

        <label>
          Use Case:
          <div>
      <h1>Upload File</h1>
      <input type="file" onChange={handleFileChange} />
      {image != "" ? <img src={image} alt="Image"  style={{ maxWidth: "100px", marginTop: "10px" }}/> : <div></div>}
      
    </div>
        </label>
        <br></br>
        <hr></hr>

        <button type="button" onClick={handleSave}>
          Save
        </button>
        <br></br>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default Requirement;
