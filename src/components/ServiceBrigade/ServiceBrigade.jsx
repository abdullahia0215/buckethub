import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export default function ServiceBrigade() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({
      type: 'FETCH_SERVICE'
    })
  }, [])
  return (
    <>
      <h1>Service</h1>
      <button onClick={() => history.push("/brigades")}>
        Back To Brigades
      </button>
    </>
  );
}
