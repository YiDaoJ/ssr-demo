import { put, call, takeEvery } from 'redux-saga/effects'
import * as projectActions from './actions/project'
import api from './api'

function* fetchData() {
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

function* createProjectRequest(project) {
  console.log('test from saga - createProjectRequest')
  try {
    const proj = yield call(api.project.post, project)
    // debugger
    yield put(projectActions.createProjectSucceeded(proj.project))
  } catch (error) {
    yield put(projectActions.createProjectFailed(error))
  }
}

function* watchCreateProjectRequest(project) {
  console.log('test from saga - watchCreateProjectRequest')
  yield call(
    createProjectRequest,
    project
  )
}

export default function*() {
  yield takeEvery(
    projectActions.FETCH_DATA,
    watchFetchData
  )

  yield takeEvery(
    projectActions.CREATE_PROJECT_REQUEST,
    watchCreateProjectRequest
  )
}
