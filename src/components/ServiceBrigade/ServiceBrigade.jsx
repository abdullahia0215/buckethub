import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function ServiceBrigade() {
  let [input, setInput] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const serviceBrigade = useSelector(
    (store) => store.brigadeReducers.serviceReducer
  );
  const user = useSelector((store) => store.user);
  useEffect(() => {
    dispatch({
      type: "FETCH_SERVICE",
    });
  }, []);

  const handleBucketInput = (event) => {
    setInput(event.target.value);
    console.log(input);
  };

  const deleteItem = (itemID) => {
    console.log("click");
    dispatch({
      type: "DELETE_SERVICE_ITEM",
      payload: itemID,
    });
  };

  const addItem = (event) => {
    event.preventDefault();
    dispatch({
      type: "ADD_SERVICE_ITEM",
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

  return (
    <>
      <h1>Service</h1>
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
          {serviceBrigade.map((serviceItem) => (
            <tr key={serviceItem.id}>
              <td>{serviceItem.public_bucket_list_item}</td>
              <td>
                {user.id === serviceItem.user_id ? (
                  <button onClick={() => deleteItem(itemID)}>Delete</button>
                ) : (
                  ""
                )}
              </td>
              <td>
                <button
                  onClick={() =>
                    addToMyBucket(serviceItem.public_bucket_list_item)
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
