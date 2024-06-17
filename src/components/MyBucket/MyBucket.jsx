import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MyBucket() {
  const userBucket = useSelector((store) => store.myBucketReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_MY_BUCKET" });
  }, []);

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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
