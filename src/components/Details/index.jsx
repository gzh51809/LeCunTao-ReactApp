import React from 'react'
import Axios from 'axios'

import { Carousel } from 'antd-mobile'
import FixBar from '../tools/FixBar'

import './index.scss'

class Details extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      topList: [
        '商品','详情','推荐','营业执照'
      ],
      topActive: 0,
      data: [],
      imgHeight: '7.5rem',
      imgIndex: 0,
      imgAll: 0,
      goodInfo: {},
      store_Mess: {
        storeInfo: {},
        goodsDetail: {}
      },
      checkGood: {
        num: 1
      },
      obj: '',
      recommendGoods: [],
      xyArr: [0]
    }
    this.toXy = this.toXy.bind(this)
    this.toRecommendGood = this.toRecommendGood.bind(this)
  }

  requestMess () {
    
  }

  componentDidMount() {
    console.log(this.props.match)
    this.setState({
      obj: this.refs.obj
    })
    // 请求商品信息
    Axios({
      method: 'post',
      url: '/api/lct?api_version=2.3.0&platType=2&client=wap&isEncry=0&time=1549852050174&act=mobile_goods_detail&op=getGoodsInfo',
      data: {
        city_id: 140100000000,
        province_id: 140,
        goods_id: this.props.match.params.id,
        key: ""
      },
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
    }).then(res => {
      // 请求店铺信息
      Axios({
        method: 'post',
        url: '/api/lct?api_version=2.3.0&platType=2&client=wap&isEncry=0&time=1549855579695&act=mobile_goods_detail&op=getDetailData',
        data: {
          common_id: res.data.datas.goods_info.goods_commonid,
          goods_id: res.data.datas.goods_info.goods_id,
          key: ""
        },
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
      }).then(res => {
        console.log(res.data.datas)
        if(this.props.history.location.pathname.indexOf('/details') === -1) return
        this.setState({
          store_Mess: res.data.datas
        })
      }).catch(err => {console.log(err)})

      // 请求推荐信息
      Axios({
        method: 'post',
        url: '/api/lct?api_version=2.3.0&platType=2&client=wap&isEncry=0&time=1549871421874&act=mobile_goods_detail&op=getRecommentDetail',
        data: {
          gc_id: res.data.datas.goods_info.gc_id,
          province_id: 140,
          city_id: 140100000000,
          key: ''
        },
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
      }).then(res => {
        let arr = res.data.datas.recommendGoods
        arr = arr.length > 6 ? arr.slice(0,6) : arr
        let xyArr = this.state.xyArr
        xyArr.push(this.refs.xiangqing.offsetTop)
        xyArr.push(this.refs.tuijian.offsetTop)
        if(this.props.history.location.pathname.indexOf('/details') === -1) return
        this.setState({
          recommendGoods: arr,
          xyArr
        })
        console.log(xyArr)
      }).catch(err => console.log(err))

      // 处理商品信息
      let data = res.data.datas.img_list.map(item => {
        return item.goods_image
      })
      let num = 1
      if (data.length === 0) num = 0 
      if(this.props.history.location.pathname.indexOf('/details') === -1) return
      this.setState({
        data,
        imgIndex: num,
        imgAll: data.length,
        goodInfo: res.data.datas.goods_info,
        goods_spec: res.data.datas.goods_info.goods_spec
      })
    }).catch(err => {console.log(err)})
  }

  // 点击头部导航跳转到指定位置
  toXy (index) {
    if (index === 3) return
    this.setState({
      topActive: index
    }, () => {
      this.refs.obj.scrollTop = this.state.xyArr[index]
    })
  }

  toRecommendGood (id) {
    this.props.history.replace({pathname:"/details/" + id})
  }

  render () {
    let { topList, topActive, imgIndex, imgAll, goodInfo, store_Mess, checkGood, recommendGoods } = this.state
    return (
      <div className="details" ref="obj">
        <div className="top">
          <ul className="fix">
            {
              topList.map((item,index) => {
                return (
                  <li key={item} className={topActive === index ? 'topActive' : ''} onClick={this.toXy.bind(this, index)}>{item}</li>
                )
              })
            }
            <span onClick={() => {
              this.props.history.goBack()
            }}></span>
          </ul>
        </div>
        <div className="goodImg">
          <Carousel
            autoplay={true}
            infinite={false}
            dots={false}
            afterChange={index => {
              this.setState({
                imgIndex: index+1
              })
            }}
          >
            {this.state.data.map(val => (
              <a
                key={val}
                href="/#/details"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
                <img
                  src={val}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top', height: '100%' }}
                />
              </a>
            ))}
          </Carousel>
          <div className="index">
            /
            <span className="active">{imgIndex}</span>
            <span className="all">{imgAll}</span>
          </div>
        </div>
        <div className="shop-shade"></div>
        <div className="message">
          <div className="prod-title">
            <p className="prod-tit-l">
              <span>{goodInfo.goods_name}</span>
            </p>
            <div className="prod-tit-r">
              <i></i>
              <span>二维码</span>
            </div>
          </div>
          <div className="prod-tit-des">{goodInfo.goods_jingle}</div>
          <div className="prod-price">
            <span className="prod-money"><em>¥</em>{goodInfo.goods_price}</span>
            <span className="ori-price">{goodInfo.goods_marketprice}</span>
          </div>
          <div className="prod-freight">
              <span>运费：</span><span>{goodInfo.fare_title}</span>
          </div>
          <div className="space-line"></div>
          <div className="prod-spec">
            <span className="spec-desc">请选择</span>
            <div className="base-txt">{store_Mess.spec}</div>
            <div className="part-note-msg">{checkGood.num}个</div>
            <em className="icon-spot"></em>
          </div>
          <div className="space-line"></div>
          <div className="space-line"></div>
          <div className="space-line"></div>
          <div className="prod-shop">
            <div className="shoppic">
              <img src={store_Mess.storeInfo.store_logo} alt=""/>
            </div>
            <div className="shop-con">
              <div className="shopname">{store_Mess.storeInfo.store_name}</div>
              <div className="shopaddress">
                <span>所在地:</span><span>{store_Mess.storeInfo.area_info}</span>
              </div>
            </div>
            <div className="shopaddress"></div>
          </div>
          <div className="space-line"></div>
          <div className="cont-pull">查看图文详情</div>
        </div>
        <div className="wrap-shop" ref="xiangqing" dangerouslySetInnerHTML = {{ __html: store_Mess.goodsDetail.goods_body}}></div>
        <FixBar obj={this.state.obj} fix={true}/>
        <div className="shopping-guess-container" ref="tuijian">
          <div className="guess-recommend">为您推荐</div>
          <ul className="guess-cont">
            {
              recommendGoods.map((item,index) => {
                return (
                  <li className="mr20" key={index} onClick={() => {
                    this.toRecommendGood(item.goods_id)
                  }}>
                    <div className="guess-item-pic">
                      <img src={item.goods_image} alt=""/>
                    </div>
                    <div className="guess-item-content"><span>{item.goods_name}</span></div>
                    <div className="guess-item-price"><em>¥</em>{item.goods_price}</div>
                  </li>
                )
              })
            }
          </ul>
          <div className="al-bot">已经到底了</div>
        </div>
        <footer className="ft">
          <div className="cart-store">
            <em className="icon-store"></em>
            <span className="txt-store">店铺</span>
          </div>
          <div className="cart-car-icn">
            <div className="cart-car-wrap">
              <em className="btm-act-icn"></em>
              <span className="cart-num">0</span>
            </div>
            <span className="focus-info">购物车</span>
          </div>
          <div className="shopping-cart">加入购物车</div>
          <div className="shopping-buy">立即购买</div>
        </footer>
      </div>
    )
  }
}

export default Details