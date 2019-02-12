import React from 'react'
import Search from '../tools/Search'
import { PullToRefresh, Toast } from 'antd-mobile'
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
      loadKey: true,
      activeIndex: 0,
      isTop: 0,
      type1: true,
      type2: true,
      min: '',
      max: '',
      showBox: false,
      refreshing: false,
      pageCount: 1,
      requestData: {
        provinc: 140,
        city: 140100000000,
        keyword: this.props.match.params.keyword ? this.props.match.params.keyword : '',
        page: 0,
        coupon_id: '',
        sorted: 4,
        sequence: 0,
        start_price: '',
        ent_price: '',
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
    this.pushToDetails = this.pushToDetails.bind(this)
    this.changeType = this.changeType.bind(this)
  }

  componentDidMount () {
    console.log(this.props)
    this.loadMore()
  }

  clickActive (index) {
    let obj = {}
    let num = 0
    let requestData = this.state.requestData
    if (index === 0) {
      requestData['sorted'] = 4
      requestData['sequence'] = 0
    }
    if (index === 1) {
      requestData['sorted'] = 1
      requestData['sequence'] = 0
    }
    if (index === 2) {
      num = 2
      if (this.state.isTop === 2 || this.state.isTop === 0) num = 1
      requestData['sorted'] = 3
      requestData['sequence'] = num === 1 ? 1 : 0
      obj.isTop = num
    }

    if (index === 3) {
      this.showBox()
      return
    }

    this.setState({
      activeIndex: index,
      isTop: num,
      requestData
    }, () => {
      this.loadMore(true)
    })
  }

  // 显示隐藏筛选盒子
  showBox () {
    let bool = !this.state.showBox
    this.setState({
      showBox: bool
    })
  }

  // 修改最大最小值
  changePrice (event) {
    if(isNaN(event.target.value) || event.target.value.indexOf(' ') !== -1){
      return
    }
    let min = this.state.min
    let max = this.state.max
    if (event.target.className === 'min_price') {
      min = event.target.value
    }
    if (event.target.className === 'max_price') {
      max = event.target.value
    }
    this.setState({
      min,
      max
    })
  }

  changeType (event) {
    console.log(event.target.innerText)
    let { type1, type2, min, max} = this.state
    if (event.target.innerText === '乐6集') {
      type1 = !type1
    }
    if (event.target.innerText === '特色馆') {
      type2 = !type2
    }

    if (event.target.innerText === '重置') {
      type1 = true
      type2 = true
      min = ''
      max = ''
    }

    if (event.target.innerText === '确认') {
      if (type1 !== false || type2 !== false) {
        let requestData = this.state.requestData
        if (type1 && type2) {
          requestData.goods_from = 0
        } else if (type1 && type2 === false) {
          requestData.goods_from = 1
        } else {
          requestData.goods_from = 3
        }
        requestData.start_price = min
        requestData.ent_price = max
        this.setState({
          min,
          max,
          type1,
          type2,
          requestData,
          showBox: false
        }, () => {
          this.loadMore(true)
        })
      } else {
        Toast.info('乐6集、特色馆 必须选一个 !!!', 1);
      }
    }

    this.setState({
      type1,
      type2,
      min,
      max
    })
  }

  // 加载数据
  loadMore (key) {
    let data = this.state.requestData
    data.page = key ? 1 : data.page+1
    let count = this.state.pageCount
    if(data.page > count) {
      this.setState({
        refreshing: false
      }, () => {
        Toast.info('没有更多了 !!!', 1);
      })
      return
    }
    Toast.loading('Loading...', 0)
    let loadKey = this.state.loadKey  // 避免多次请求
    if (loadKey === false) return
    this.setState({
      loadKey: false
    }, () => {
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
        let list = []
        if (key) {
          list = res.data.datas.list
        } else {
          list = this.state.list
          res.data.datas.list.forEach(item=>{
            list.push(item)
          })
        }
        if(this.props.history.location.pathname.indexOf('/list') === -1) {
          Toast.hide()
          return
        }
        this.setState({
          list,
          pageCount: res.data.datas.page_count,
          refreshing: false,
          loadKey: true
        }, () => {
          Toast.hide()
        })
      }).catch(err=>{
        console.log(err)
        Toast.hide()
        this.setState({ refreshing: false , loadKey: true});
      })
    })
  }

  // 返回上一页
  toBack () {
    this.props.history.goBack()
  }

  // 跳转详情
  pushToDetails (id) {
    this.props.history.push({pathname: '/details/' + id})
  }

  render () {
    let { activeIndex, isTop, type1, type2, showBox, list, min , max  } = this.state
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
            </li>
          </ul>
          <div className="box" onClick={this.showBox}  style={{display: showBox ? 'block' : 'none'}}></div>
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
                <li className={type1 ? 'typeActive' : ''} onClick={this.changeType}>乐6集</li>
                <li className={type2 ? 'typeActive' : ''} onClick={this.changeType}>特色馆</li>
              </ul>
            </div>
            <div className="boxBtn">
              <span onClick={this.changeType}>重置</span>
              <span className="sure" onClick={this.changeType}>确认</span>
            </div>
          </div>
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
            <div key={i.goods_id} className="good" onClick={() => {
              this.pushToDetails(i.goods_id)
            }}>
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