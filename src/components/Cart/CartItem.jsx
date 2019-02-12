import React from 'react'

import { SwipeAction } from 'antd-mobile';

import './cartitem.scss'

class CartItem extends React.Component {
  render () {
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
            <li>
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
                  <img src="https://img.lecuntao.com/data/upload/shop/store/goods/4258/2017/10/02/4258_05602757565807941_360.jpg" alt=""/>
                </div>
                <div className="it-cart-product">
                  <span className="sitem-txt">【特色馆】韶关土香楼 竹筒饼 220g/盒 125g/盒*4盒/箱  糕点 220g/盒（黑米味）</span>
                  <div className="sitem-msg">
                    <span>
                      <span>规格</span> <span>220g/盒（黑米味）</span>
                    </span>
                  </div>
                  <div className="sitem-b">
                    <div className="stiem-p">
                      <span className="original-price"><i>¥</i> <span>21.00</span></span>
                      <span className="current-price"><i>¥</i> <span>18.00</span></span>
                    </div>
                    <div className="quantity-wrapper">
                      <span className="quantity-decrease1">
                        <em className="reduce1"></em>
                      </span>
                      <input type="text" className="quantity" readOnly value="1"/>
                      <span className="quantity-decrease2">
                        <em className="plus"></em>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwipeAction>
            </li>
            <li>
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
                  <img src="https://img.lecuntao.com/data/upload/shop/store/goods/4258/2017/10/02/4258_05602757565807941_360.jpg" alt=""/>
                </div>
                <div className="it-cart-product">
                  <span className="sitem-txt">【特色馆】韶关土香楼 竹筒饼 220g/盒 125g/盒*4盒/箱  糕点 220g/盒（黑米味）</span>
                  <div className="sitem-msg">
                    <span>
                      <span>规格</span> <span>220g/盒（黑米味）</span>
                    </span>
                  </div>
                  <div className="sitem-b">
                    <div className="stiem-p">
                      <span className="original-price"><i>¥</i> <span>21.00</span></span>
                      <span className="current-price"><i>¥</i> <span>18.00</span></span>
                    </div>
                    <div className="quantity-wrapper">
                      <span className="quantity-decrease1">
                        <em className="reduce1"></em>
                      </span>
                      <input type="text" className="quantity" readOnly value="1"/>
                      <span className="quantity-decrease2">
                        <em className="plus"></em>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwipeAction>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default CartItem