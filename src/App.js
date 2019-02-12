import React, { Component } from 'react'
import './App.css'
import { Switch, Route, withRouter} from 'react-router-dom'

import { TabBar } from 'antd-mobile'

// 引入路由组件
import Home from '@/components/Home/index'
import Cate from '@/components/Cate/index'
import Cart from '@/components/Cart/index'
import Mine from '@/components/Mine/index'
import err from '@/components/err'
import Search from '@/components/Search/index'
import Goodlist from '@/components/List/Goodlist.jsx'
import Details from '@/components/Details/index'

// 引入底部导航图片
import shouyeNor from '@/assets/img/icon_shouye_normal.png'
import shouyeClick from '@/assets/img/icon_shouye_click.png'
import cateNor from '@/assets/img/icon_fenlei_normal.png'
import cateClick from '@/assets/img/icon_fenlei_click.png'
import cartNor from '@/assets/img/icon_gouwuche_normal.png'
import cartClick from '@/assets/img/icon_gouwuche_click.png'
import mineNor from '@/assets/img/icon_wode_normal.png'
import mineClick from '@/assets/img/icon_wode_click.png'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: [
        {
          text: '首页',
          path: '/',
          icon: shouyeNor,
          selectedIcon: shouyeClick
        },
        {
          text: '分类',
          path: '/cate',
          icon: cateNor,
          selectedIcon: cateClick
        },
        {
          text: '购物车',
          path: '/cart',
          icon: cartNor,
          selectedIcon: cartClick
        },
        {
          text: '我的',
          path: '/mine',
          icon: mineNor,
          selectedIcon: mineClick
        }
      ],
      obj: '',
      hidden: false,
      showArr: ['/','/vate','/cart','/mine']
    }
  }
  
  componentDidMount () {
    // console.log(['/', '/cate', 'cart', 'mine'].indexOf(this.props.history.location.pathname) !== -1)
    let bool = this.state.showArr.indexOf(this.props.history.location.pathname) === -1
    this.setState({
      obj: this.refs.main,
      hidden: bool
    })
  }

  componentWillReceiveProps(nextProps) { 
    // let {id} = nextProps.match; 
    let bool = this.state.showArr.indexOf(nextProps.location.pathname) === -1
    this.setState({
      hidden: bool
    })
    console.log(nextProps.location)
  }

  render() {
    let { tabs } = this.state
    let {history} = this.props
    return (
      <div className="app">
        <div id="main">
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/cate" component={Cate} exact/>
          <Route path="/cart" component={Cart} exact />
          <Route path="/mine" component={Mine} exact />
          <Route path="/search" component={Search} exact />
          <Route path="/list/:keyword" component={Goodlist} exact />
          <Route path="/details/:id" component={Details} exact/>
          <Route component={err}/>
        </Switch>
        </div>
        <footer id="footer" style={{display: this.state.hidden ? 'none' : 'block'}}>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#f81234"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            {tabs.map(item => {
              return (
                <TabBar.Item
                  title={item.text}
                  key={item.path}
                  selected={this.props.history.location.pathname === item.path}
                  hidden={this.state.hidden}
                  icon={<div style={{
                    width: '0.44rem',
                    height: '0.48rem',
                    background: `url(${item.icon}) center center /  0.44rem 0.48rem no-repeat` }}
                  />
                  }
                  selectedIcon={<div style={{
                    width: '0.44rem',
                    height: '0.48rem',
                    background: `url(${item.selectedIcon}) center center /  0.44rem 0.48rem no-repeat` }}
                  />
                  }
                  onPress = {() => {
                    if(history.location.pathname === item.path) return
                    history.push(item.path)
                    this.setState({
                      selectedTab: history.location.pathname
                    })
                  }}
                />
              )
            })}
          </TabBar>
        </footer>
      </div>
    )
  }
}

App = withRouter(App)

export default App
