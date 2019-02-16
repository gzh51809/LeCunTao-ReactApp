import React from 'react'

import { SwipeAction } from 'antd-mobile';

import './cartitem.scss'

class CartItem extends React.Component {
  render () {
    let { list, store_name,index} = this.props.item
    return (
      <div className="shop-group">
        <div className="cart-list-wp">
          <div className="cart-shop-name">
            <div className="goods-cart">
              <input type="checkbox" id="box1"/>
              <label htmlFor="box1" className={list.every(item => item.active === true) ? 'ck_c check' : 'ck_c'} onClick={() => {
                this.props.checkstore(index)
              }}>
                <span className="bottom" ></span>
                <span className="active" ></span>
              </label>
              <span>{store_name}</span>
            </div>
          </div>
          <ul className="cart-litem-list">
            {
              list.map((item,idx) => {
                return (
                  <li key={idx}>
                    <SwipeAction
                      style={{ backgroundColor: 'gray' }}
                      autoClose
                      right={[
                        {
                          text: '删除',
                          onPress: () => {
                            this.props.removeGoods([item.cartId])
                          },
                          style: { backgroundColor: '#E2421B', color: 'white', fontSize: '0.38rem'},
                        }
                      ]}
                    >
                      <div className="items-wl">
                        <input type="checkbox" className="edit-inp" id="good"/>
                        <label 
                          htmlFor="good" 
                          className={item.active ? 'ck_c check' : 'ck_c'} 
                          onClick={() => {
                            this.props.checkGood(index,idx)
                          }}>
                          <span className="bottom"></span>
                          <span className="active"></span>
                        </label>
                        <div className="it-img">
                          <img src={item.goods_image} alt=""/>
                        </div>
                        <div className="it-cart-product">
                          <span className="sitem-txt">{item.goods_name}</span>
                          <div className="sitem-msg">
                            <span>
                              <span>规格</span> <span>{
                                item.goods_spec.map(mes => {
                                  return (
                                    mes.sp_name+':'+mes.sp_value_name+' '
                                  )
                                })
                              }</span>
                            </span>
                          </div>
                          <div className="sitem-b">
                            <div className="stiem-p">
                              <span className="original-price"><i>¥</i> <span>{item.goods_marketprice}</span></span>
                              <span className="current-price"><i>¥</i> <span>{item.goods_price}</span></span>
                            </div>
                            <div className="quantity-wrapper">
                              <span className="quantity-decrease1" onClick={() => {
                                this.props.changeNum(index,idx,'sub')
                              }}>
                                <em className="reduce1"></em>
                              </span>
                              <input type="text" className="quantity" readOnly value={item.goods_num}/>
                              <span className="quantity-decrease2" onClick={() => {
                                this.props.changeNum(index,idx,'add')
                              }}>
                                <em className="plus"></em>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwipeAction>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default CartItem