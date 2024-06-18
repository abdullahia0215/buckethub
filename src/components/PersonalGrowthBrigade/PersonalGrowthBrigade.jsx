import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
export default function PersonalGrowthBrigade() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({
      type: 'FETCH_GROWTH'
    })
  }, [])
  return (
    <>
      <h1>PersonalGrowth</h1>
      <button onClick={() => history.push("/brigades")}>
        Back To Brigades
      </button>
    </>
  );
}
