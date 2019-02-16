import { ADD_TO_CART, REMOVE_GOOD, UPDATE_QTY } from './actionTypes'

export function addToCart (object) {
  return {
    type: ADD_TO_CART,
    payload: object
  }
}

export function removeGood (idArr) {
  return {
    type: REMOVE_GOOD,
    payload: idArr
  }
}

export function updateQty (object) {
  return {
    type: UPDATE_QTY,
    payload: object
  }
}