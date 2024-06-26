import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchAdventureBrigade() {
  try {
    const response = yield axios.get("/api/brigades/adventure");
    yield put({ type: "SET_ADVENTURE", payload: response.data });
    yield put({ type: 'FETCH_MY_VOTES'})
  } catch (error) {
    console.log("error in fetching adventure saga", error);
  }
}
function* deleteAdventureItem(action) {
  try {
    yield axios.delete(`/api/brigades/${action.payload}`);
    yield put({ type: "FETCH_ADVENTURE" });
  } catch (error) {
    console.log("error in deleting adventure item saga", error);
  }
}

function* addAdventureItem(action) {
  try {
    yield axios.post("/api/brigades/adventure", {
      public_item: action.payload,
    });
    yield put({ type: "FETCH_ADVENTURE" });
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
function* adventureSaga() {
  yield takeEvery("FETCH_ADVENTURE", fetchAdventureBrigade);
  yield takeEvery("DELETE_ADVENTURE_ITEM", deleteAdventureItem);
  yield takeEvery("ADD_ADVENTURE_ITEM", addAdventureItem);
  yield takeEvery("ADD_TO_USER_BUCKET", addToMyBucket);
}
export default adventureSaga;
