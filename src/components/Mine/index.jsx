import React from 'react'

import './index.scss'

import personPic from '../../assets/img/member_avatar_2x.png'

class Mine extends React.Component {
  render () {
    return (
      <div className="mine">
        <div className="per-t">
          <img src={personPic} alt="" className="userPic"/>
          <span className="username">lct_13113742089</span>
          <span className="set"></span>
        </div>
        <div className="total-order-w">
          <span className="my-order">我的订单</span>
          <i className="icon-r"></i>
          <span className="see-order">查看全部订单</span>
        </div>
        <ul className="per-status">
          <li>
            <div className="icon-wrap">
              <i className="icon-dfk"></i>
              <i className="ic-num">0</i>
            </div>
            <span>待付款</span>
          </li>
          <li>
            <div className="icon-wrap">
              <i className="icon-dfh"></i>
              <i className="ic-num">0</i>
            </div>
            <span>待发货</span>
          </li>
          <li>
            <div className="icon-wrap">
              <i className="icon-dsf"></i>
              <i className="ic-num">0</i>
            </div>
            <span>待收货</span>
          </li>
          <li>
            <div className="icon-wrap">
              <i className="icon-th"></i>
              <i className="ic-num">0</i>
            </div>
            <span>退款退货</span>
          </li>
        </ul>
        <div className="take-delivery">
          <div className="pad">
            <span className="per-l">
              <i className="icon-collect"></i>
              <span className="txt-l">我的集单</span>
            </span>
            <span className="per-r">
              <i className="icon-right"></i>
            </span>
          </div>
        </div>
        <div className="pad per-line">
          <span className="per-l">
            <i className="icon-loc"></i>
            <span className="txt-l">收货地址</span>
          </span>
          <span className="per-r">
            <span className="txt-r">管理地址信息</span>
            <i className="icon-right"></i>
          </span>
        </div>
        <div className="pad">
          <span className="per-l">
            <i className="icon-kj"></i>
            <span className="txt-l">卡劵包</span>
          </span>
          <span className="per-r">
            <span className="txt-r">红包</span>
            <i className="icon-right"></i>
          </span>
        </div>
        <div className="per-pri take-delivery">
          <div className="pad per-line">
            <span className="per-l">
              <i className="icon-pri"></i>
              <span className="txt-l">账户余额</span>
            </span>
            <span className="per-r">
              {/* <span className="txt-r">去充值</span> */}
              <i className="icon-right"></i>
            </span>
          </div>
          <div className="pad">
            <span className="per-l">
              <i className="icon-payment"></i>
              <span className="txt-l">支付密码</span>
            </span>
            <span className="per-r">
              <span className="txt-r">设置、管理支付密码</span>
              <i className="icon-right"></i>
            </span>
          </div>
        </div>
        <div className="per-bot">
          <div className="per-line pad">
            <span className="per-l">
              <i className="icon-tel"></i>
              <span className="txt-l">联系电话</span>
            </span>
            <span className="per-r">
              <span className="txt-r">400-088-0692</span>
              <i className="icon-right"></i>
            </span>
          </div>
          <div className="per-line pad">
            <span className="per-l">
              <i className="icon-feedback"></i>
              <span className="txt-l">意见反馈</span>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Mine