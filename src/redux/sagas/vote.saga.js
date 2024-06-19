import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* adventureUpvoteSaga() {
  try {
    yield axios.post("/brigades/upvote", { public_itemID: action.payload });
    yield put({ type: "FETCH_ADVENTURE" });
  } catch (error) {
    console.log("error in upvoting adventure item", error);
  }
}
function* cultureUpvoteSaga() {
  try {
    yield axios.post("/brigades/upvote", { public_itemID: action.payload });
    yield put({ type: "FETCH_CULTURE" });
  } catch (error) {
    console.log("error in upvoting culture item", error);
  }
}
function* serviceUpvoteSaga() {
  try {
    yield axios.post("/brigades/upvote", { public_itemID: action.payload });
    yield put({ type: "FETCH_SERVICE" });
  } catch (error) {
    console.log("error in upvoting service item", error);
  }
}
function* growthUpvoteSaga() {
  try {
    yield axios.post("/brigades/upvote", { public_itemID: action.payload });
    yield put({ type: "FETCH_GROWTH" });
  } catch (error) {
    console.log("error in upvoting growth item", error);
  }
}

function* adventureDownvoteSaga() {
  try {
    yield axios.post("/brigades/downvote", { public_itemID: aciton.payload });
    yield put({ type: "FETCH_ADVENTURE" });
  } catch (error) {
    console.log("error downvoting adventure item", error);
  }
}
function* cultureDownvoteSaga() {
  try {
    yield axios.post("/brigades/downvote", { public_itemID: aciton.payload });
    yield put({ type: "FETCH_CULTURE" });
  } catch (error) {
    console.log("error downvoting culture item", error);
  }
}
function* growthDownvoteSaga() {
  try {
    yield axios.post("/brigades/downvote", { public_itemID: aciton.payload });
    yield put({ type: "FETCH_GROWTH" });
  } catch (error) {
    console.log("error downvoting growth item", error);
  }
}
function* serviceDownvoteSaga() {
  try {
    yield axios.post("/brigades/downvote", { public_itemID: aciton.payload });
    yield put({ type: "FETCH_SERVICE" });
  } catch (error) {
    console.log("error downvoting service item", error);
  }
}

function* voteSaga() {
  yield takeEvery("UPVOTE_ADVENTURE", adventureUpvoteSaga);
  yield takeEvery("DOWNVOTE_ADVENTURE", adventureDownvoteSaga);

  yield takeEvery("UPVOTE_CULTURE", cultureUpvoteSaga);
  yield takeEvery("DOWNVOTE_CULTURE", cultureDownvoteSaga);

  yield takeEvery("UPVOTE_GROWTH", growthUpvoteSaga);
  yield takeEvery("DOWNVOTE_GROWTH", growthDownvoteSaga);

  yield takeEvery("UPVOTE_SERVICE", serviceUpvoteSaga);
  yield takeEvery("DOWNVOTE_SERVICE", serviceDownvoteSaga);
}
export default voteSaga;