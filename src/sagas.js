import { put, call, takeEvery } from 'redux-saga/effects'
import * as projectActions from './actions/project'
import api from './api'

export function* fetchData() {
  try {
    const projects = yield call(api.project.get)
    yield put(projectActions.fetchSucceeded(projects))
  } catch (error) {
    yield put(projectActions.fetchFailed(error))
  }
}


function* watchFetchData() {
  yield call(
    fetchData
  )
}

export default function*() {
  yield takeEvery(
    projectActions.FETCH_DATA,
    watchFetchData
  )
}
