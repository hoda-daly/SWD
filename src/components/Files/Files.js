import { useQuery, gql } from "@apollo/client";

const DesignPhase = gql`
  query Query {
    getAllDesignDocs {
      url
      fileName
    }
  }
`;

const AnalysisPhase = gql`
  query Query {
    getAllAnalysisDocs {
      useCase
    }
  }
`;

export const Files = () => {
  const { data } = useQuery(DesignPhase);
  const { data: analysisdata } = useQuery(AnalysisPhase);
  if (data) {
    console.log(data);
  }
  return (
    <div>
      {data &&
        data.getAllDesignDocs.map((doc) => {
          return (
            <div className="cards">
              <h1 className="card-h1">Design Phase : {doc.fileName}</h1>
              <label>
                {doc.url != "" ? (
                  <img
                    src={doc.url}
                    alt="Image"
                    style={{ maxWidth: "300px", marginTop: "10px" }}
                  />
                ) : (
                  <div></div>
                )}
              </label>
            </div>
          );
        })}

      {analysisdata &&
        analysisdata.getAllAnalysisDocs.map((doc) => {
          return (
            <div className="cards">
              <h1 className="card-h1">Analysis Phase :</h1>
              <label>
                {doc.useCase != "" ? (
                  <img
                    src={doc.useCase}
                    alt="Image"
                    style={{ maxWidth: "300px", marginTop: "10px" }}
                  />
                ) : (
                  <div></div>
                )}
              </label>
            </div>
          );
        })}
    </div>
  );
};

export default Files;
