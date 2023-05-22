import {combineReducers} from 'redux';
import auth from './modules/auth';
import admin from './modules/admin'
import listing from './modules/listing'

// import users from './modules/usermanagement';
export default combineReducers({
  auth: auth,
  admin:admin,
  listing:listing
});
