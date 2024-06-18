import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchServiceBrigade() {
  try {
    const response = yield axios.get("/api/brigades/service");
    yield put({ type: "SET_SERVICE", payload: response.data });
  } catch (error) {
    console.log("error in fetching Service saga", error);
  }
}

function* serviceSaga () {
    yield takeEvery('FETCH_SERVICE', fetchServiceBrigade)
}
export default serviceSaga;