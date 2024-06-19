import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* adventureUpvoteSaga(action) {
  try {
    yield axios.post("/api/brigades/upvote", { public_itemID: action.payload });
    yield put({ type: "FETCH_ADVENTURE" });
  } catch (error) {
    console.log("error in upvoting adventure item", error);
  }
}
function* cultureUpvoteSaga(action) {
  try {
    yield axios.post("/api/brigades/upvote", { public_itemID: action.payload });
    yield put({ type: "FETCH_CULTURE" });
  } catch (error) {
    console.log("error in upvoting culture item", error);
  }
}
function* serviceUpvoteSaga(action) {
  try {
    yield axios.post("/api/brigades/upvote", { public_itemID: action.payload });
    yield put({ type: "FETCH_SERVICE" });
  } catch (error) {
    console.log("error in upvoting service item", error);
  }
}
function* growthUpvoteSaga(action) {
  try {
    yield axios.post("/api/brigades/upvote", { public_itemID: action.payload });
    yield put({ type: "FETCH_GROWTH" });
  } catch (error) {
    console.log("error in upvoting growth item", error);
  }
}

function* adventureDownvoteSaga(action) {
  try {
    yield axios.post("/api/brigades/downvote", {
      public_itemID: action.payload,
    });
    yield put({ type: "FETCH_ADVENTURE" });
  } catch (error) {
    console.log("error downvoting adventure item", error);
  }
}
function* cultureDownvoteSaga(action) {
  try {
    yield axios.post("/api/brigades/downvote", {
      public_itemID: action.payload,
    });
    yield put({ type: "FETCH_CULTURE" });
  } catch (error) {
    console.log("error downvoting culture item", error);
  }
}
function* growthDownvoteSaga(action) {
  try {
    yield axios.post("/api/brigades/downvote", {
      public_itemID: action.payload,
    });
    yield put({ type: "FETCH_GROWTH" });
  } catch (error) {
    console.log("error downvoting growth item", error);
  }
}
function* serviceDownvoteSaga(action) {
  try {
    yield axios.post("/api/brigades/downvote", {
      public_itemID: action.payload,
    });
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
