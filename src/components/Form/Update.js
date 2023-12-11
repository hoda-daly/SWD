import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

const GetInit = gql`
  query Query($id: ID!) {
    getInitDoc(id: $id) {
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
const UPDATE_INITIALIZATIN = gql`
  mutation Mutation(
    $updateIntializationId: ID!
    $initialization: initializationInput
  ) {
    updateIntialization(
      id: $updateIntializationId
      initialization: $initialization
    ) {
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

const Update = () => {
  const [updateIntialization] = useMutation(UPDATE_INITIALIZATIN);
  const { id } = useParams();
  const { data } = useQuery(GetInit, { variables: { id } });
  if (data) {
    console.log(data);
  }

  const [values, setValues] = useState({
    id: id,
    projectTitle: "",
    startDate: "",
    finishDate: "",
    objectives: "",
    projectManager: "",
    BudgetInformation: "",
    ProjectScopeStatements: "",
  });
  useEffect(() => {
    if (data) {
      const { ptitle, sdate, edate, pobjectives, PM, Budgetinfo, pscope } =
        data.getInitDoc;

      setValues({
        projectTitle: ptitle,
        startDate: sdate,
        finishDate: edate,
        objectives: pobjectives,
        projectManager: PM,
        BudgetInformation: Budgetinfo,
        ProjectScopeStatements: pscope,
      });
    }
  }, [data]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const ptitle = values.projectTitle;
    const sdate = values.startDate;
    const edate = values.finishDate;
    const pobjectives = values.objectives;
    const PM = values.projectManager;
    const Budgetinfo = values.BudgetInformation;
    const pscope = values.ProjectScopeStatements;
    const updateIntializationId = id;
    console.log(ptitle + " " + sdate);
    updateIntialization({
      variables: {
        updateIntializationId,
        initialization: {
          ptitle,
          sdate,
          edate,
          pobjectives,
          PM,
          Budgetinfo,
          pscope,
        },
      },
    });
    navigate("/");
  };

  return (
    <div className="form-container">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Update Charter...</h1>
          </div>
          <label>
            Project Title:
            <input
              type="text"
              name="projectTitle"
              className="form-control"
              placeholder="Enter New Name"
              value={values.projectTitle}
              onChange={(e) =>
                setValues({ ...values, projectTitle: e.target.value })
              }
            />
          </label>
          <br></br>

          <label>
            Start Date:
            <input
              type="text"
              name="startDate"
              value={values.startDate}
              onChange={(e) =>
                setValues({ ...values, startDate: e.target.value })
              }
            />
          </label>
          <br></br>

          <label>
            Finish Date:
            <input
              type="text"
              name="finishDate"
              value={values.finishDate}
              onChange={(e) =>
                setValues({ ...values, finishDate: e.target.value })
              }
            />
          </label>
          <br></br>

          <label>
            Objectives:
            <textarea
              className="textareah"
              name="objectives"
              value={values.objectives}
              onChange={(e) =>
                setValues({ ...values, objectives: e.target.value })
              }
            />
          </label>
          <br></br>

          <label>
            Project Manager:
            <input
              type="text"
              name="projectManager"
              value={values.projectManager}
              onChange={(e) =>
                setValues({ ...values, projectManager: e.target.value })
              }
            />
          </label>
          <br></br>

          <label>
            Budget Information:
            <input
              type="text"
              name="BudgetInformation"
              value={values.BudgetInformation}
              onChange={(e) =>
                setValues({ ...values, BudgetInformation: e.target.value })
              }
            />
          </label>
          <br></br>

          <label>
            Project Scope Statements:
            <input
              type="text"
              name="ProjectScopeStatements"
              value={values.ProjectScopeStatements}
              onChange={(e) =>
                setValues({ ...values, ProjectScopeStatements: e.target.value })
              }
            />
          </label>
          <br></br>

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
export default Update;
