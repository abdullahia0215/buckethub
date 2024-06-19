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

  const upvoteItem = (itemID) => {
    console.log("upvoted", itemID);
    dispatch({
      type: "UPVOTE_CULTURE",
      payload: itemID,
    });
  };

  const downvoteItem = (itemID) => {
    dispatch({
      type: "DOWNVOTE_CULTURE",
      payload: itemID,
    });
  };

  const deleteItem = (itemID) => {
    console.log("click");
    dispatch({
      type: "DELETE_CULTURE_ITEM",
      payload: itemID,
    });
  };

  const addItem = (event) => {
    event.preventDefault();
    dispatch({
      type: "ADD_CULTURE_ITEM",
      payload: input,
    });
    setInput("");
  };

  const addToMyBucket = (itemToAdd) => {
    console.log("weeee");
    dispatch({
      type: "ADD_TO_USER_BUCKET",
      payload: itemToAdd,
    });
  };

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
      <form onSubmit={addItem}>
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
              <td>
                {user.id === cultureItem.user_id ? (
                  <button onClick={() => deleteItem(cultureItem.id)}>
                    Delete
                  </button>
                ) : (
                  ""
                )}
              </td>
              <td>
                <button
                  onClick={() =>
                    addToMyBucket(cultureItem.public_bucket_list_item)
                  }
                >
                  Add To Bucket List
                </button>
              </td>
              <td>
                <button onClick={() => upvoteItem(cultureItem.id)}>⬆️</button>
                {cultureItem.total_votes}
                <button onClick={() => downvoteItem(cultureItem.id)}>⬇️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
