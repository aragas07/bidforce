import objectAssign from 'object-assign';
// import {API_URL} from '@env';
import axios from 'axios';
import ToastNice from 'react-native-toast-message';
const { v4: uuidv4, validate } = require("uuid");
const Buffer = require("buffer").Buffer;
const API_URL = 'http://165.22.48.133:3333';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'auth/LOGIN_ERROR';
export const LOGIN_FAIL = 'auth/LOGIN_FAIL';

export const GET_NOTIFICATIONS_SUCCESS = 'auth/GET_NOTIFICATIONS_SUCCESS';
export const GET_NOTIFICATIONS_FAIL = 'auth/GET_NOTIFICATIONS_FAIL';

export const GET_USER_BY_ID_SUCCESS = 'auth/GET_USER_BY_ID_SUCCESS';
export const GET_USER_BY_ID_ERROR = 'auth/GET_USER_BY_ID_ERROR';
export const GET_USER_BY_ID_FAIL = 'auth/GET_USER_BY_ID_FAIL';

export const CHECK_ME_SUCCESS = 'auth/CHECK_ME_SUCCESS';
export const CHECK_ME_ERROR = 'auth/CHECK_ME_ERROR';
export const CHECK_ME_FAIL = 'auth/CHECK_ME_FAIL';


export const GET_MY_BIDS_SUCCESS = 'auth/GET_MY_BIDS_SUCCESS';
export const GET_MY_BIDS_ERROR = 'auth/GET_MY_BIDS_ERROR';

export const GET_MY_NOTES_SUCCESS = 'auth/GET_MY_NOTES_SUCCESS';
export const GET_MY_NOTES_ERROR = 'auth/GET_MY_NOTES_ERROR';

export const CLEAN_PROFILE = 'auth/CLEAN_PROFILE'

export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
// export const SET_IP = 'network/SET_IP';

export function getNotifications(){
  console.log("::getNotifications")

  return (dispatch, getState) => {
    let hostname = API_URL;
    let {accessToken} = getState().auth;
    console.log(accessToken)
    axios
      .get(`${hostname}/notifications/get/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      })
      .then((resuults) => {
        console.log('status good');
        console.log(resuults);
        dispatch({
          type:GET_NOTIFICATIONS_SUCCESS,
          data: resuults.data,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error)
        console.log(error.response);
        console.log(error.message);
        ToastNice.show({text1: "Error has occured", text2: error.message ? error.message : error.response.toString(), type: 'error'})
        dispatch({
          type:GET_NOTIFICATIONS_FAIL,
          data: error.response ? error.response.data : error,
        });
      });
  };
}


export function getMyBids(){
  console.log("::getNotifications")

  return (dispatch, getState) => {
    let hostname = API_URL;
    let {accessToken} = getState().auth;
    console.log(accessToken)
    axios
      .get(`${hostname}/bids/mybids`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      })
      .then((resuults) => {
        console.log('status good');
        console.log(resuults);
        dispatch({
          type:GET_MY_BIDS_SUCCESS,
          data: resuults.data,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error)
        console.log(error.response);
        console.log(error.message);
        ToastNice.show({text1: "Error has occured", text2: error.message ? error.message : error.response.toString(), type: 'error'})
        dispatch({
          type:GET_MY_BIDS_ERROR,
          data: error.response ? error.response.data : error,
        });
      });
  };
}

export function login(data) {
  console.log('::login:');
  // console.log(data);
  return (dispatch, getState) => {
    let hostname = API_URL;
    let {accessToken} = getState().auth;
    data.token = accessToken
    axios
      .post(`${hostname}/login`, data, {
        headers: {
          'Content-Type': 'application/json',
          'details': new Buffer(`${data.email}:${data.password}`).toString("base64")
          // `
        },
      })
      .then((resuults) => {
        console.log('status good');
        console.log(resuults);
        if (data.type == 'signup') {
          resuults.type = 'signup';
        }
        dispatch({
          type: LOGIN_SUCCESS,
          data: resuults.data,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error)
        console.log(error.response);
        console.log(error.message);
        ToastNice.show({text1: "Error has occured", text2: error.message ? error.message : error.response.toString(), type: 'error'})
        dispatch({
          type: LOGIN_ERROR,
          data: error.response ? error.response.data : error,
        });
      });
  };
}

export function getUserById(data){
    console.log("::GetDataUser")
    console.log(data)
    return (dispatch, getState) => {
      let hostname = API_URL;
      let {accessToken} = getState().auth;

      console.log(accessToken)
      console.log(data)
      axios
        .get(`${hostname}/listings/user/`+data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
            // 'details': new Buffer(`${data.email}:${data.password}`).toString("base64")
            // `
          },
        })
        .then((resuults) => {
          console.log('status good');
          console.log(resuults);
          dispatch({
            type: GET_USER_BY_ID_SUCCESS,
            data: resuults.data,
          });
        })
        .catch((error) => {
          console.log('error');
          console.log(error)
          console.log(error.response);
          console.log(error.message);
          ToastNice.show({text1: "Error has occured", text2: error.message ? error.message : error.response.toString(), type: 'error'})
          dispatch({
            type: GET_USER_BY_ID_FAIL,
            data: error.response ? error.response.data : error,
          });
        });
    };
}

export function checkMe(login) {
  console.log('::checkMe:::');
  return (dispatch, getState) => {
    let {accessToken} = getState().auth;
    let hostname = API_URL;
    console.log(accessToken);
    axios
      .get(`${hostname}/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((resuults) => {
        console.log('status good');
        console.log(resuults);
        if (login) {
          ToastNice.show({
            text1: 'Welcome back, ' + resuults.data.user.profile.first_name,
            text2: 'You have logged back in!',
          });
        }
        dispatch({
          type: CHECK_ME_SUCCESS,
          data: resuults.data,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response);
        console.log(error.message);
        ToastNice.show({text1: "Error has occured", text2: error.message ? error.message : error.response.toString(), type: 'error'})
        dispatch({
          type: CHECK_ME_FAIL,
          data: error.response ? error.response.data : error,
        });
      });
  };
}

export function setGetUserNull(){
  return async (dispatch)=> {
    await dispatch({
      type: CLEAN_PROFILE,
      meta: { done:true }
    })
  }
}

export function logout() {
  return async (dispatch) => {
    await dispatch({
      type: LOGOUT_SUCCESS,
      meta: {
        done: true,
      },
    });
  };
}

export const actions = {
  getUserById,
  login,
  logout,
  getMyBids,
  getNotifications,
  
};

const actionHandlers = {};

// actionHandlers[LOGOUT_SUCCESS] = () => {
//   return initialState;
// };

// actionHandlers[SET_IP] = (state, action) => {
//   let newState;
//   // console.log(action);
//   newState = objectAssign({}, state);
//   newState.hostname = action.meta.value;
//   return newState;
// };

actionHandlers[LOGIN_SUCCESS] = (state, action) => {
  let newState;
  console.log("ACTIONHANDLER_LOGINSUCCESS")
  console.log(action.data)
  newState = objectAssign({}, state);
  newState.loginSuccess = true;
  newState.loginError = false;
  newState.loginData = action.data.user;
  newState.logoutSuccess = false;
  // newState.noAccount = action.data.noAccount;
  newState.accessToken = action.data.token;
  console.log("Login success?")
  return newState;
};

actionHandlers[GET_MY_BIDS_SUCCESS] = (state, action) => {
  let newState;
  console.log("GET_MY_BIDS_SUCCESS")
  console.log(action.data)
  newState = objectAssign({}, state);
  newState.getMyBidsSuccess = true;
  newState.getMyBidsError = false;
  newState.getMyBidsData = action.data;
  newState.getMyBidsTime = new Date();
  console.log("getMyBids success?")
  return newState;
};

actionHandlers[GET_MY_BIDS_ERROR] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.getMyBidsSuccess = false;
  newState.getMyBidsError = action.data.error
    ? action.data.error.message
    : action.data.message;
  return newState;
};


actionHandlers[GET_NOTIFICATIONS_SUCCESS] = (state, action) => {
  let newState;
  console.log("GET_NOTIFICATIONS_SUCCESS")
  console.log(action.data)
  newState = objectAssign({}, state);
  newState.GetNotificationsSuccess = true;
  newState.GetNotificationsError = false;
  newState.GetNotificationsData = action.data;
  console.log("GetNotifications success?")
  return newState;
};

actionHandlers[GET_NOTIFICATIONS_FAIL] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.GetNotificationsSuccess = false;
  newState.GetNotificationsError = action.data.error
    ? action.data.error.message
    : action.data.message;
  return newState;
};

actionHandlers[GET_USER_BY_ID_SUCCESS] = (state, action) => {
  let newState;
  console.log("ACTIONHANDLER_LOGINSUCCESS")
  console.log(action.data)
  newState = objectAssign({}, state);
  newState.GetUserSuccess = true;
  newState.GetUserError = false;
  newState.GetUserData = action.data.user;
  newState.dataget = uuidv4()
  console.log("GetUser success?")
  return newState;
};

actionHandlers[GET_USER_BY_ID_FAIL] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.GetUserSuccess = false;
  newState.dataget = new Date();
  newState.GetUserError = action.data.error
    ? action.data.error.message
    : action.data.message;
  return newState;
};

actionHandlers[LOGIN_ERROR] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.loginSuccess = false;
  newState.loginError = action.data.error
    ? action.data.error.message
    : action.data.message;
  return newState;
};

actionHandlers[CHECK_ME_SUCCESS] = (state, action) => {
  console.log('User token check');
  let newState;
  newState = objectAssign({}, state);
  newState.tokenCheck = true;
  newState.tokenError = false;
  newState.loginData = action.data.user;
  return newState;
};

actionHandlers[CHECK_ME_FAIL] = (state, action, test1, test2) => {
  console.log('Token check fail');
  let newState;
  newState = objectAssign({}, state);
  newState.tokenCheck = false;
  newState.tokenError = action.data.error
    ? action.data.error.message
    : action.data.message;
  return newState;
};

actionHandlers[CHECK_ME_ERROR] = (state, action) => {
  console.log('Token check error.');
  let newState;
  newState = objectAssign({}, state);
  return newState;
};

actionHandlers[CLEAN_PROFILE] = (state, action) => {
  // return initialState;
  let newState = objectAssign({}, state)
  newState.GetUserData=null;
  newState.GetUserSuccess=false;
  newState.GetUserError=null
  return newState;
  // let newState = objectAssign({}, state)
};

actionHandlers[LOGOUT_SUCCESS] = (state, action) => {
  // return initialState;
  let newState = initialState;
  newState.logoutSuccess = true;
  return newState;
  // let newState = objectAssign({}, state)
};

const initialState = {
  loginError: false,
  loginSuccess: false,
  loginData: null,
  
  accessToken: null,
  
  tokenSuccess: false,
  tokenError: null,
  
  logoutSuccess: false,
  
  GetUserSuccess: true,
  GetUserError: false,
  GetUserData: null,

  GetNotificationsSuccess:false,
  GetNotificationsError:null,
  GetNotificationsData:null,
};

export default function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type];

  return handler ? handler(state, action) : state;
}
