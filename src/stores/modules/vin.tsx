import objectAssign from 'object-assign';
// import {API_URL} from '@env';
import axios from 'axios';
import ToastNice from 'react-native-toast-message';
// const API_URL = 'http://165.22.48.133:3333';

const API_URL = 'http://192.168.254.106:3333'
export const GET_VIN_SUCCESS = 'vin/GET_VIN_SUCCESS';
export const GET_VIN_ERROR = 'vin/GET_VIN_ERROR';

export function vinScan(data){
    console.log(":vinscan:")
    console.log(data)
    return (dispatch, getState)=>{
      axios.get(`https://api.vehicledatabases.com/vin-decode/2C4RDGCG0FR805928`,{
        headers: {
          'Content-Type': 'application/json',
          'x-AuthKey': '58d25c2bfc204ca292c0cda9c2ee715f'
        }
      }).then((resuults)=>{
        console.log(resuults)
        dispatch({
          type: GET_VIN_SUCCESS,
          payload: resuults,
        });
      })
      .catch((error) => {
        ToastNice.show({text1: "Error has occured", text2: error.message ? error.message : error.response.toString(), type: 'error'})
        dispatch({
          type: GET_VIN_ERROR,
          payload: error.response ? error.response.data : error,
        });
      });
    }
}

const actionHandlers = {};


export const actions = {vinScan};

actionHandlers[GET_VIN_SUCCESS] = (state, action) => {
    let newState;
    newState = objectAssign({}, state);
    newState.getVinSuccess = true;
    newState.getVinError = false;
    newState.getVinData = action.payload.data;
    return newState;
};


actionHandlers[GET_VIN_ERROR] = (state, action) => {
    let newState;
    newState.getVinSuccess = false;
  
    newState.getVinError = action.payload.error
      ? action.payload.error.message
      : action.payload.message;
    return newState;
  };