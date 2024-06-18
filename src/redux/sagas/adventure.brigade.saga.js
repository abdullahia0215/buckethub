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

function* adventureSaga () {
    yield takeEvery('FETCH_ADVENTURE', fetchAdventureBrigade)
}
export default adventureSaga;