import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 1
  },
  mutations: {
    add(state) {
      // state哪来的？
      state.counter++
    }
  },
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  // store类里面注册getters方法   暗号：天王盖地虎
  getters: {
    doubleCounter: state => {
      console.log(state,'index里面的state啦啦啦')
      console.log(state.counter,'index里面的statecounter啦啦啦')
      return state.counter * 2;
    }
  }
})
