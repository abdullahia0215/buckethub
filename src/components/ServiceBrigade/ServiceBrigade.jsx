import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function ServiceBrigade() {
  const dispatch = useDispatch();
  const history = useHistory();
  const serviceBrigade = useSelector(
    (store) => store.brigadeReducers.serviceReducer
  );
  const user = useSelector((store) => store.user);
  useEffect(() => {
    dispatch({
      type: "FETCH_SERVICE",
    });
  }, []);
  return (
    <>
      <h1>Service</h1>
      <button onClick={() => history.push("/brigades")}>
        Back To Brigades
      </button>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Add To Your Bucket list</th>
          </tr>
          {serviceBrigade.map((serviceItem) => (
            <tr key={serviceItem.id}>
              <td>{serviceItem.public_bucket_list_item}</td>
              {user.id === serviceItem.user_id ? (
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
