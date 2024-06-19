import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchServiceBrigade() {
  try {
    const response = yield axios.get("/api/brigades/service");
    yield put({ type: "SET_SERVICE", payload: response.data });
    yield put({ type: 'FETCH_MY_VOTES'})
  } catch (error) {
    console.log("error in fetching Service saga", error);
  }
}

function* deleteCultureItem(action) {
  try {
    yield axios.delete(`/api/brigades/${action.payload}`);
    yield put({ type: "FETCH_SERVICE" });
  } catch (error) {
    console.log("error in deleting culture item saga", error);
  }
}
function* addCultureItem(action) {
  try {
    yield axios.post("/api/brigades/service", {
      public_item: action.payload,
    });
    yield put({ type: "FETCH_SERVICE" });
  } catch (error) {
    console.log("error in adding adventure item", error);
  }
}
function* serviceSaga() {
  yield takeEvery("FETCH_SERVICE", fetchServiceBrigade);
  yield takeEvery("DELETE_SERVICE_ITEM", deleteCultureItem);
  yield takeEvery("ADD_SERVICE_ITEM", addCultureItem);
}
export default serviceSaga;
