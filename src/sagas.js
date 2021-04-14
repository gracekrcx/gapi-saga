import { all, put, call, takeLatest, delay, select } from "redux-saga/effects";
import * as actions from "./actions";
import getLists from "./apis";

function* getSearchLists({ payload }) {
  if (payload?.auto) {
    yield put({ type: "LOADING" });
  } else {
    yield put({ type: "LOADINGANDCLEAN" });
  }

  const { pageToken } = yield select();

  yield delay(2000);
  const response = yield call(getLists, { ...payload, pageToken });

  if (response !== undefined && !response.error) {
    let errorMessage = "";
    if (response.items.length === 0) {
      errorMessage = "沒有相符的影片";
    }
    const payload = {
      items: response.items,
      nextPageToken: response?.nextPageToken,
      errorMessage,
    };
    yield put({ type: actions.SET_SEARCHLISTS, payload });
  } else {
    // console.log(response?.error);
    const payload = {
      items: [],
      nextPageToken: null,
      errorMessage: response?.error?.message,
    };
    yield put({ type: actions.SET_SEARCHLISTS, payload });
  }
}

function* watchGetSearchLists() {
  // takeLatest
  yield takeLatest(actions.GET_SEARCHLISTS, getSearchLists);
}

export default function* rootSaga() {
  yield all([watchGetSearchLists()]);
}
