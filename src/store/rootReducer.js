import {combineReducers} from '@reduxjs/toolkit'
import dataReducer from './reducers/dataReducer'

const rootReducer = combineReducers({
  'DATA': dataReducer,
})

export default rootReducer
