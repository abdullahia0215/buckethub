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

  const userVotes = useSelector((store) => store.userVoteReducer);
  const user = useSelector((store) => store.user);
  useEffect(() => {
    dispatch({
      type: "FETCH_SERVICE",
    });
  }, []);

  const upvoteItem = (itemID) => {
    console.log("upvoted", itemID);
    dispatch({
      type: "UPVOTE_SERVICE",
      payload: itemID,
    });
  };

  const downvoteItem = (itemID) => {
    dispatch({
      type: "DOWNVOTE_SERVICE",
      payload: itemID,
    });
  };

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
                  <button onClick={() => deleteItem(serviceItem.id)}>
                    Delete
                  </button>
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
              <td>
                {/* <button onClick={() => upvoteItem(serviceItem.id)}>⬆️</button> */}
                {userVotes.map((votedItem) => {
                  if (votedItem.bucket_list_item_id === serviceItem.id) {
                    return votedItem.upvote ? (
                      <button
                        onClick={() => upvoteItem(serviceItem.id)}
                        style={{ backgroundColor: "orange" }}
                      >
                        ⬆️
                      </button>
                    ) : (
                      <button onClick={() => upvoteItem(serviceItem.id)}>
                        ⬆️
                      </button>
                    );
                  } else {
                    return null;
                  }
                })}
                {serviceItem.total_votes}
                {userVotes.map((votedItem) => {
                  if (votedItem.bucket_list_item_id === serviceItem.id) {
                    return votedItem.downvote ? (
                      <button
                        onClick={() => downvoteItem(serviceItem.id)}
                        style={{ backgroundColor: "blue" }}
                      >
                        ⬇️
                      </button>
                    ) : (
                      <button onClick={() => downvoteItem(serviceItem.id)}>
                        ⬇️
                      </button>
                    );
                  } else {
                    return null;
                  }
                })}
                {/* <button onClick={() => downvoteItem(serviceItem.id)}>⬇️</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
