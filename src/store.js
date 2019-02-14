// 生成一个仓库
import { createStore } from 'redux'
import reducer from './reducers'

const store = createStore(reducer)

export default store