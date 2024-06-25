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
          type: "DELETE_SERVICE_ITEM",
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
      type: "ADD_SERVICE_ITEM",
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

  return (
    <>
      <div style={{ margin: "40px" }}>
        <h1 style={{ margin: "20px", textAlign: "center" }}>Service</h1>
        <button onClick={() => history.push("/brigades")} className="btn">
          Back To Brigades
        </button>
        <form onSubmit={addItem} className="form-inline">
          <input
            value={input}
            onChange={handleBucketInput}
            className="form-control"
            placeholder="Share your ideas for giving back..."
            required
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
            {serviceBrigade.map((serviceItem) => (
              <tr key={serviceItem.id}>
                <td>{serviceItem.public_bucket_list_item}</td>
                <td>
                  {user.id === serviceItem.user_id ? (
                    <button
                      onClick={() => deleteItem(serviceItem.id)}
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
                        serviceItem.public_bucket_list_item,
                        serviceItem.total_votes
                      )
                    }
                    className="btn"
                  >
                    Add To Bucket List
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => upvoteItem(serviceItem.id)}
                    style={{
                      backgroundColor: userVotes.some(
                        (votedItem) =>
                          votedItem.bucket_list_item_id === serviceItem.id &&
                          votedItem.upvote
                      )
                        ? "orange"
                        : "inherit",
                        padding: '10px',
                        marginRight: '10px'
                    }}
                    className="btn"
                  >
                    ⬆
                  </button>

                  {serviceItem.total_votes}

                  <button
                    onClick={() => downvoteItem(serviceItem.id)}
                    style={{
                      backgroundColor: userVotes.some(
                        (votedItem) =>
                          votedItem.bucket_list_item_id === serviceItem.id &&
                          votedItem.downvote
                      )
                        ? "blue"
                        : "inherit",
                        padding: '10px',
                        marginLeft: '10px'
                    }}
                    className="btn"
                  >
                    ⬇
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
