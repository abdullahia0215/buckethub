import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
export default function PersonalGrowthBrigade() {
  const user = useSelector((store) => store.user);
  const growthBrigade = useSelector(
    (store) => store.brigadeReducers.growthReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({
      type: "FETCH_GROWTH",
    });
  }, []);
  return (
    <>
      <h1>PersonalGrowth</h1>
      <button onClick={() => history.push("/brigades")}>
        Back To Brigades
      </button>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Add To Your Bucket list</th>
          </tr>
          {growthBrigade.map((growthItem) => (
            <tr key={growthItem.id}>
              <td>{growthItem.public_bucket_list_item}</td>
              {user.id === growthItem.user_id ? (
                <td>
                  <button>Delete</button>
                </td>
              ) : (
                ""
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
