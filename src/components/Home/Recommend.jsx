import React from 'react'

import './recommend.scss'
import seeMore from '@/assets/img/img_le6ji_see_all.png'

const Recommend = ({ imgSrc, list, bigPic, func }) => {
  return (
    <div className="recommend">
      <h3>
        <img src={imgSrc} alt="" />
      </h3>
      <div className="Pic">
        <img src={bigPic} alt="" />
      </div>
      <div className="listBox">
        <ul className="recList">
          {
            list.map(item => {
              return (
                <li key={item.goods_id} onClick={func.bind(this, item.goods_id)}>
                  <div className="imgBox">
                    <img src={item.goods_image} alt="" />
                  </div>
                  <div className="listMess">
                    <div className="listName">{item.goods_name}</div>
                    <p className="listPrice">￥{item.goods_price}</p>
                  </div>
                </li>
              )
            })
          }
          {
            <li className="seeMore">
              <img src={ seeMore } alt=""/>
            </li>
          }
        </ul>
      </div>
    </div>
  )
}

export default Recommend
