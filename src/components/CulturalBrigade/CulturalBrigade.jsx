import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function CulturalBrigade() {
  let [input, setInput] = useState("");
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
  const handleBucketInput = (event) => {
    setInput(event.target.value);
    console.log(input);
  };
  return (
    <>
      <h1>Cultural</h1>
      <button onClick={() => history.push("/brigades")}>
        Back To Brigades
      </button>
      <form>
        <input onChange={handleBucketInput}></input>
        <button>Submit Suggestion</button>
      </form>
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
