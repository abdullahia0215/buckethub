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
  const userVotes = useSelector((store) => store.userVoteReducer);

  useEffect(() => {
    dispatch({
      type: "FETCH_ADVENTURE",
    });
  }, []);

  const upvoteItem = (itemID) => {
    console.log("upvoted", itemID);
    dispatch({
      type: "UPVOTE_ADVENTURE",
      payload: itemID,
    });
  };

  const downvoteItem = (itemID) => {
    dispatch({
      type: "DOWNVOTE_ADVENTURE",
      payload: itemID,
    });
  };

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

  const addToMyBucket = (itemToAdd, vote) => {
    if (vote <= 0) {
      swal({
        title: "Add to Bucket List",
        text: "This item has a low vote. Are you sure you want to add it to your bucket list?",
        icon: "warning",
        buttons: {
          cancel: {
            text: "Cancel",
            value: null,
            visible: true,
            closeModal: true,
          },
          confirm: {
            text: "Add to Bucket List",
            value: true,
            visible: true,
            closeModal: true,
          },
        },
      }).then((value) => {
        if (value) {
          dispatch({
            type: "ADD_TO_USER_BUCKET",
            payload: itemToAdd,
          });
          swal("Successfully added to your bucket list!", {
            icon: "success",
          });
        } else {
          return;
        }
      });
    } else {

      dispatch({
        type: "ADD_TO_USER_BUCKET",
        payload: itemToAdd,
      });
      swal("Successfully added to your bucket list!", {
        icon: "success",
      });
    }
  };


  const handleBucketInput = (event) => {
    setInput(event.target.value);
    console.log(input);
  };

  return (
    <>
      <div style={{ margin: "40px" }}>
        <h1 style={{ margin: "20px", textAlign: "center" }}>Adventure</h1>
        <button onClick={() => history.push("/brigades")} className="btn">
          Back To Brigades
        </button>
        <form onSubmit={addItem} className="form-inline">
          <input
            value={input}
            onChange={handleBucketInput}
            required
            className="form-control"
            placeholder="Share your ideas for an adventure..."
          ></input>
          <button className="btn">Submit Suggestion</button>
        </form>
        <table className="table table-hover">
          <tbody>
            <tr>
            <th>Name</th>
              <th>Delete</th>
              <th>Add To Your Bucket list</th>
              <th>Votes</th>
            </tr>
            {adventureBrigade.map((adventureItem) => (
              <tr key={adventureItem.id}>
                <td>{adventureItem.public_bucket_list_item}</td>
                <td>
                  {user.id === adventureItem.user_id ? (
                    <button
                      onClick={() => deleteItem(adventureItem.id)}
                      className="btn"
                    >
                      Delete
                    </button>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  <button
                    onClick={() =>
                      addToMyBucket(adventureItem.public_bucket_list_item, adventureItem.total_votes)
                    }
                    className="btn"
                  >
                    Add To Bucket List
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => upvoteItem(adventureItem.id)}
                    style={{
                      backgroundColor: userVotes.some(
                        (votedItem) =>
                          votedItem.bucket_list_item_id === adventureItem.id &&
                          votedItem.upvote
                      )
                        ? "orange"
                        : "inherit",
                    }}
                    className="btn"
                  >
                    ⬆️
                  </button>

                  {adventureItem.total_votes}

                  <button
                    onClick={() => downvoteItem(adventureItem.id)}
                    style={{
                      backgroundColor: userVotes.some(
                        (votedItem) =>
                          votedItem.bucket_list_item_id === adventureItem.id &&
                          votedItem.downvote
                      )
                        ? "blue"
                        : "inherit",
                    }}
                    className="btn"
                  >
                    ⬇️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
