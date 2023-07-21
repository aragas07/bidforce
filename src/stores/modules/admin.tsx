import objectAssign from 'object-assign';
// import {API_URL} from '@env';
import axios from 'axios';
import ToastNice from 'react-native-toast-message';
const API_URL = 'http://165.22.48.133:3333';
// const API_URL = 'http://192.168.254.113:3333'
export const CREATE_USER_SUCCESS = 'admin/CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'admin/CREATE_USER_ERROR';
export const CREATE_USER_FAIL = 'admin/CREATE_USER_FAIL';

export const GET_USERS_SUCCESS = 'admin/GET_USERS_SUCCESS';
export const GET_USERS_ERROR = 'admin/GET_USERS_ERROR';
export const GET_USERS_FAIL = 'admin/GET_USERS_FAIL';

export const GET_LISTINGS_SUCCESS = 'admin/GET_LISTINGS_SUCCESS';
export const GET_LISTINGS_ERROR = 'admin/GET_LISTINGS_ERROR';

export const GET_BIDS_SUCCESS = 'admin/GET_BIDS_SUCCESS';
export const GET_BIDS_ERROR = 'admin/GET_BIDS_ERROR';
export const GET_BIDS_FAIL = 'admin/GET_BIDS_FAIL';

export const ACTION_LISTING_SUCCESS = 'admin/ACTION_LISTING_SUCCESS'
export const ACTION_LISTING_ERROR = 'admin/ACTION_LISTING_ERROR'


export const ACTION_USERS_SUCCESS = 'admin/ACTION_USERS_SUCCESS';
export const ACTION_USERS_ERROR = 'admin/ACTION_USERS_ERROR';
export const ACTION_USERS_FAIL = 'admin/ACTION_USERS_FAIL';

export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
// export const SET_IP = 'network/SET_IP';

export function createUser(data, credentials){
  console.log('::createuser:::');
  console.log(data);
  return (dispatch, getState) => {
    let hostname = API_URL;
    let {accessToken} = getState().auth;
    axios
      .post(`${hostname}/v1/auth/register`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${accessToken}`
        },
      })
      .then((resuults) => {
        console.log('status good');
        console.log(resuults);
        dispatch({
          type: CREATE_USER_SUCCESS,
          payload: resuults.data,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response);
        console.log(error.message);
        ToastNice.show({text1: "Error has occured", text2: error.message ? error.message : error.response.toString(), type: 'error'})
        dispatch({
          type: CREATE_USER_FAIL,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}

export function getBids(data){
  console.log('::getBids:::');
  console.log(data);
  return (dispatch, getState) => {
    let hostname = API_URL;
    let {accessToken} = getState().auth;
    axios
      .get(`${hostname}/listings/${data}/bids`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      })
      .then((resuults) => {
        console.log('status good');
        console.log(resuults);
        dispatch({
          type: GET_BIDS_SUCCESS,
          payload: resuults.data,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response);
        console.log(error.message);
        ToastNice.show({text1: "Error has occured", text2: error.message ? error.message : error.response.toString(), type: 'error'})
        dispatch({
          type: GET_BIDS_ERROR,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}


export function getListings() {
  console.log('::get listing:::');
  console.log();
  return (dispatch, getState) => {
    let hostname = API_URL;
    let {accessToken} = getState().auth;
    // data.token = accessToken
    axios
      .get(`${hostname}/admin/listings`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${accessToken}`
        },
      })
      .then((resuults) => {
        dispatch({
          type: GET_LISTINGS_SUCCESS,
          payload: resuults.data,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response);
        console.log(error.message);
        ToastNice.show({text1: "Error has occured", text2: error.message ? error.message : error.response.toString(), type: 'error'})
        dispatch({
          type: GET_LISTINGS_ERROR,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}


export function getUsers(data) {
  console.log('::login:::');
  console.log(data);
  return (dispatch, getState) => {
    let hostname = API_URL;
    let {accessToken} = getState().auth;
    axios
      .get(`${hostname}/admin/users`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      })
      .then((resuults) => {
        console.log('status good');
        console.log(resuults);
        dispatch({
          type: GET_USERS_SUCCESS,
          payload: resuults.data,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response);
        console.log(error.message);
        ToastNice.show({text1: "Error has occured", text2: error.message ? error.message : error.response.toString(), type: 'error'})
        dispatch({
          type: GET_USERS_FAIL,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}

export function actionListing(data) {
  console.log('::checkMe:::');
  return (dispatch, getState) => {
    let {accessToken} = getState().auth;
    let hostname = API_URL;
    console.log(accessToken);
    axios
      .post(`${hostname}/admin/action`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((resuults) => {
        console.log('status good');
        console.log(resuults);
        ToastNice.show({text1:"Listing - " +data.action + " Success"})
        dispatch({
          type: ACTION_LISTING_SUCCESS,
          payload: resuults.data,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response);
        console.log(error.message);
        ToastNice.show({text1: "Error has occured", text2: error.message ? error.message : error.response.toString(), type: 'error'})
        dispatch({
          type: ACTION_LISTING_ERROR,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}

export function actionUsers(login) {
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
          type: ACTION_USERS_SUCCESS,
          payload: resuults.data,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response);
        console.log(error.message);
        ToastNice.show({text1: "Error has occured", text2: error.message ? error.message : error.response.toString(), type: 'error'})
        dispatch({
          type: ACTION_USERS_FAIL,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}

export const actions = {
  getUsers,
  createUser,
  actionUsers,
  actionListing
};

const actionHandlers:any = {};

actionHandlers[LOGOUT_SUCCESS] = () => {
  return initialState;
};

actionHandlers[CREATE_USER_SUCCESS] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.userCreationSuccess = true;
  newState.userCreationError = false;
  newState.userCreationData = action.payload.data;
  return newState;
};

actionHandlers[CREATE_USER_FAIL] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.userCreationSuccess = false;
  newState.userCreationError = action.payload.error
    ? action.payload.error.message
    : action.payload.message;
  return newState;
};

actionHandlers[GET_BIDS_SUCCESS] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.getBidsSuccess = true;
  newState.getBidsError = false;
  newState.getBidsData = action.payload.data;
  newState.timeProp = new Date();
  return newState;
};

actionHandlers[GET_BIDS_ERROR] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.getBidsSuccess = false;
  newState.getBidsError = action.payload.error
    ? action.payload.error.message
    : action.payload.message;
  return newState;
};

actionHandlers[ACTION_LISTING_SUCCESS] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.actionListingSuccess = true;
  newState.actionListingError = false;
  newState.timeProp = new Date();
  return newState;
};

actionHandlers[ACTION_LISTING_ERROR] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.actionListingSuccess = false;
  newState.actionListingError = action.payload.error
    ? action.payload.error.message
    : action.payload.message;
  return newState;
};

actionHandlers[GET_LISTINGS_ERROR] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.getListingsSuccess = false;
  newState.getListingsError = action.payload.error
    ? action.payload.error.message
    : action.payload.message;
  return newState;
};

actionHandlers[GET_LISTINGS_SUCCESS] = (state, action) => {
  console.log('get single listing')
  console.log(action.payload)
  let newState;
  newState = objectAssign({}, state);
  newState.getListingsSuccess = true;
  newState.getListingsError = false;
  newState.getListingsData = action.payload.data;
  return newState;
};


actionHandlers[GET_USERS_SUCCESS] = (state, action) => {
  let newState;
  console.log(action)
  newState = objectAssign({}, state);
  newState.getUsersSuccess = true;
  newState.getUsersError = false;
  newState.getUsersData = action.payload.data;
  return newState;
};

actionHandlers[GET_USERS_FAIL] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.getUsersSuccess = false;
  newState.getUsersError = action.payload.error
    ? action.payload.error.message
    : action.payload.message;
  return newState;
};

actionHandlers[GET_USERS_ERROR] = (state, action) => {
  let newState;
  newState = objectAssign({},state)
  newState.loginSuccess = false;
  newState.loginError = action.payload.error
    ? action.payload.error.message
    : action.payload.message;
  return newState;
};

actionHandlers[ACTION_USERS_SUCCESS] = (state, action) => {
  console.log('User token check');
  let newState;
  newState = objectAssign({}, state);
  newState.actionUserSuccess = true;
  newState.actionUserData = action.payload.data
  return newState;
};

actionHandlers[ACTION_USERS_FAIL] = (state, action, test1, test2) => {
  let newState;
  newState = objectAssign({}, state);
  newState.actionUserSuccess = false;
  newState.actionUserError = action.payload.error ? action.payload.error.message : action.payload.message
  return newState;
};

actionHandlers[ACTION_USERS_ERROR] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  return newState;
};

const initialState = {
  userCreationSuccess:false,
  userCreationError:null,
  
  getUsersSuccess:false,
  getUsersError:null,
  getUsersData:null,

  actionUserSuccess:false,
  actionUserData:null,
  actionUserError:null,

  getBidsSuccess:false,
  getBidsError:null,
  getBidsData:null,

  getListingsSuccess: true,
  getListingsError: false,
  getListingsData: []
};

export default function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type];

  return handler ? handler(state, action) : state;
}
