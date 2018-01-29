import { put, call, takeEvery } from 'redux-saga/effects'
import * as projectActions from './actions/project'
import * as auth from './actions/auth'
import api from './api'


// ============ read ==============

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

// ============ create ==============

function* createProjectRequest(project) {
  try {
    const proj = yield call(api.project.post, project)
    yield put(projectActions.createProjectSucceeded(proj))
  } catch (error) {
    yield put(projectActions.createProjectFailed(error))
  }
}

function* watchCreateProjectRequest(project) {
  yield call(
    createProjectRequest,
    project
  )
}

// ============ delete ==============

function* deleteProjectRequestAsync(project) {

  try {
    const proj = yield call(api.project.delete, project)
    console.log('proj: ', proj)
    yield put(projectActions.deleteProjectSucceeded(proj))
  } catch (error) {
    yield put(projectActions.deleteProjectFailed(error))
  }
}

function* watchDeleteProjectRequest(data) {
  yield call(
    deleteProjectRequestAsync,
    data
  )
}

// ============ update / put ==============

function* updateProjectRequest(data) {
  try {
    console.log('test from saga - updateProjectRequest', data)
    const proj = yield call(api.project.put, data)
    console.log('test from saga - updateProjectRequest', proj)
    // const proj = yield call(api.project.put, project)
    yield put(projectActions.updateProjectSucceeded(proj, data.payload))
  } catch (error) {
    yield put(projectActions.updateProjectFailed(error))
  }
}

function* watchUpdateProjectRequest(data) {
  yield call(
    updateProjectRequest,
    data
  )
}

// ============= user login ================
function* userLogin(data) {
  try {
    const credentials = yield call(api.user.login, data)
    console.log('test from saga - credentials: ', credentials)
    yield put(auth.userLoginSuccess(credentials))
  } catch (error) {
    const errors = error && error.response && error.response.data && error.response.data.errors || []
    yield put(auth.userLoginFailure(errors))
    // yield put(error.throw(errors))
  }
}

function* watchUserLogin(data) {
  yield call(
    userLogin,
    data
  )
}


// ============ rootSaga ==============

export default function*() {
  yield takeEvery(
    projectActions.FETCH_DATA,
    watchFetchData
  )

  yield takeEvery(
    projectActions.CREATE_PROJECT_REQUEST,
    watchCreateProjectRequest
  )

  yield takeEvery(
    projectActions.DELETE_PROJECT_REQUEST,
    watchDeleteProjectRequest
  )

  yield takeEvery(
    projectActions.UPDATE_PROJECT_REQUEST,
    watchUpdateProjectRequest
  )

  yield takeEvery(
    auth.USER_LOGIN,
    watchUserLogin
  )
}
