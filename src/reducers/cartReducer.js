// 引入actions 变量
import { ADD_TO_CART, REMOVE_GOOD, UPDATE_QTY } from '../actions/actionTypes'

let initialState = {
  cartList: [
    {
      cartId: 0,
      goods_id: 625368,
      goods_image: "https://img.lecuntao.com/data/upload/shop/store/goods/4753/2018/09/14/4753_05902409268171548_360.jpg",
      goods_marketprice: "119.70",
      goods_name: "【年货节】拉芳精油修护精华液120ml*3轻盈补水保湿抚平毛躁 中国大陆 lovefun/拉芳 120ml*3",
      goods_num: 2,
      goods_price: "81.00",
      goods_spec: [
        {sp_name: "产地", sp_value_name: "中国大陆"},
        {sp_name: "品牌", sp_value_name: "lovefun/拉芳"},
        {sp_name: "净含量", sp_value_name: "120ml*3"}
      ],
      goods_storage: 499,
      store_id: 4753,
      store_name: "拉芳旗舰店"
    },
    {
      cartId: 1,
      goods_id: 571387,
      goods_image: "https://img.lecuntao.com/data/upload/shop/store/goods/4258/2017/10/02/4258_05602757565807941_360.jpg",
      goods_marketprice: "21.00",
      goods_name: "【特色馆】韶关土香楼 竹筒饼 220g/盒 125g/盒*4盒/箱  糕点 220g/盒（黑米味）",
      goods_num: 1,
      goods_price: "18.00",
      goods_storage: 500,
      store_id: 4258,
      store_name: "乐村淘韶关市特色馆",
      goods_spec: [
        {sp_name: "规格", sp_value_name: "220g/盒（黑米味）"}
      ]
    }
  ]
}

const cartList = (state = initialState, action) => {
  switch (action.type) {
    // 加入购物车
    case ADD_TO_CART : 
      return {
        ...state,
        cartList: [
          ...state.cartList,
          action.payload
        ]
      }
    
    case REMOVE_GOOD: 
      return {
        ...state,
        cartList: state.cartList.filter(item =>{
          return action.payload.indexOf(item.cartId)
        })
      }
    
    case UPDATE_QTY: 
      return {
        ...state,
        cartList: state.cartList.map(item => {
          if (item.cartId === action.payload.cartId) item.goods_num = action.payload.goods_num
          return item
        })
      }
    default : 
      return state
  }
}

export default cartList