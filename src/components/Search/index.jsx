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
      hisItem: ['sss']
    }
    this.changeSelect = this.changeSelect.bind(this)
  }

  componentDidMount () {
    Axios({
      method: 'post',
      url: '/api/lct?api_version=2.3.0&platType=2&client=wap&isEncry=0&time=1549698503924&act=goods&op=hotWord'
    }).then(res => {
      this.setState({
        hotItem: res.data.datas.list
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

  render () {
    let { show, hide, push } = this.props
    let { selectList, selectIndex, selectShow, selectContent, hotItem, hisItem } = this.state
    return (
      <div className="search" style={{display: show ? 'block' : 'none'}}>
        <div className="searchTop">
          <div className="closeSearch" onClick={hide}>
            <img src={closeImg} alt=""/>
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
            push(this.state.selectContent)
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
                    push(item)
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
              })
            }}>
              <i></i>清空
            </div>
          </div>
          <ul className="hisItem">
            {
              hisItem.map((item,index) => {
                return (
                  <li key={index}>{item}</li>
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