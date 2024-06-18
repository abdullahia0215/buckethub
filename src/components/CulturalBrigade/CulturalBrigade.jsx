import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
export default function CulturalBrigade() {
  const history = useHistory();
  const dispatch = useDispatch();
  const cultureBrigade = useSelector(
    (store) => store.brigadeReducers.cultureReducer
  );
  const user = useSelector((store) => store.user);
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
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Add To Your Bucket list</th>
          </tr>
          {cultureBrigade.map((cultureItem) => (
            <tr key={cultureItem.id}>
              <td>{cultureItem.public_bucket_list_item}</td>
              {user.id === cultureItem.user_id ? (
                <td>
                  <button>Delete</button>
                </td>
              ) : (
                ""
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
