import React from "react";
import { useState } from "react";
import "./Initiation.css";
import { useMutation, gql } from "@apollo/client";

const CREATE_INITIALIZATION = gql`
  mutation Mutation($initialization: initializationInput) {
  createIntialization(initialization: $initialization) {
    id
  }
}
`;
  

const Initiation = () => {
  const [createIntialization] = useMutation(CREATE_INITIALIZATION,);
  const [formData, setFormData] = useState({
    ptitle: "",
    sdate: "",
    edate: "",
    pobjectives: "",
    PM: "",
    Budgetinfo: "",
    pscope: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    const{ptitle,sdate,edate,pobjectives,PM,Budgetinfo,pscope}=formData;
    if (ptitle === "") {
      alert("project Title is required!")
  }
  else if (sdate === "") {
      alert("start Date is Required!");
  }

  else if (edate === "") {
      alert("finish Date is Required!");
  }
  else if (pobjectives === "") {
      alert("pobjectives are Required!");
  }
  else if (PM === "") {
      alert("project Manager is Required!");
  }
  else if (Budgetinfo === "") {
      alert("Budget Information is Required!");
  }
  else if (pscope ==="") {
      alert("Project Scope Statements is Required!");
  }
  else{
    createIntialization({variables:{initialization:{ptitle,sdate,edate,pobjectives,PM,Budgetinfo,pscope}}})
    console.log("Form Data:", formData);
    alert("Data successfully saved!");}
  };

  const handleReset = () => {
    // Handle resetting the form fields
    setFormData({
      ptitle: "",
      sdate: "",
      edate: "",
      pobjectives: "",
      PM: "",
      Budgetinfo: "",
      pscope: "",
    });
  };

  return (
    <div className="form-container">
      <form>
        <div>
          <h1>Project Charter...</h1>{" "}
        </div>
        <label>
          Project Title:
          <input
            type="text"
            name="ptitle"
            value={formData.ptitle}
            onChange={handleChange}
          />
        </label>
        <br></br>

        <label>
          Start Date:
          <input
            type="date"
            name="sdate"
            value={formData.sdate}
            onChange={handleChange}
          />
        </label>
        <br></br>

        <label>
          Finish Date:
          <input
            type="date"
            name="edate"
            value={formData.edate}
            onChange={handleChange}
          />
        </label>
        <br></br>

        <label>
          Objectives:
          <textarea
            className="textareah"
            name="pobjectives"
            value={formData.pobjectives}
            onChange={handleChange}
          />
        </label>
        <br></br>

        <label>
          Project Manager:
          <input
            type="text"
            name="PM"
            value={formData.PM}
            onChange={handleChange}
          />
        </label>
        <br></br>

        <label>
          Budget Information:
          <input
            type="text"
            name="Budgetinfo"
            value={formData.Budgetinfo}
            onChange={handleChange}
          />
        </label>
        <br></br>

        <label>
          Project Scope Statements:
          <input
            type="text"
            name="pscope"
            value={formData.pscope}
            onChange={handleChange}
          />
        </label>
        <br></br>

        <button className="btn-block" type="button" onClick={handleSave}>
          Save
        </button>
        <br></br>
        <button className="btn-block" type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default Initiation;
