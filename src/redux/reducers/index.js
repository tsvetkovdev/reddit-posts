import {combineReducers} from 'redux'
import autoRefresh from './autoRefresh'
import items from './items'

const allReducers = combineReducers({
  autoRefresh,
  items,
})

export default allReducers