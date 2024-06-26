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
  const userVotes = useSelector((store) => store.userVoteReducer);

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
          type: "DELETE_CULTURE_ITEM",
          payload: itemID,
        });
        swal("Item deleted successfully!", {
          icon: "success",
        });
      }
    });
  };

  const addItem = () => {
    swal({
      title: "Are you sure?",
      text: "You are about to add an item to a public board. Everyone will be able to see it.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willAdd) => {
      if (willAdd) {
        dispatch({
          type: "ADD_CULTURE_ITEM",
          payload: input,
        });
        setInput("");
        swal("Item added successfully!", {
          icon: "success",
        });
      } else {
        return;
      }
    });
  };

  const addToMyBucket = (itemToAdd, vote) => {
    if (vote <= 0) {
      swal({
        title: "Add to Bucket List",
        text: "This item has a low vote/no votes. Are you sure you want to add it to your bucket list?",
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
      <div style={{ margin: "80px" }}>
        <h1 style={{ margin: "20px", textAlign: "center" }}>Cultural</h1>
        <h4 style={{ textAlign: "center", marginTop: "30px" }}>| {cultureBrigade.length} current cultural suggestions |</h4>
        <button onClick={() => history.push("/brigades")} className="btn">
          Back To Brigades
        </button>
        <form onSubmit={addItem} className="form-inline">
          <input
            value={input}
            onChange={handleBucketInput}
            className="form-control"
            placeholder="Share your ideas for exploring cultures..."
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
            {cultureBrigade.map((cultureItem) => (
              <tr key={cultureItem.id}>
                <td>{cultureItem.public_bucket_list_item}</td>
                <td>
                  {user.id === cultureItem.user_id ? (
                    <button
                      onClick={() => deleteItem(cultureItem.id)}
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
                        cultureItem.public_bucket_list_item,
                        cultureItem.total_votes
                      )
                    }
                    className="btn"
                  >
                    Add To Bucket List
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => upvoteItem(cultureItem.id)}
                    style={{
                      backgroundColor: userVotes.some(
                        (votedItem) =>
                          votedItem.bucket_list_item_id === cultureItem.id &&
                          votedItem.upvote
                      )
                        ? "orange"
                        : "inherit",
                      padding: "10px",
                      marginRight: "10px",
                    }}
                    className="btn"
                  >
                    ⬆
                  </button>

                  {cultureItem.total_votes}

                  <button
                    onClick={() => downvoteItem(cultureItem.id)}
                    style={{
                      backgroundColor: userVotes.some(
                        (votedItem) =>
                          votedItem.bucket_list_item_id === cultureItem.id &&
                          votedItem.downvote
                      )
                        ? "blue"
                        : "inherit",
                      padding: "10px",
                      marginLeft: "10px",
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
