import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function ServiceBrigade() {
  const history = useHistory();
  return (
    <>
      <h1>Service</h1>
      <button onClick={() => history.push("/brigades")}>
        Back To Brigades
      </button>
    </>
  );
}
