import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchGrowthBrigade() {
  try {
    const response = yield axios.get("/api/brigades/growth");
    yield put({ type: "SET_GROWTH", payload: response.data });
  } catch (error) {
    console.log("error in fetching Growth saga", error);
  }
}
function* deleteGrowthItem(action) {
  try {
    yield axios.delete(`/api/brigades/${action.payload}`);
    yield put({ type: "FETCH_GROWTH" });
  } catch (error) {
    console.log("error in deleting growth item saga", error);
  }
}
function* addGrowthItem(action) {
  try {
    yield axios.post("/api/brigades/growth", {
      public_item: action.payload,
    });
    yield put({ type: "FETCH_GROWTH" });
  } catch (error) {
    console.log("error in adding adventure item", error);
  }
}
function* addToMyBucket(action) {
  try {
    yield axios.post("/api/userbucket/", { user_item: action.payload });
  } catch (error) {
    console.log("error in adding to users bucket list", error);
  }
}
function* growthSaga() {
  yield takeEvery("FETCH_GROWTH", fetchGrowthBrigade);
  yield takeEvery("DELETE_GROWTH_ITEM", deleteGrowthItem)
  yield takeEvery("ADD_GROWTH_ITEM", addGrowthItem)
  yield takeEvery("ADD_GROWTH_USER_BUCKET", addToMyBucket)
}
export default growthSaga;
