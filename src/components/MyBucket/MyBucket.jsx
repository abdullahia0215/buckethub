import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MyBucket() {
  const userBucket = useSelector((store) => store.myBucketReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_MY_BUCKET" });
  }, []);

  const completeItem = (itemID) => {
    if (
      confirm(
        "Are you sure you want to mark this complete? You will not be able to change it's status back to incomplete."
      ) === true
    ) {
      console.log("item completed");
      alert("congrats! you ticked another off the list :D");
      dispatch({ type: "COMPLETE_BUCKET_ITEM", payload: itemID });
    } else {
      return;
    }
  };

  return (
    <>
      <h1>My Bucket</h1>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
          </tr>
          {userBucket.map((userItem) => (
            <tr key={userItem.id}>
              <td>{userItem.bucket_list_item}</td>
              <td>
                <button onClick={() => completeItem(userItem.id)}>
                  Complete
                </button>
              </td>

              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
