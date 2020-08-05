# vue.use(plugin, arguments)
原理：它接收一个插件，这个插件要么是方法，要么就是一个带有install属性的对象。简单的说，就是你给它什么，它就执行什么，比如你给它一个方法，它就会执行一个方法。如果你给它一个对象，且对象有install属性，那么它就会直接执行install
```js
// 源码解析
import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
              // 限制了自定义组建的类型
              const installedPlugins = (this._installedPlugins || (this._installedPlugins =
            []))
              //保存注册组件的数组，不存在及创建
              if (installedPlugins.indexOf(plugin) > -1) {
                //判断该组件是否注册过，存在return Vue对象
                return this
              }
              //调用`toArray`方法
              const args = toArray(arguments, 1)
              args.unshift(this)
              //将Vue对象拼接到数组头部
              if (typeof plugin.install === 'function') {
                //如果组件是对象，且提供install方法，调用install方法将参数数组传入，改变`this`指针为该组件
                plugin.install.apply(plugin, args)
              } else if (typeof plugin === 'function') {
                //如果传入组件是函数，这直接调用，但是此时的`this`指针只想为`null` 
                plugin.apply(null, args)
              }
              //在保存注册组件的数组中添加
              installedPlugins.push(plugin)
              return this
            }
}
```

# defineProperty
参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty  
vue2的双向绑定是通过Object.defineProperty()来实现。  
但实际上，defineProperty定义并不是用来直接做双向绑定的，而是用来给对象做属性标签的，使用这个方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。   
  
Object.defineProperty(obj, prop, descriptor)方法有三个参数：
  * obj: 定义属性的对象  
  * prop: 要定义或修改的属性名称或symbol  
  * descriptor: 要定义或修改的属性描述符   
返回值：  
  被传递给函数的对象

它的数据描述符有以下几个：
1. 数据描述符
* value: 该属性对应的值，默认undefined
* enumerable: 默认false，枚举属性，当为true时，该属性才会出现在对象的枚举属性中，使用for ... in和Object.key()中能获取该属性，为false时，通过枚举将拿不到此属性
* writable: 默认false, 可写属性，当为true时，value值才可被改变
* configurable: 默认false, 当为true时，该属性的描述符才能被改变，同时该属性也能从对应的对象上被删除
2. 存取描述符
* get: function() {return value}，当访问该属性时，会调用此方法，默认undefined
* set：function(newVal) { var value = newVal }, 当属性值被修改时，会调用此函数，默认undefined

```js
var a = { b: 1}
var value = a.b;
Object.defineProperty(a, 'b', {
  get: function() {}
}) 
a.b = 23
console.log(a.b) // undefined
```
```js
function vue() {
  this.$data = {a: 1}
  this.el = document.getElementById('app')
  this.virtualdom = ""
}
vue.prototype.observe = function(obj) {
  var value;
  for(var key in obj) {
    value = obj[key]
    if(typeof value === 'object') {
      this.observe(value)
    }else {
      Object.definedProperty(this.$data, key, {
      get: function() {
        return value;
      }
      set: function(newValue) {
        value = newValue;
        self.render()
      }
    })
    }
    
  }

}
```

关于虚拟dom：
```html
<div class="a">
  ha
  <p>1</p>
  <p>2</p>
  <p><span>3</span></p>
</div>
```
```js
virtualTree = {
  dom: "div",
  content:"ha",
  attribute: { class: "a"},
  children: [
    {
      dom: "p",
      content:"1",
      attribute: {},
      children: []
    },
    {
      dom: "p",
      content:"2",
      attribute: {},
      children: []
    },
    {
      dom: "p",
      content:"",
      attribute: {},
      children: [
        {
          dom: "span",
          content:"3",
          attribute: {},
          children: []
        }
      ]
    }
  ]
}
```

* vue2的比对方法： 
同级比对，每一层的节点比对，不包括父节点和子节点，如果发现节点有不同，则删除该节点及其子孙节点，并重新生成该节点。  
复杂度由dom结构决定，即使这个dom没改变过，每个dom也都要比对   
* vue3的比对方法：  
只有改变的地方才比对,优化了diff方法，查看content是否为动态参数，即是原始对象，还是{{cotent1}}这种动态渲染的，如果为动态的，将其值绑定一个方法。否则将其置为0，下次不再进行比对。
