import { createStore, combineReducers } from 'redux';
import { UserReducer } from './UserReducer';
import { ReportReducer } from './ReportReducer';

const rootReducer = combineReducers({
  user: UserReducer,
  report: ReportReducer, 
});

const store = createStore(rootReducer);

export default store;
