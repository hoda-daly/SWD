import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";
const UPLOAD_FILE = gql`
  mutation Mutation($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

const GetAnalysis = gql`
  query Query($id: ID!) {
    getAnalysisDoc(id: $id) {
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
const UPDATE_ANALYSIS = gql`
  mutation Mutation($updateAnalysisId: ID!, $analysis: analysisInput) {
    updateAnalysis(id: $updateAnalysisId, analysis: $analysis) {
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
const UpdateAnalysis = () => {
  const { id } = useParams();
  const [updateAnalysis] = useMutation(UPDATE_ANALYSIS);
  const { data } = useQuery(GetAnalysis, { variables: { id } });
  if (data) {
    console.log(data);
  }
  const [image, setImage] = useState("");
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => {
      let imageUrl = data.uploadFile.url;
      setImage(imageUrl);
    },
  });
  const [values, setValues] = useState({
    id: id,
    Intoduction: "",
    Purpose: "",
    Intended: "",
    OverallDescription: "",
    SystemFeatures: "",
    UseCase: "",
  });

  useEffect(() => {
    if (data) {
      const { intro, PoSW, intendedAudience, desc, srs, useCase } =
        data.getAnalysisDoc;

      setValues({
        Intoduction: intro,
        Purpose: PoSW,
        Intended: intendedAudience,
        OverallDescription: desc,
        SystemFeatures: srs,
        UseCase: useCase,
      });
    }
  }, [data]);
  console.log(values);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    uploadFile({
      variables: {
        file: file,
      },
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const intro = values.Intoduction;
    const PoSW = values.Purpose;
    const intendedAudience = values.Intended;
    const desc = values.OverallDescription;
    const srs = values.SystemFeatures;
    const updateAnalysisId = id;
    if (image != "") {
      const useCase = image;
      updateAnalysis({
        variables: {
          updateAnalysisId,
          analysis: { intro, PoSW, intendedAudience, desc, srs, useCase },
        },
      });
      navigate("/");
    } else {
      const useCase = values.UseCase;
      updateAnalysis({
        variables: {
          updateAnalysisId,
          analysis: { intro, PoSW, intendedAudience, desc, srs, useCase },
        },
      });
      navigate("/");
    }
    alert("Data successfully saved!");
  };

  return (
    <div className="form-container">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <h1 className="analysis">
              Software Requirement Specification(SRS)...
            </h1>
          </div>
          <label>
            Intoduction:
            <input
              type="text"
              name="Intoduction"
              value={values.Intoduction}
              onChange={(e) =>
                setValues({ ...values, Intoduction: e.target.value })
              }
            />
          </label>
          <br></br>
          <hr></hr>

          <label>
            Purpose of Software being developed:
            <input
              type="text"
              name="Purpose"
              value={values.Purpose}
              onChange={(e) =>
                setValues({ ...values, Purpose: e.target.value })
              }
            />
          </label>
          <br></br>
          <hr></hr>

          <label>
            Intended Audience:
            <input
              type="text"
              name="Intended"
              value={values.Intended}
              onChange={(e) =>
                setValues({ ...values, Intended: e.target.value })
              }
            />
          </label>
          <br></br>
          <hr></hr>

          <label>
            Overall description of the Software :
            <input
              type="text"
              name="OverallDescription"
              value={values.OverallDescription}
              onChange={(e) =>
                setValues({ ...values, OverallDescription: e.target.value })
              }
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
              name="SystemFeatures"
              value={values.SystemFeatures}
              onChange={(e) =>
                setValues({ ...values, SystemFeatures: e.target.value })
              }
            />
          </label>
          <label1>
            {" "}
            Use Case :
            {values.UseCase != "" ? (
              <img
                src={values.UseCase}
                alt="Image"
                style={{ maxWidth: "300px", marginTop: "10px" }}
              />
            ) : (
              <div></div>
            )}
          </label1>
          <label1>
            Upload New Use Case :
            <input type="file" onChange={handleFileChange} />
            {image != "" ? (
              <img
                src={image}
                alt="Image"
                style={{ maxWidth: "100px", marginTop: "10px" }}
              />
            ) : (
              <div></div>
            )}
          </label1>
          <br></br>
          <hr></hr>

          <label></label>
          <br></br>
          <hr></hr>

          <button
            className="text.decoration-none btn btn-sm btn-success"
            type="button"
            onClick={handleSubmit}
          >
            Update
          </button>
          <br></br>
        </form>
      </div>
    </div>
  );
};

export default UpdateAnalysis;
