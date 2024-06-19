import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
export default function AdventureBrigade() {
  let [input, setInput] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const adventureBrigade = useSelector(
    (store) => store.brigadeReducers.adventureReducer
  );
  const user = useSelector((store) => store.user);
  useEffect(() => {
    dispatch({
      type: "FETCH_ADVENTURE",
    });
  }, []);

  const deleteItem = (itemID) => {
    console.log("click");
    dispatch({
      type: "DELETE_ADVENTURE_ITEM",
      payload: itemID,
    });
  };

  const addItem = () => {
    dispatch({
      type: "ADD_ADVENTURE_ITEM",
      payload: input,
    });
    setInput("");
  };

  const addToMyBucket = (event) => {
    const itemForBucketList = (event.target.closest('tr').getAttribute('data-value'))
    dispatch({
      type: 'ADD_ADVENTURE_USER_BUCKET',
      payload: itemForBucketList
    })
  }

  const handleBucketInput = (event) => {
    setInput(event.target.value);
    console.log(input);
  };

  return (
    <>
      <h1>Adventure</h1>
      <button onClick={() => history.push("/brigades")}>
        Back To Brigades
      </button>
      <form onSubmit={addItem}>
        <input value={input} onChange={handleBucketInput} required></input>
        <button>Submit Suggestion</button>
      </form>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Delete</th>
            <th>Add To Your Bucket List</th>
          </tr>
          {adventureBrigade.map((adventureItem) => (
            <tr key={adventureItem.id} data-value={adventureItem.public_bucket_list_item}>
              <td>{adventureItem.public_bucket_list_item}</td>
              <td>
                {user.id === adventureItem.user_id ? (
                  <button onClick={() => deleteItem(adventureItem.id)}>
                    Delete
                  </button>
                ) : (
                  ""
                )}
              </td>
              <td>
                <button onClick={addToMyBucket}>Add To Bucket List</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
