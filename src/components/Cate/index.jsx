import React from 'react'
import Axios from 'axios'

import Seacrh from '@/components/tools/Search'
import { Toast } from 'antd-mobile';

import './index.scss'

class Cate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cateName: [],
      page: 0,
      cateContent: []
    }
    this.loadCate = this.loadCate.bind(this)
  }

  componentDidMount () {
    Axios.post('/api/lct?api_version=2.3.0&platType=2&client=wap&isEncry=0&time=1549630431249&act=mobile_cate&op=index')
    .then(res => {
      console.log(res)
      if(this.props.history.location.pathname === '/cate') {
        this.setState({
          cateName: res.data.datas
        }, () => {
          let index = this.state.page
          let id = this.state.cateName[index].gc_id
          this.loadCate(id)
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  loadCate (id) {
    Toast.loading('Loading...', 0, () => {
    });
    Axios({
      method: 'post',
      url: '/api/lct?api_version=2.3.0&platType=2&client=wap&isEncry=0&time=1549630431249&act=mobile_cate&op=index',
      data: {
        gc_id: id
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
      console.log(res)
      if(this.props.history.location.pathname !== '/cate') return
      this.setState({
        cateContent: res.data.datas
      }, () => {
        Toast.hide()
      })
    }).catch(err => {
      console.log(err)
      Toast.hide()
      Toast.fail('Load failed !!!', 1);
    })
  }

  render () {
    let { cateName, page, cateContent } = this.state
    return (
      <div id="cate">
        <Seacrh />
        <div className="cateBody">
          <ul className="cateName">
            {
              cateName.map((item, index) => {
                return (
                  <li key={item.gc_id} className={page === index ? 'active' : ''} onClick={() => {
                    this.setState({
                      page: index
                    })
                    this.loadCate(item.gc_id)
                  }}>{item.gc_name}</li>
                )
              })
            }
          </ul>
          <ul className="cateContent">
            {
              cateContent.map(item => {
                return (
                  <li key={item.gc_id}>
                    <div className="imgBox">
                      <img src={item.cate_img} alt=""/>
                    </div>
                    <p>{item.gc_name}</p>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Cate