import React from 'react'

import './index.scss'

import { NavBar } from 'antd-mobile';
import CartItem from './CartItem'

class Cart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      flg: "true"
    }
  }
  render () {
    let { flg } = this.state
    return (
      <div className="cart">
        <NavBar
          mode="light"
          leftContent={<i className="hd_icon_ret"></i>}
          onLeftClick={() => {
            this.props.history.goBack()
          }}

          rightContent={[<span key={'change'} flg={flg} className="editor-txt">{flg === "true" ? '编辑全部' : '完成'}</span>]}
        >购物车</NavBar>
        <div className="mtop">
          <CartItem />
        </div>
      </div>
    )
  }
}

export default Cart