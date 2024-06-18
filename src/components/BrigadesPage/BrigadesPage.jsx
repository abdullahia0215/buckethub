import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function BrigadesPage() {
  const history = useHistory();
  return (
    <>
      <h1>Brigades</h1>
      <button onClick={() => history.push("/adventure")}>
        Adventure/Travel
      </button>
      <button onClick={() => history.push("/culture")}>
        Cultural/Artistic Experiences
      </button>
      <button onClick={() => history.push("/service")}>
        Service/Contribution
      </button>
      <button onClick={() => history.push("/growth")}>
        Personal Growth/Learning
      </button>
    </>
  );
}
