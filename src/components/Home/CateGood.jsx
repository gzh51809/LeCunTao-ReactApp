import React from 'react'

import more from '@/assets/img/icon_more.png'
import './CateGood.scss'

const CateGood = ({ list, func, toMore, hasMore }) => {
  return (
    <div className="categoods">
      {
        list.map(item => {
          let list = hasMore ? item.goods_list : item.list
          let title = hasMore ? item.cate_info.cate_name : item.title
          return (
            <div className="goodBox" key={title}>
              <div className="goodTitle">
                <i></i><span className="title">{title}</span>
                {
                  hasMore ? (
                  <div className="toMore" onClick={toMore.bind(this, item.cate_info.gc_id)} >
                    <span>更多</span> <img src={more} alt=""/>
                  </div>
                  ) : ''
                }
              </div>
              <ul className="goodList">
                {
                  list.map(good => {
                    return (
                      <li key={good.goods_id+Math.random()} onClick={func.bind(this, good.goods_id)} title={good.goods_id}>
                          <div className="goodImg">
                            <img src={good.goods_image} alt=""/>
                          </div>
                          <p className="goodName">{good.goods_name}</p>
                          <div className="goodMess">
                            <span className="goodPrice">{good.goods_price}元</span>
                            <span className="saleNum">已售{good.goods_salenum}件</span>
                          </div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          )
        })
      }
    </div>
  )
}

export default CateGood