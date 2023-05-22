import objectAssign from 'object-assign';
// import {API_URL} from '@env';
import axios from 'axios';
import ToastNice from 'react-native-toast-message';
const API_URL = 'http://165.22.48.133:3333';
export const GET_LISTING_SUCCESS = 'listing/GET_LISTING_SUCCESS';
export const GET_LISTING_ERROR = 'listing/GET_LISTING_ERROR';
export const GET_LISTING_FAIL = 'listing/GET_LISTING_FAIL';

export const GET_LISTINGS_SUCCESS = 'listing/GET_LISTINGS_SUCCESS';
export const GET_LISTINGS_ERROR = 'listing/GET_LISTINGS_ERROR';
export const GET_LISTINGS_FAIL = 'listing/GET_LISTINGS_FAIL';

export const BID_SUCCESS = "listing/BID_SUCCESS"
export const BID_ERROR = "listing/BID_ERROR"

export const POST_LISTING_SUCCESS = "listing/POST_LISTING_SUCCESS"
export const POST_LISTING_ERROR = "listing/POST_LISTING_ERROR"

export const GET_USER_SUCCESS = 'listing/GET_USER_SUCCESS';
export const GET_USER_ERROR = 'listing/GET_USER_ERROR';
export const GET_USER_FAIL = 'listing/GET_USER_FAIL';

export const LOGOUT_SUCCESS = 'listing/LOGOUT_SUCCESS';

export const STATE_CLEANUP_BID = "listing/statecleanup";
export const STATE_CLEANUP_LISTING = "listing/statecleanuplisting";
// export const SET_IP = 'network/SET_IP';

export function getUser(data) {
  return (dispatch, getState) => {
    let hostname = API_URL;
    let {accessToken} = getState().auth;
    data.token = accessToken
    axios
      .get(`${hostname}/v1/listings/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((resuults) => {
        if (data.type == 'signup') {
          resuults.type = 'signup';
        }
        dispatch({
          type: GET_LISTINGS_SUCCESS,
          payload: resuults.data,
        });
      })
      .catch((error) => {
        ToastNice.show({text1: "Error has occured", text2: error.message ? error.message : error.response.toString(), type: 'error'})
        dispatch({
          type: GET_LISTINGS_FAIL,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}

export function getListings() {
  return (dispatch, getState) => {
    let hostname = API_URL;
    let {accessToken} = getState().auth;
    // data.token = accessToken
    axios
      .get(`${hostname}/listings/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((resuults) => {
        dispatch({
          type: GET_LISTINGS_SUCCESS,
          payload: resuults.data,
        });
      })
      .catch((error) => {
        ToastNice.show({text1: "Error has occured", text2: error.message ? error.message : error.response.toString(), type: 'error'})
        dispatch({
          type: GET_LISTINGS_FAIL,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}

export function vinScan(data){
  console.log(":vinscan:")
  console.log(data)
  return (dispath, getState)=>{
    axios.get(`https://api.vehicledatabases.com/vin-decode/2C4RDGCG0FR805928`,{
      headers: {
        'Content-Type': 'application/json',
        'x-AuthKey': 'abefa85baf5d4588a37b7311edf58921'
      }
    }).then((results)=>{
      console.log("results of vinScan")
      console.log(results)
    })
  }
}

export function bid(data){
  console.log("bid")
  return (dispatch, getState) => {
    let hostname = API_URL;
    let {accessToken} = getState().auth;
    axios
      .post(`${hostname}/bids/bid`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      })
      .then((resuults) => {
        dispatch({
          type: BID_SUCCESS,
          payload: resuults,
        });
      })
      .catch((error) => {
        ToastNice.show({text1: "Error has occured", text2: error.message ? error.message : error.response.toString(), type: 'error'})
        dispatch({
          type: BID_ERROR,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}


export function postListing(data){
  return (dispatch, getState) => {
    let hostname = API_URL;
    let {accessToken} = getState().auth;
    axios
      .post(`${hostname}/listings/create`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      })
      .then((resuults) => {
        dispatch({
          type: POST_LISTING_SUCCESS,
          payload: resuults,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response);
        console.log(error.message);
        ToastNice.show({text1: "Error has occured", text2: error.message ? error.message : error.response.toString(), type: 'error'})
        dispatch({
          type: POST_LISTING_ERROR,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}

export function statecleanup_listing() {
  return async (dispatch) => {
    await dispatch({
      type: STATE_CLEANUP_LISTING,
      meta: {
        done: true,
      },
    });
  };
}

export function statecleanup_bid() {
  return async (dispatch) => {
    await dispatch({
      type: STATE_CLEANUP_BID,
      meta: {
        done: true,
      },
    });
  };
}

export function getListing(data) {
  console.log('::get listing:::');
  return (dispatch, getState) => {
    let hostname = API_URL;
    let {accessToken} = getState().auth;
    // data.token = accessToken
    axios
      .get(`${hostname}/listings/${data}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((resuults) => {
        dispatch({
          type: GET_LISTING_SUCCESS,
          payload: resuults.data,
        });
      })
      .catch((error) => {
        ToastNice.show({text1: "Error has occured", text2: error.message ? error.message : error.response.toString(), type: 'error'})
        dispatch({
          type: GET_LISTING_FAIL,
          payload: error.response ? error.response.data : error,
        });
      });
  };
}

export const actions = {
  getListings,
  postListing,
};

const actionHandlers = {};

actionHandlers[LOGOUT_SUCCESS] = () => {
  return initialState;
};

actionHandlers[GET_LISTINGS_SUCCESS] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.getListingSuccess = true;
  newState.getListingError = false;
  newState.getListingData = action.payload.data;
  return newState;
};

actionHandlers[GET_LISTINGS_FAIL] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.getListingSuccess = false;
  newState.getListingError = action.payload.error
    ? action.payload.error.message
    : action.payload.message;
  return newState;
};

actionHandlers[POST_LISTING_SUCCESS] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.postListingSuccess = true;
  newState.postListingError = false;
  newState.postListingData = action.payload.data
  return newState;
};

actionHandlers[POST_LISTING_ERROR] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.postListingSuccess = false;
  newState.postListingError = action.payload.error
    ? action.payload.error.details.toString()
    : action.payload.details.toString();
  return newState;
};

actionHandlers[BID_SUCCESS] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.bidSuccess = true;
  newState.bidError = false;
  newState.bidData = action.payload.data
  return newState;
};

actionHandlers[BID_ERROR] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.bidSuccess = false;
  newState.bidError = action.payload.error
    ? action.payload.error.details.toString()
    : action.payload.details.toString();
  return newState;
};

actionHandlers[STATE_CLEANUP_BID] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.bidError = null;
  newState.bidSuccess = false;
  newState.bidData = null
  return newState;
};

actionHandlers[STATE_CLEANUP_LISTING] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.postListingError = null;
  newState.postListingSuccess = false;
  newState.postListingData = null
  return newState;
};


actionHandlers[GET_LISTINGS_ERROR] = (state, action) => {
  let newState;
  newState.getListingSuccess = false;

  newState.getListingError = action.payload.error
    ? action.payload.error.message
    : action.payload.message;
  return newState;
};

actionHandlers[GET_LISTING_SUCCESS] = (state, action) => {
  let newState;
  newState = objectAssign({}, state);
  newState.getItemSuccess = true;
  newState.getItemError = false;
  newState.getItemData = action.payload.listing;
  newState.getItemTime = new Date();
  return newState;
};

actionHandlers[GET_LISTING_FAIL] = (state, action, test1, test2) => {
  console.log('Token check fail');
  let newState;
  newState = objectAssign({}, state);
  newState.getItemError = action.payload.error
    ? action.payload.error.message
    : action.payload.message;
  return newState;
};

// actionHandlers[GET_LISTING_ERROR] = (state, action) => {
//   console.log('Token check error.');
//   let newState;
//   newState = objectAssign({}, state);
//   return newState;
// };


const initialState = {
  getListingError:null,
  getListingdata:null,
  getListingSuccess:false,

  getItemData:null,
  getItemSuccess:false,
  getItemError:null,

  bidSuccess:false,
  bidError:null,
  bidData:null,

  postListingError:null,
  postListingSuccess:false,
  postListingData:null,
};

export default function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type];

  return handler ? handler(state, action) : state;
}
