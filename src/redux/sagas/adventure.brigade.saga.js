import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchAdventureBrigade() {
  try {
    const response = yield axios.get("/api/brigades/adventure");
    yield put({ type: "SET_ADVENTURE", payload: response.data });
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
function* adventureSaga() {
  yield takeEvery("FETCH_ADVENTURE", fetchAdventureBrigade);
  yield takeEvery("DELETE_ADVENTURE_ITEM", deleteAdventureItem);
}
export default adventureSaga;
