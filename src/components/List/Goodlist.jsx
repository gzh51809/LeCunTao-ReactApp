import React from 'react'
import Search from '../tools/Search'
import { PullToRefresh } from 'antd-mobile'
import Axios from 'axios'

import './goodlist.scss'

import Top from '../../assets/img/icon_top_gray.png'
import TopActive from '../../assets/img/icon_top_red.png'
import Down from '../../assets/img/icon_down_gray.png'
import DownActive from '../../assets/img/icon_down_red.png'

class GoodList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 1,
      isTop: 0,
      min: '',
      max: '',
      type1: true,
      type2: true,
      showBox: false,
      refreshing: false,
      pageCount: 1,
      requestData: {
        provinc: 140,
        city: 140100000000,
        keyword: this.props.match.params.keyword,
        page: 0,
        coupon_id: '',
        sorted: 4,
        sequence: 0,
        start_price: 0,
        ent_price: 0,
        goods_from: 0,
        key: '',
        store_id: ''
      },
      list: []
    }
    this.clickActive = this.clickActive.bind(this)
    this.changePrice = this.changePrice.bind(this)
    this.showBox = this.showBox.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this.toBack = this.toBack.bind(this)
  }

  componentDidMount () {
    console.log(this.props.match)
    this.loadMore()
  }

  clickActive (index) {
    let obj = {}
    let num = 0
    if (index === 2) {
      num = 2
      if (this.state.isTop === 2 || this.state.isTop === 0) num = 1
      obj.isTop = num
    }

    if (index === 3) {
      this.showBox()
      return
    }

    this.setState({
      activeIndex: index,
      isTop: num
    })
  }

  showBox () {
    let bool = !this.state.showBox
    this.setState({
      showBox: bool
    })
  }

  changePrice (event) {
    if(isNaN(event.target.value)){
      return
    }
    if (event.target.className === 'min_price') {
      this.setState({
        min: event.target.value
      })
    }
    if (event.target.className === 'max_price') {
      this.setState({
        max: event.target.value
      })
    }
  }

  loadMore () {
    let data = this.state.requestData
    data.page = data.page+1
    let count = this.state.pageCount
    if(data.page > count) {
      this.setState({
        refreshing: false
      })
      return
    }
    Axios({
      method: 'post',
      url: '/api/lct?api_version=2.3.0&platType=2&client=wap&isEncry=0&time=1549723834685&act=goods&op=goodsList',
      data,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res=>{
      console.log(res)
      let list = this.state.list
      res.data.datas.list.forEach(item=>{
        list.push(item)
      })
      this.setState({
        list,
        pageCount: res.data.datas.page_count,
        refreshing: false
      })
    }).catch(err=>{
      console.log(err)
      this.setState({ refreshing: false });
    })
  }

  toBack () {
    this.props.history.goBack()
  }

  render () {
    let { activeIndex, isTop, min, max, type1, type2, showBox, list } = this.state
    return (
      <div id="goodList">
        <div className="top" ref='top'>
          <Search text={this.props.match.params.keyword} back={this.toBack}/>
          <ul className="sort">
            <li className={activeIndex === 0 ? 'active' : ''} onClick={this.clickActive.bind(this, 0)}>全部</li>
            <li className={activeIndex === 1 ? 'active' : ''} onClick={this.clickActive.bind(this, 1)}>销量优先</li>
            <li className={activeIndex === 2 ? 'active' : ''} onClick={this.clickActive.bind(this, 2)}>
              价格
              <div className="isTop" >
                <img src={isTop === 1 ? TopActive : Top} alt=""/>
                <img src={isTop === 2 ? DownActive : Down} alt=""/>
              </div>
            </li>
            <li className={activeIndex === 3 ? 'active' : ''} onClick={this.clickActive.bind(this, 3)}>
              筛选<i className="showBox"></i>
              <div className="box" onClick={this.showBox} style={{display: showBox ? 'block' : 'none'}}>
              </div>
              <div className="boxBody" style={showBox ? {right: '0',opacity: '1'} : {right: '-86%',opacity: '0'}}>
                <div className="priceTo">
                  <h5>价格区间</h5>
                  <div className="inputItem">
                    <input type="text" placeholder="最低价" value={min} className="min_price" onChange={this.changePrice}/>
                    <span></span>
                    <input type="text" placeholder="最高价" value={max} className="max_price" onChange={this.changePrice}/>
                  </div>
                </div>
                <div className="priceTo">
                  <h5>商品类型</h5>
                  <ul>
                    <li className={type1 ? 'typeActive' : ''}>乐6集</li>
                    <li className={type2 ? 'typeActive' : ''}>特色馆</li>
                  </ul>
                </div>
                <div className="boxBtn">
                  <span>重置</span>
                  <span className="sure">确认</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="ge"></div>
        <PullToRefresh
          damping={60}
          ref={el => this.ptr = el}
          style={{
            flex: '1',
            overflow: 'auto'
          }}
          indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
          direction={this.state.down ? 'down' : 'up'}
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.setState({ refreshing: true });
            this.loadMore()
          }}
        >
          {list.map(i => (
            <div key={i.goods_id} className="good">
              <img src={i.goods_image} alt=""/>
              <div className="item_t">
                <h2 dangerouslySetInnerHTML = {{ __html: i.goods_name}}></h2>
                <h3>
                  <i></i>
                  {i.goods_price}
                  <span>{i.goods_salenum}人付款</span>
                </h3>
              </div>
            </div>
          ))}
        </PullToRefresh>
      </div>
    )
  }
}

export default GoodList