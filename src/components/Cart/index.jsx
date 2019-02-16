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
      flg: true,
      cartList: [],
      allCheck: false,
      count: 0,
      total: '0.00'
    }
    this.changeType = this.changeType.bind(this)
    this.checkAll = this.checkAll.bind(this)
    this.checkStore = this.checkStore.bind(this)
    this.checkGood = this.checkGood.bind(this)
    this.changeNum = this.changeNum.bind(this)
    this.removeGoods = this.removeGoods.bind(this)
    this.updataCheckNum = this.updataCheckNum.bind(this)
  }

  componentDidMount () {
    let arr = []
    this.props.cartList.forEach((item, index) =>{
      if (JSON.stringify(arr).indexOf(item.store_name)===-1) arr.push({store_name: item.store_name,active: false, list: [],index}) 
    })
    arr.forEach((item,index) => {
      this.props.cartList.forEach(i => {
        if(item.store_name === i.store_name) {
          i.active = false
          arr[index].list.push(i)
        }
      })
    })

    this.setState({
      cartList: arr
    })
  }

  // 全选
  checkAll () {
    let allCheck = !this.state.allCheck
    let cartList = this.state.cartList
    if (cartList.length !== 0) {
      cartList.forEach(ele => {
        ele.active = allCheck
        ele.list.forEach(item => {
          item.active = allCheck
        })
      })
    }
    this.setState({
      allCheck,
      cartList
    }, () => {
      this.updataCheckNum()
    })
  }

  // 店铺全选
  checkStore (index) {
    let list = this.state.cartList
    list[index].active = !list[index].active
    list[index].list.forEach(ele => {
      ele.active = list[index].active
    })
    let bool = list.every(item => {
      return item.active === true
    })
    this.setState({
      cartList: list,
      allCheck: bool
    },() => {
      this.updataCheckNum()
    })
  }

  updataCheckNum () {
    let count = 0
    let total = 0
    this.state.cartList.forEach(ele => {
      ele.list.forEach(item => {
        if (item.active) {
          count++
          total += item.goods_num * item.goods_price
        }
      })
    })
    this.setState({
      count,
      total: total.toFixed(2)
    })
  }

  // 商品单选
  checkGood (storeIndex,goodIndex) {
    let list = this.state.cartList
    let allCheck = this.state.allCheck
    list[storeIndex].list[goodIndex].active = !list[storeIndex].list[goodIndex].active
    list[storeIndex].active = list[storeIndex].list.every(ele => {
      return ele.active === true
    })
    allCheck = list.every(ele => {
      return ele.active === true
    })
    this.setState({
      cartList: list,
      allCheck
    }, () => {
      this.updataCheckNum()
    })
  }
  
  // 显示删除按钮
  changeType () {
    let flg = !this.state.flg
    this.setState({
      flg
    })
  }

  // 数量增加减少
  changeNum (storeIndex,goodIndex,type) {
    let cartList = this.state.cartList
    if(type === 'add') {
      if(cartList[storeIndex].list[goodIndex].goods_storage <= cartList[storeIndex].list[goodIndex].goods_num) return
      this.props.updateQty({
        cartId: cartList[storeIndex].list[goodIndex].cartId,
        goods_num: ++cartList[storeIndex].list[goodIndex].goods_num
      })
    }
    if(type === 'sub') {
      if(cartList[storeIndex].list[goodIndex].goods_num <= 1) return
      this.props.updateQty({
        cartId: cartList[storeIndex].list[goodIndex].cartId,
        goods_num: --cartList[storeIndex].list[goodIndex].goods_num
      })
    }
  }

  // 删除商品
  removeGoods (arr) {
    if (arr === undefined) return
    let idArr = []
    let cartList = this.state.cartList
    if (arr === 'more') {  // 删除多个
      cartList.forEach(ele =>{
        ele.list.forEach((item,index) => {
          if (item.active === true) {
            idArr.push(item.cartId)
            ele.list.splice(index,1)
          }
        })
      })
    } else {
      cartList.forEach((ele,idx) =>{
        ele.list.forEach((item,index) => {
          if (item.cartId === arr[0]) {
            ele.list.splice(index,1)
          }
        })
        if (ele.list.length === 0) cartList.splice(idx,1)
      })
      idArr = arr
    }
    if (idArr.length === 0) return
    this.setState({
      cartList
    }, () => {
      this.updataCheckNum()
    })
    this.props.removeGood(idArr)
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

          rightContent={[<span key={'change'} className="editor-txt" onClick={this.changeType}>{flg ? '编辑全部' : '完成'}</span>]}
        >购物车</NavBar>
        <div className="mtop">
          {
            this.state.cartList.map((item) => {
              // console.log(item)
              return (
                <CartItem 
                  item={item} 
                  key={item.store_name} 
                  checkstore={this.checkStore}
                  checkGood={this.checkGood}
                  changeNum={this.changeNum}
                  removeGoods={this.removeGoods}
                />
              )
            })
          }
        </div>
        <div className="shop-settlement">
          <div className="set-lwp">
            <div className="set-sel">
              <input type="checkbox" className="total-inp magic-checkbox" id="ck_c6"/>
              <label htmlFor="ck_c6" className={(this.state.cartList.every(item => item.active === true) && this.state.cartList.length !== 0) ? 'ck_c check' : 'ck_c'} onClick={this.checkAll}>
                <span className="bottom"></span>
                <span className="active"></span>
              </label>
              <span className="text">全选</span>
            </div>
            <div className="set-price" style={{display: flg ? 'block' : 'none'}}>
              <div className="price-total">
                <span className="total-txt">合计</span>
                <span className="price-r">
                  <i>¥</i>
                  <span className="cart_total_count"> {this.state.total}</span>
                </span>
              </div>
              <div className="set-freight">不含运费</div>
            </div>
          </div>
          <div className="set-rwp">
            <div className="btn-sub" style={{display: flg ? 'block' : 'none'}}>去结算<span className="sumGoodsNum"> ({this.state.count})</span></div>
            <div className="btn-del" style={{display: !flg ? 'block' : 'none'}} onClick={() => {
              this.removeGoods('more')
            }}>删除<span> ({this.state.count})</span></div>
          </div>
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
    removeGood (idArr) {
      dispatch(cartAction.removeGood(idArr))
    },
    updateQty (object) {
      dispatch(cartAction.updateQty(object))
    }
  }
}

Cart = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default Cart