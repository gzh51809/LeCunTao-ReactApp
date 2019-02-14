import React from 'react'

import { SwipeAction } from 'antd-mobile';

import './cartitem.scss'

class CartItem extends React.Component {
  render () {
    let list = this.props.item
    return (
      <div className="shop-group">
        <div className="cart-list-wp">
          <div className="cart-shop-name">
            <div className="goods-cart">
              <input type="checkbox" id="box1"/>
              <label htmlFor="box1" className="ck_c">
                <span className="bottom" style={{border: "#fd5500",background: "#fd5500"}}></span>
                <span className="active"></span>
              </label>
              <span>乐村淘韶关市特色馆</span>
            </div>
          </div>
          <ul className="cart-litem-list">
            {
              list.map((item,index) => {
                return (
                  <li key={index}>
                    <SwipeAction
                      style={{ backgroundColor: 'gray' }}
                      autoClose
                      right={[
                        {
                          text: '删除',
                          onPress: () => console.log('delete'),
                          style: { backgroundColor: '#E2421B', color: 'white', fontSize: '0.38rem'},
                        }
                      ]}
                      onOpen={() => console.log('global open')}
                      onClose={() => console.log('global close')}
                    >
                      <div className="items-wl">
                        <input type="checkbox" className="edit-inp" id="good"/>
                        <label htmlFor="good" className="ck_c">
                          <span className="bottom" style={{border: "#fd5500",background: "#fd5500"}}></span>
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
                              <span className="quantity-decrease1">
                                <em className="reduce1"></em>
                              </span>
                              <input type="text" className="quantity" readOnly value={item.goods_num}/>
                              <span className="quantity-decrease2">
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