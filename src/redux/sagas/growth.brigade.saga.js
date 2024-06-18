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

function* growthSaga() {
  yield takeEvery("FETCH_GROWTH", fetchGrowthBrigade);
}
export default growthSaga;
