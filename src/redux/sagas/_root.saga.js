import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";
import fetchMyBucketSaga from "./my.bucket.saga";
import adventureSaga from "./adventure.brigade.saga";
import serviceSaga from "./service.brigade.saga";
import growthSaga from "./growth.brigade.saga";
import cultureSaga from "./culture.brigade.saga";

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    fetchMyBucketSaga(),
    adventureSaga(),
    serviceSaga(),
    growthSaga(),
    cultureSaga(),
  ]);
}
