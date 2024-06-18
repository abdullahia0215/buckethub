import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
export default function CulturalBrigade() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "FETCH_CULTURE",
    });
  }, []);
  return (
    <>
      <h1>Cultural</h1>
      <button onClick={() => history.push("/brigades")}>
        Back To Brigades
      </button>
    </>
  );
}
