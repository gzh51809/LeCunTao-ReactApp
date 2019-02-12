import React from 'react'
import { Carousel } from 'antd-mobile';
import Axios from 'axios';
import {withRouter} from 'react-router-dom'

import Search from './Search'
import Platform from './Platform'
import Recommend from './Recommend'
import CateGood from './CateGood'
import FixBar from '@/components/tools/FixBar'

import './index.scss'

import leImg from '@/assets/img/imgLe6Ji.png'
import feImg from '@/assets/img/icon_teseguan.png'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      addrName: '太原市',
      data: ['1', '2', '3'],
      imgHeight: '4.1rem',
      platformData: [],
      le6j: {
        recommend_goods: [],
        le6ji_img: ''
      },
      feature: {
        recommend_goods: [],
        feature_img: ''
      },
      cateIndex: '',
      cate: [],
      cateGood: [],
      page: 1,
      hotRecommend: [
        {
          title: '热门推荐',
          list: []
        }
      ],
      obj: '',
      toRed: false,
      fix: false,
      cateH: '',
      hotH: '',
      cateArr: {},
      toTopShow: false,
      axiosKey: true
    }
    this.loadMore = this.loadMore.bind(this)
    this.homeScroll = this.homeScroll.bind(this)
    this.pushToDetails = this.pushToDetails.bind(this)
  }

  componentDidMount() {
    Axios.get('/api/lct?api_version=2.3.0&platType=2&client=wap&isEncry=0&time=1549177915385&act=index&op=index&key=').then((res)=> {
      if (this.props.history.location.pathname === '/') {
        this.setState({
          data: res.data.datas.adv,
          platformData: res.data.datas.platform.list,
          le6j: res.data.datas.le6ji,
          feature: res.data.datas.feature,
          cate: res.data.datas.category,
          cateGood: res.data.datas.category_goods
        }, () => {
          let cateArr = []
          let div = this.refs.good.querySelectorAll('.goodBox')
          for(var i = 0, len = div.length; i < len; i++) {
            cateArr.push({
              index: i,
              top: div[i].offsetTop-90
            })
          }
          this.setState({
            cateH: this.refs.cate.offsetTop,
            hotH: this.refs.hot.offsetTop,
            cateArr
          })
        })
      }
    }).catch(err => {
      console.log(err)
    })
    this.loadMore(this.state.page)
    this.setState({
      obj: this.refs.home
    })
    this.refs.home.addEventListener('scroll',this.homeScroll)
  }

  componentWillUnmount () {
    this.refs.home.removeEventListener('scroll', this.homeScroll)
  }

  homeScroll () {
    let thisTop = this.refs.home.scrollTop
    let scrollH = this.refs.home.scrollHeight
    let clientH = this.refs.home.clientHeight
    let red = thisTop > (clientH / 4)
    let index

    // 搜索框背景色
    if (this.state.toRed === false && red) {
      this.setState({
        toRed: true
      })
    }
    if(this.state.toRed && red === false) {
      this.setState({
        toRed: false
      })
    }
    
    // 分类导航栏固定顶部
    if (thisTop >= this.state.cateH-30 && this.state.fix === false && thisTop <= this.state.hotH-90) {
      this.setState({
        fix: true,
        toTopShow: true
      })
    }
    if(thisTop < this.state.cateH-30 && this.state.fix) {
      this.setState({
        fix: false,
        toTopShow: false
      })
    }
    
    if (thisTop > this.state.hotH-90 && this.state.fix) {
      this.setState({
        fix: false
      },() => {
      })
    }
    
    // 分类框背景色
    if (this.state.cate.length>0) {
      for (let i=0,len= this.state.cateArr.length;i<len;i++) {
        if (thisTop < this.state.cateArr[i].top) {
          break;
        }
        index = this.state.cate[i].gc_id
      }
      if (this.state.cateIndex !== index && thisTop <= this.state.hotH-90) {
        this.setState({
          cateIndex: index
        })
      }
    }

    // 无限加载
    if(thisTop >= scrollH - clientH) {
      let page = this.state.page+1
      this.loadMore(page)
    }
  }

  //跳转到商品详情
  pushToDetails (id) {
    this.props.history.push({pathname:"/details/" + id})
  }

  loadMore (page) {
    if (this.state.axiosKey === false) return
    this.setState({
      axiosKey: false
    })
    Axios({
      method: 'post',
      url: '/api/lct?api_version=2.3.0&platType=2&client=wap&isEncry=0&time=1549456571830&act=goods&op=goodsRecom_new',
      data: {
        provinc: 140,
        city: 140100000000,
        page,
        pageSize: 10
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
      if(this.props.history.location.pathname !== '/') {
        return
      }
      let hot = this.state.hotRecommend
      res.data.datas.list.forEach(element => {
        hot[0].list.push(element)
      });
      this.setState({
        hotRecommend: hot,
        page,
        axiosKey: true
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render () {
    let { addrName, platformData, le6j, feature, cate, cateIndex, cateGood, hotRecommend, toRed, fix} = this.state
    
    return (
      <div id="home" ref='home'>
        <Search addrName={addrName} toRed={toRed} toSearch={() => {
          this.props.history.push('/search')
        }}/>
        <Carousel
          dotStyle={{
            background: '#000',
            opacity: '.2'
          }}
          dotActiveStyle= {{
            background: '#fff'
          }}
        >
          {this.state.data.map(val => (
            <a
              key={val}
              href={val.adv_url}
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={val.adv_image}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' , height: '100%'}}
              />
            </a>
          ))}
        </Carousel>
        <Platform data={platformData}/>
        <Recommend list= {le6j.recommend_goods} imgSrc={leImg} bigPic={le6j.le6ji_img} func={id => {
          this.pushToDetails(id)
        }}/>
        <Recommend list= {feature.recommend_goods} imgSrc={feImg} bigPic={feature.feature_img} func={id => this.pushToDetails(id)}/>
        <div className="cate" style={{paddingTop: fix ? '1.14rem' : '0.2rem'}} ref='cate'>
          <ul className={`cateTitle ${fix ? 'fix' : ''}`} >
              {
                cate.map((item , index) => {
                  return (
                    <li key={item.gc_id} onClick={() => {
                      this.refs.home.scrollTop = this.state.cateArr[index].top+2
                    }}>
                      <h3 style={{background: item.gc_id !== cateIndex ? '' : item.cate_color}} className={item.gc_id !== cateIndex ? 'notActive' : ''}>
                        <span style={{background: `url(${item.cate_image}) no-repeat 0 center`,backgroundSize: '20%'}}>{item.cate_name}</span>
                      </h3>
                    </li>
                  )
                })
              }
          </ul>
        </div>
        <div className="good" ref='good'>
          <CateGood list={cateGood} hasMore={true} func={id => this.pushToDetails(id)} toMore={id => {console.log(id)}}/>
        </div>
        <div ref='hot'>
          <CateGood list={hotRecommend} func={id => this.pushToDetails(id)} hasMore={false}/>
        </div>
        <FixBar obj={this.state.obj} fix={this.state.toTopShow}/>
      </div>
    )
  }
}

Home = withRouter(Home)

export default Home