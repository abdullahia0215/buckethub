import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Confetti from "react-confetti";
import swal from "sweetalert";
import { useWindowSize } from "@uidotdev/usehooks";
import "../MyBucket/MyBucket.css";
import { useHistory } from "react-router-dom";

export default function MyBucket() {
  const history = useHistory();
  const userBucket = useSelector((store) => store.myBucketReducer);
  const user = useSelector((store) => store.user);
  const { width, height } = useWindowSize();
  const [input, setInput] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.first_time === true) {
      swal({
        title: "Welcome To BucketHub!",
        text: "Welcome to BucketHub, your one-stop site for bucket list curation and creation. Looking for a guide? Head over to our about page for directions on how to use it!",
        icon: "info",
        buttons: {
          cancel: {
            text: "Got it!",
            value: true,
            visible: true,
            className: "",
            closeModal: true,
          },
        },
        buttonsStyling: false,
      }).then((value) => {
        window.location.reload();
        dispatch({ type: "SET_USER_FALSE" });
      });
    }

    dispatch({ type: "FETCH_MY_BUCKET" });
  }, []);

  const completeItem = (itemID) => {
    swal({
      title: "Are you sure?",
      text: "You will not be able to change its status back to incomplete.",
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
          text: "Mark Complete",
          value: true,
          visible: true,
          className: "",
          closeModal: true,
        },
      },
    }).then((value) => {
      if (value) {
        dispatch({ type: "COMPLETE_USER_BUCKET_ITEM", payload: itemID });
        swal(
          "Congratulations!",
          "You ticked another off the list :D",
          "success"
        );
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      }
    });
  };

  const deleteItem = (itemID) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item!",
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
        dispatch({ type: "DELETE_USER_BUCKET_ITEM", payload: itemID });
      }
    });
  };
  const addItem = (event) => {
    event.preventDefault();
    dispatch({
      type: "ADD_USER_BUCKET_ITEM",
      payload: input,
    });
    setInput("");
  };

  const handleBucketInput = (event) => {
    setInput(event.target.value);
    console.log(input);
  };
  return (
    <>
      {showConfetti && (
        <Confetti width={width} height={height} tweenDuration={5000} />
      )}
      <div style={{ margin: "40px" }}>
        <h1 style={{ margin: "20px", textAlign: "center" }}>My Bucket</h1>
        <h4 style={{ margin: "20px", textAlign: "center" }}>You've completed {userBucket.filter(item => item.completion_status===true).length} items!</h4>
        <h6 style={{ margin: "20px", textAlign: "center" }}>{userBucket.filter(item => item.completion_status === false).length} left, nice! </h6>

        <form onSubmit={addItem} className="form-inline">
          <input
            value={input}
            onChange={handleBucketInput}
            placeholder="What's next?"
            className="form-control"
            required
          ></input>
          <button className="btn">Add To Bucket List</button>
        </form>
        {userBucket.length === 0 ? (
          <h2>Get started by adding an item! </h2>
        ) : (
          <table className="table table-hover">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Complete</th>
                <th>Delete</th>
              </tr>
              {userBucket.map((userItem) => (
                <tr key={userItem.id}>
                  <td>{userItem.bucket_list_item}</td>
                  <td>
                    {userItem.completion_status ? (
                      <button disabled className="btn">
                        Complete{" "}
                      </button>
                    ) : (
                      <button
                        onClick={() => completeItem(userItem.id)}
                        className="btn complete-btn"
                      >
                        Complete
                      </button>
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() => deleteItem(userItem.id)}
                      className="btn delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
