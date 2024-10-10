import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { filters } from './filters.reducer';


const rootReducer = combineReducers({
  authentication,
  alert,
  filters
});

export default rootReducer;