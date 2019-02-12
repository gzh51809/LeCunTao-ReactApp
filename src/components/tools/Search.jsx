import React from 'react'

import './search.scss'


const Search = ({text,back, toSearch}) => {
  return (
    <div className="topSearch">
      <div className="searchBox">
          <input type="text" placeholder={text ? text : "输入商品名称"} onClick={toSearch}/>
          <span onClick={()=> {
            if(back) {
              back()
            }
          }}>取消</span>
      </div>
    </div>
  )
}

export default Search