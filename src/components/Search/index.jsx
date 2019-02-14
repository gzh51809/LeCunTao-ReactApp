import React from 'react'

import Axios from 'axios'

import './index.scss'

import shangpin from '@/assets/img/icon_tanchuang_shangpin.png'
import dianpu from '@/assets/img/icon_tanchuang_dianpu.png'
import closeImg from '@/assets/img/iclose.png'

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectIndex: 0,
      selectList: [
        {
          icon: shangpin,
          name: '商品'
        },
        {
          icon: dianpu,
          name: '店铺'
        }
      ],
      selectShow: false,
      selectContent: '',
      hotItem: [],
      hisItem: []
    }
    this.changeSelect = this.changeSelect.bind(this)
    this.go = this.go.bind(this)
    this.pushToList = this.pushToList.bind(this)
  }

  componentDidMount () {
    Axios({
      method: 'post',
      url: '/api/lct?api_version=2.3.0&platType=2&client=wap&isEncry=0&time=1549698503924&act=goods&op=hotWord'
    }).then(res => {
      if(this.props.history.location.pathname.indexOf('/search') === -1) return
      let his = sessionStorage.getItem('history') !==null ? sessionStorage.getItem('history').split('-') : []
      this.setState({
        hotItem: res.data.datas.list,
        hisItem: his
      })
    }).catch(err => {
      console.log(err)
    })
  }

  changeSelect (event) {
    this.setState({
      selectContent: event.target.value
    })
  }

  // 返回上一页
  go () {
    this.props.history.goBack()
  }

  // 搜索关键词
  pushToList (keyword) {
    if (keyword) {
      let arr = this.state.hisItem
      arr.push(keyword)
      if (arr.length > 10) arr.shift() 
      sessionStorage.setItem('history', arr.join('-'))
      this.props.history.push({pathname:"/list/" + keyword})
    }
  }

  render () {
    let { selectList, selectIndex, selectShow, selectContent, hotItem, hisItem } = this.state
    return (
      <div className="search">
        <div className="searchTop">
          <div className="closeSearch" onClick={this.go}>
            <img src={closeImg} alt="" />
          </div>
          <div className="searchBody">
            <div className="left">
              <div className="selectBtn" onClick={()=> {
                this.setState({
                  selectShow: true
                })
              }}>
                <span>{selectList[selectIndex].name}</span><i></i>
              </div>
              <ul className="selectList" style={{display: selectShow ? 'block' : 'none'}}>
                {
                  selectList.map((item,index) => {
                    return (
                      <li key={item.name} onClick={() => {
                        this.setState({
                          selectIndex: index,
                          selectShow: false
                        })
                      }}>
                        <img src={item.icon} alt=""/><span>{item.name}</span>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className="right">
                <input type="text" placeholder="输入商品名称" value={selectContent} onChange={this.changeSelect}/><i onClick={()=> {
                  this.setState({
                    selectContent: ''
                  })
                }}></i>
            </div>
          </div>
          <span className="btn" onClick={() => {
            // 搜索搜索框的关键词
            this.pushToList(this.state.selectContent)
          }}>搜索</span>
        </div>
        <div className='hotSearch'>
          <div className="hotTitle">
            <span>Hot</span> 热门搜索
          </div>
          <ul className="hotItem">
            {
              hotItem.map((item,index) => {
                return (
                  <li key={index} onClick={() => {
                    // 搜索热词
                    this.pushToList(item)
                  }}>{item}</li>
                )
              })
            }
          </ul>
        </div>
        <div className="history">
          <div className="hisTitle">
            <span>搜索历史</span>
            <div className="clearHis" onClick={() => {
              this.setState({
                hisItem: []
              }, () => {
                sessionStorage.removeItem('history')
              })
            }}>
              <i></i>清空
            </div>
          </div>
          <ul className="hisItem">
            {
              hisItem.map((item,index) => {
                return (
                  <li key={index} onClick={() => {
                    // 搜索历史搜索
                    this.pushToList(item)
                  }}>{item}</li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Search