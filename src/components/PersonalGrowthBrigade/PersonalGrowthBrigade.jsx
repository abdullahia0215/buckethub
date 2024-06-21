import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import swal from "sweetalert";
export default function PersonalGrowthBrigade() {
  let [input, setInput] = useState("");
  const user = useSelector((store) => store.user);
  const growthBrigade = useSelector(
    (store) => store.brigadeReducers.growthReducer
  );
  const userVotes = useSelector((store) => store.userVoteReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({
      type: "FETCH_GROWTH",
    });
  }, []);

  const upvoteItem = (itemID) => {
    console.log("upvoted", itemID);
    dispatch({
      type: "UPVOTE_GROWTH",
      payload: itemID,
    });
  };

  const downvoteItem = (itemID) => {
    dispatch({
      type: "DOWNVOTE_GROWTH",
      payload: itemID,
    });
  };
  const deleteItem = (itemID) => {
    swal({
      title: "Are you sure?",
      text: "This will delete the public item for everyone!",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancel",
          value: null,
          visible: true,
          className: "",
          closeModal: true,
        },
        confirm: {
          text: "Delete",
          value: true,
          visible: true,
          className: "",
          closeModal: true,
        },
      },
    }).then((value) => {
      if (value) {
        dispatch({
          type: "DELETE_GROWTH_ITEM",
          payload: itemID,
        });
        swal("Item deleted successfully!", {
          icon: "success",
        });
      }
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
    }
  };

  const handleBucketInput = (event) => {
    setInput(event.target.value);
    console.log(input);
  };
  return (
    <>
      <div style={{ margin: "40px" }}>
        <h1 style={{ margin: "20px", textAlign: "center" }}>Personal Growth</h1>
        <button onClick={() => history.push("/brigades")} className="btn">
          Back To Brigades
        </button>
        <form onSubmit={addItem} className="form-inline">
          <input onChange={handleBucketInput} className="form-control" placeholder="Share your ideas for personal growth..."></input>

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
            {growthBrigade.map((growthItem) => (
              <tr key={growthItem.id}>
                <td>{growthItem.public_bucket_list_item}</td>

                <td>
                  {user.id === growthItem.user_id ? (
                    <button
                      onClick={() => deleteItem(growthItem.id)}
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
                      addToMyBucket(
                        growthItem.public_bucket_list_item,
                        growthItem.total_votes
                      )
                    }
                    className="btn"
                  >
                    Add To Bucket List
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => upvoteItem(growthItem.id)}
                    style={{
                      backgroundColor: userVotes.some(
                        (votedItem) =>
                          votedItem.bucket_list_item_id === growthItem.id &&
                          votedItem.upvote
                      )
                        ? "orange"
                        : "inherit",
                    }}
                    className="btn"
                  >
                    ⬆️
                  </button>

                  {growthItem.total_votes}

                  <button
                    onClick={() => downvoteItem(growthItem.id)}
                    style={{
                      backgroundColor: userVotes.some(
                        (votedItem) =>
                          votedItem.bucket_list_item_id === growthItem.id &&
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
