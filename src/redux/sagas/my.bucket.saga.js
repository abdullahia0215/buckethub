import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";
function* fetchMyBucket() {
  try {
    const response = yield axios.get("/api/userbucket");
    yield put({ type: "SET_MY_BUCKET", payload: response.data });
  } catch (error) {
    console.log("error in mybucket saga", error);
  }
}

function* fetchMyBucketSaga() {
  yield takeEvery("FETCH_MY_BUCKET", fetchMyBucket);
}
export default fetchMyBucketSaga;
