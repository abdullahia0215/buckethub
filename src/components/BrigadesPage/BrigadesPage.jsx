import { useHistory } from "react-router-dom";
import "../BrigadesPage/BrigadesPage.css";

export default function BrigadesPage() {
  const history = useHistory();

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "30px" }}>Brigades</h1>
      <div className="buttons-container">
        <table>
          <tbody>
            <tr>
              <td>
                <button
                  onClick={() => history.push("/adventure")}
                  id="adventure-button"
                  className="btn brigadeBtn"
                >
                  Adventure/Travel
                </button>
              </td>
              <td>
                <button
                  onClick={() => history.push("/culture")}
                  id="culture-button"
                  className="btn brigadeBtn"
                >
                  Cultural/Artistic
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  onClick={() => history.push("/service")}
                  id="service-button"
                  className="btn brigadeBtn"
                >
                  Service/Contribution
                </button>
              </td>
              <td>
                <button
                  onClick={() => history.push("/growth")}
                  id="growth-button"
                  className="btn brigadeBtn"
                >
                  Personal Growth
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
