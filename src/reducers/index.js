import {combineReducers} from 'redux';
import cartReducer from './cartReducer' //购物车

// 整合各个reducer
const reducer = combineReducers({
  cart: cartReducer
})

export default reducer