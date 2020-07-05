import Vue from 'vue'
// 暗号：村长喊你来搬砖
// 作业：使用extend方式创建组件实例并挂载
// 思路：
// 1.传入一个组件配置
// 2.创建它的实例，并且将它挂载到body上
// 3.返回组件实例
// 4.销毁（优化）
export default function create(Component, props) {
  // extend方法返回的组件构造函数 传入一个组件配置Component
  const Ctor = Vue.extend(Component);
  // 实例创建
  const comp = new Ctor({propsData: props});
  comp.$mount();
  //挂载body
  document.body.appendChild(comp.$el);
  comp.remove = ()=> {
    document.body.removeChild(comp.$el);
  //销毁
    comp.$destroy;
  }
  return comp //返回组件实例
}
