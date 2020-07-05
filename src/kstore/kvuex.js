let KVue

// 实现Store类
class Store { 
  constructor(options) {
    

    // 保存mutations
    this._mutations = options.mutations

    // 保存actions
    this._actions = options.actions

  //   // 保存getters
  //   // this._getters = options.getters
  //   this._wrappedGetters = options.getters


  //  // 绑定this到store实例
  //  const store = this
  //  console.log(store,'5555555')
  //   //口令：天王盖地虎
  //   // 1.遍历用户传入getters所有key，动态赋值，其值应该是函数执行结果
  //   // 2.确保它是响应式的，
  //   // Object.defineProperty(this.getters, key, {get(){}})
  //   // 3.缓存结果，可以利用computed

  //   this.getters = {}
  //   // store.getters = {}
  //   // const wrappedGetters = store._getters


  //   const computed = {}
  //   const forEachValue = (obj, fn) =>  {
  //     Object.keys(obj).forEach(key => fn(obj[key], key))
  //   }
  //   const partial = (fn, arg) => {
  //     console.log(arg,'arg===0000')
  //     // console.log(arg.state,'argstate===0000')
  //     return function () {
  //       return fn(arg)
  //     }
  //   }
  //   // function forEachValue (obj, fn) {
  //   //   Object.keys(obj).forEach(key => fn(obj[key], key))
  //   // }
  //   // function partial (fn, arg) {
  //   //   console.log(arg,'arg===0000')
  //   //   // console.log(arg.state,'argstate===0000')
  //   //   return function () {
  //   //     return fn(arg)
  //   //   }
  //   // }
  //  forEachValue(this._wrappedGetters, (fn, key) => {
  //    console.log(store,'store===0000')
  //   //  console.log(store.state,'storestate===0000')
  //   computed[key] = partial(fn, store)
  //   Object.defineProperty(store.getters, key, {
  //     get: () => store._vm[key],
  //     enumerable: true
  //   })
  // })




    this._wrappedGetters = options.getters;
    const computed = {}
    this.getters = {}
    const store = this;
    console.log(store,'6666666')
    // console.log(store.state,'store.state6666666')
    Object.keys(this._wrappedGetters).forEach(key => {
      const fn = store._wrappedGetters[key];
      computed[key] = function () {
        console.log(store,'777777')
        console.log(store.state,'store.state77777')
        return fn(store.state)
      }
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key],
        enumerable: true
      })
    })








    const {commit, dispatch} = store
    this.commit = function boundCommit(type, payload) {
      commit.call(store, type, payload)
    }
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload)
    }
    // 响应式的state
    this._vm = new KVue({
      data: {
        $$state: options.state
      },
      computed: computed    
    })
  }

  get state() {
    return this._vm._data.$$state
  }
  set state(v) {
    console.error('please use replaceState to reset state');
    
  }

  // commit(type, payload): 执行mutation，修改状态 
  commit(type, payload) {
    // 根据type获取对应的mutation
    const entry = this._mutations[type]

    if (!entry) {
      console.error('unknown mutation type');
      return
    }

    entry(this.state, payload)

  }

  
  // dispatch(type, payload)
  dispatch(type, payload) {
    const entry = this._actions[type]

    if (!entry) {
      console.error('unknown action type');
      return
    }

    return entry(this, payload)
  }
}

// 实现插件
function install(Vue) {
  KVue = Vue

  // 混入
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

// 此处导出的对象理解为Vuex
export default { Store, install }