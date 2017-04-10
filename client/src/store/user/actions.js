import userService from '../../api/userService'
import timeEntryService from '../../api/timeEntryService'

// actionTypes
export const actionTypes = {
    AUTHENTICATED: 'AUTHENTICATED',
    LOGOUT: 'LOGOUT',
    USER_UPDATED: 'USER_UPDATED',
    TIME_DELETED: 'TIME_DELETED'
}

// actions
export function authenticated(token) {
    return {
        type: actionTypes.AUTHENTICATED,
        token: token
    }
}

export function logout() {
    return {
        type: actionTypes.LOGOUT
    }
}

export function userUpdated(details) {
    return {
        type: actionTypes.USER_UPDATED,
        details
    }
}

export function timeRemoved(id) {
    return {
        type: actionTypes.TIME_DELETED,
        id
    }
}

// thunks
export function signUp(username, email, password) {
    return function (dispatch) {
        return userService.signUp(username, email, password)
            .then(function (success) {
                dispatch(authenticated(success.data.token))
            })
            .catch(function (failure) {
                var { error, errors } = failure.response.data

                if (errors && errors.length) throw errors[0]
                else if (error && error.field) throw error
                debugger
            })
    }
}

export function signIn(email, password) {
    return function (dispatch) {
        return userService.signIn(email, password)
            .then(function (success) {
                dispatch(authenticated(success.data.token))
            })
            .catch(function (failure) {
                var { error, errors } = failure.response.data

                if (errors && errors.length) throw errors[0]
                else if (error && error.field) throw error
                debugger
            })
    }
}

export function createTime(date, time, distance) {
    return function (dispatch, getState) {
        let { user } = getState(),
            token = user.get('token')

        return timeEntryService.create(date, time, distance, token)
            .then(function (success) {
                return success.data
            })
            .catch(function (failure) {
                debugger
                throw failure
            })
    }
}

export function deleteTime(id) {
    return function (dispatch, getState) {
        let { user } = getState(),
            token = user.get('token')

        return timeEntryService.remove(id, token)
            .then(function (success) {
                dispatch(timeRemoved(success.data))
                return success.data
            })
            .catch(function (failure) {
                debugger
                throw failure
            })
    }
}

export function getProfile() {
    return function (dispatch, getState) {
        let { user } = getState(),
            token = user.get('token')

        return userService.profile(token)
            .then(function (success) {
                dispatch(userUpdated(success.data))
                return success.data
            })
            .catch(function (failure) {
                debugger
                throw failure
            })
    }
}

export default {
    actionTypes,
    signUp,
    signIn,
    logout,
    createTime,
    deleteTime,
    getProfile
}
