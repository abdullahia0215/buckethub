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

function* cultureSaga() {
  yield takeEvery("FETCH_CULTURE", fetchCultureBrigade);
}
export default cultureSaga;
