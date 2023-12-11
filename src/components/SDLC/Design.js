import React from "react";
import { useState } from "react";
import "./Design.css";
import { useMutation, gql } from "@apollo/client";
const UPLOAD_FILE = gql`
  mutation Mutation($file: Upload!) {
  uploadFile(file: $file) {
    url
  }
}
  
`;
const CREATE_DESIGN=gql`
mutation Mutation($design: designInput) {
  createDesign(design: $design) {
    id
    fileName
    url
  }
}

 `;
const initialImageArray = [];
const Design = () => {
  const [imageArray, setImageArray] = useState(initialImageArray);
  const [createDesign] = useMutation(CREATE_DESIGN,);
  
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => {
      let imageUrl = data.uploadFile.url;
      
      setImageArray(prevArray => [...prevArray, imageUrl]);
     
    
    },
  });
  console.log(imageArray);
  

  
  
  const [documents, setDocuments] = useState([{ fileName: "", image: null }]);

  const handleFileChange = (index ,e) => {
    const file = e.target.files[0];
    setDocuments((prevDocuments) =>
    prevDocuments.map((doc, i) =>
    i === index ? { fileName: doc.fileName, image: file } : doc,
   
   
    ),
    uploadFile({
      variables: {
        file: file,
      },
      
      
    })
    
    
    ,
   
    
    )
    
};
  

  const handleChange = (index, e) => {
    const { type } = e.target;

    
      const value = e.target.value;

      setDocuments((prevDocuments) =>
        prevDocuments.map((doc, i) =>
          i === index ? { ...doc, fileName: value } : doc
        )
      );
    
  };

  const handleDeleteDocument = (index) => {
    setDocuments((prevDocuments) =>
      prevDocuments.filter((doc, i) => i !== index)
    );
  };

  const handleAddDocument = () => {
    setDocuments((prevDocuments) => [
      ...prevDocuments,
      { fileName: "", image: null },
    ]);
  };

  const handleSave = () => {

    for(let i = 0; i < documents.length; i++) {
      const fileName=documents[i].fileName;
      const url=imageArray[i];
      createDesign({
        variables: {
          design: {
            fileName,
            url
          },
        },
      });
    }
    alert("Data successfully saved!");
    console.log("Documents:", documents);
  };

  return (
    <div className="form-container">
      <div>
        <h1>System Design Document (SDD)</h1>
      </div>
      <div>
        <br />
        <h6>
          Insert documents as Images (UML Diagrams, Database Design, User
          Interface Design)
        </h6>
        <br />
      </div>
      <button type="button" onClick={handleAddDocument}>
        Add New Document
      </button>
      <hr />
      {documents.map((document, index) => (
        <div key={index} className="document-section">
          <label>
            File Name:
            <input
              type="text"
              name={`fileName-${index}`}
              value={document.fileName}
              onChange={(e) => handleChange(index, e)}
            />
          </label>

          <label>
            Upload Image:
            <input
              type="file"
              name={`image-${index}`}
              accept="image/*"
              onChange={(e) => handleFileChange(index, e)}
            />
            {imageArray[index] != "" ? <img src={imageArray[index]} alt="Image"  style={{ maxWidth: "100px", marginTop: "10px" }}/> : <div></div>}
           
          </label>
          <button
            className="delete"
            type="button"
            onClick={() => handleDeleteDocument(index)}
          >
            Delete Document
          </button>
          <hr />
        </div>
      ))}

      <button type="button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default Design;
