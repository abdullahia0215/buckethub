import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchCultureBrigade() {
  try {
    const response = yield axios.get("/api/brigades/culture");
    yield put({ type: "SET_CULTURE", payload: response.data });
  } catch (error) {
    console.log("error in fetching culture saga", error);
  }
}
function* deleteCultureItem(action) {
  try {
    yield axios.delete(`/api/brigades/${action.payload}`);
    yield put({ type: "FETCH_CULTURE" });
  } catch (error) {
    console.log("error in deleting culture item saga", error);
  }
}
function* addCultureItem(action) {
  try {
    yield axios.post("/api/brigades/culture", {
      public_item: action.payload,
    });
    yield put({ type: "FETCH_CULTURE" });
  } catch (error) {
    console.log("error in adding adventure item", error);
  }
}
function* cultureSaga() {
  yield takeEvery("FETCH_CULTURE", fetchCultureBrigade);
  yield takeEvery("DELETE_CULTURE_ITEM", deleteCultureItem);
  yield takeEvery("ADD_CULTURE_ITEM", addCultureItem);
}
export default cultureSaga;
