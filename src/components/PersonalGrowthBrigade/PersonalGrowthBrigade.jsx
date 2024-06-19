import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function PersonalGrowthBrigade() {
  let [input, setInput] = useState("");
  const user = useSelector((store) => store.user);
  const growthBrigade = useSelector(
    (store) => store.brigadeReducers.growthReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({
      type: "FETCH_GROWTH",
    });
  }, []);

  const deleteItem = (itemID) => {
    console.log("click");
    dispatch({
      type: "DELETE_GROWTH_ITEM",
      payload: itemID,
    });
  };

  const addItem = (event) => {
    event.preventDefault();
    dispatch({
      type: "ADD_GROWTH_ITEM",
      payload: input,
    });
    setInput("");
  };

  const addToMyBucket = (itemToAdd) => {
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
      <h1>PersonalGrowth</h1>
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
            <th>Delete</th>
            <th>Add To Your Bucket list</th>
          </tr>
          {growthBrigade.map((growthItem) => (
            <tr key={growthItem.id}>
              <td>{growthItem.public_bucket_list_item}</td>

              <td>
                {user.id === growthItem.user_id ? (
                  <button onClick={() => deleteItem(growthItem.id)}>
                    Delete
                  </button>
                ) : (
                  ""
                )}
              </td>
              <td>
              <button
                  onClick={() =>
                    addToMyBucket(growthItem.public_bucket_list_item)
                  }
                >
                  Add To Bucket List
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
