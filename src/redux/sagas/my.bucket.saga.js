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

function* deleteBucketIten(action) {
  try {
    yield axios.delete(`/api/userbucket/${action.payload}`);
    yield put({ type: "FETCH_MY_BUCKET" });
  } catch (error) {
    console.log("error in deleting saga", error);
  }
}

function* addUserBucketItem(action) {
  try {
    yield axios.post(`/api/userbucket/`, {
      user_item: action.payload,
    });
    yield put({ type: "FETCH_MY_BUCKET" });
  } catch (error) {
    console.log("error in adduserbucketitem saga", error);
  }
}
function* setUserStatus() {
  try {
    yield axios.put(`/api/userbucket/`)
  } catch (error) {
    console.log('error in setting user status', error)
  }
}

function* fetchMyBucketSaga() {
  yield takeEvery("FETCH_MY_BUCKET", fetchMyBucket);
  yield takeEvery("COMPLETE_USER_BUCKET_ITEM", completeBucketItem);
  yield takeEvery("DELETE_USER_BUCKET_ITEM", deleteBucketIten);
  yield takeEvery("ADD_USER_BUCKET_ITEM", addUserBucketItem);
  yield takeEvery("SET_USER_FALSE", setUserStatus )
}
export default fetchMyBucketSaga;
