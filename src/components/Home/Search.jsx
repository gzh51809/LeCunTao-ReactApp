import React from 'react'

import './Search.scss'

const Seacrh = ({addrName, toRed}) => {
  return (
    <div className="homeSearch"  style={{background: toRed ? 'rgb(248, 18, 52)' : ''}}>
          <div className="searchLeft">
            <i className="addrLogo"></i><span>{addrName}</span><i className="inIcon"></i>
          </div>
          <div className="searchRight"><i className="searchLogo"></i><input type="text" placeholder="搜索您需要的商品"/></div>
    </div>
  )
}

export default Seacrh