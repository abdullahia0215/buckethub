import { useHistory } from "react-router-dom";
import "../BrigadesPage/BrigadesPage.css";

export default function BrigadesPage() {
  const history = useHistory();

  return (
    <>
      <h1>Brigades</h1>
      <div className="buttons-container">
        <table>
          <tbody>
            <tr>
              <td>
                <button
                  onClick={() => history.push("/adventure")}
                  id="adventure-button"
                  className="btn"
                >
                  Adventure/Travel
                </button>
              </td>
              <td>
                <button
                  onClick={() => history.push("/culture")}
                  id="culture-button"
                  className="btn"
                >
                  Cultural/Artistic Experiences
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  onClick={() => history.push("/service")}
                  id="service-button"
                  className="btn"
                >
                  Service/Contribution
                </button>
              </td>
              <td>
                <button
                  onClick={() => history.push("/growth")}
                  id="growth-button"
                  className="btn"
                >
                  Personal Growth/Learning
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
