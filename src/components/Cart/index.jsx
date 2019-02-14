import React from 'react'

import { connect } from 'react-redux'
import cartAction from '../../actions/index'

import './index.scss'

import { NavBar } from 'antd-mobile';
import CartItem from './CartItem'

class Cart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      flg: "true",
      cartList: []
    }
  }

  componentDidMount () {
    this.setState({
      cartList: this.props.cartList
    }, () => {
      console.log(this.state.cartList)
    })
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
            <CartItem item={this.state.cartList}/>
        </div>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    cartList: state.cart.cartList
  }
}

let mapDispatchToProps = dispatch => {
  return {
    addToCart (object) {
      dispatch(cartAction.addToCart(object))
    },
    removeGood (cartId) {
      dispatch(cartAction.removeGood(cartId))
    },
    updateQty (object) {
      dispatch(cartAction.updateQty(object))
    }
  }
}

Cart = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default Cart