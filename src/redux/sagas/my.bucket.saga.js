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

function* completeBucketItem(action) {
  try {
    yield axios.put(`/api/userbucket/${action.payload}`);
    yield put({ type: "FETCH_MY_BUCKET" });
  } catch (error) {
    console.log("error in completing item", error);
  }
}

function* fetchMyBucketSaga() {
  yield takeEvery("FETCH_MY_BUCKET", fetchMyBucket);
  yield takeEvery("COMPLETE_BUCKET_ITEM", completeBucketItem)
}
export default fetchMyBucketSaga;
