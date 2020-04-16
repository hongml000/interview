# vue相关知识
## computed和watch的区别
### computed
1. 支持缓存，只有依赖数据发生改变，才会重新进行计算  
2. 不支持异步，当computed内有异步操作时无效，无法监听数据的变化  
3. computed 属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data中声明过或者父组件传递的props中的数据通过计算得到的值    
4. 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用computed  
5. 在computed中的，属性都有一个get和一个set方法，只有给属性值直接赋值时，才会调用set方法。computed中getter和setter方法是相互独立的，并不是调用了setter方法就会调用getter方法。只有在set方法中，有对get中所依赖的数据发生变化时，才会触发get方法
```js
  computed: {
    updateMessage: {
      get: function() {
        console.log('计算属性', this.message)
        return this.message
      },
      set: function(newVal) {
        // 只有对get中所依赖的数据发生变化时，才会触发get方法
        this.message = newVal;
        // 如果改变别的值，是不会触发get方法的   
        this.mess = newVal;
        console.log('newVal', newVal)
      }
    }
  },
 mounted () {
    this.updateMessage = '222'    // 直接对updateMessage赋值，才会调用set方法
    console.log('测试：', this)
 },
```
6. 如果computed属性属性值是函数，那么默认会走get方法，函数的返回值就是属性的属性值。  
```html
  <div>
    message: {{message}}
  </div>

  <!-- 计算属性 -->
  <div>
    计算属性： {{updateMessage}}
  </div>
```
```js
  computed: {
    //属性值为函数，默认走get方法，且必须有返回值
    updateMessage(): {
      console.log('计算属性', this.message)
      return this.message
    },
    // 等效于
    // updateMessage: {
    //   get: function() {
    //     console.log('计算属性', this.message)
    //     return this.message
    //   }
    // }
  }
```
### watch
1. 不支持缓存，数据变，直接会触发相应的操作；
2. watch支持异步；
3. 监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；
4. 当一个属性发生变化时，需要执行对应的操作；一对多；
5. 监听数据必须是data中声明过或者父组件传递过来的props中的数据，当数据变化时，触发其他操作，函数有两个参数，
　　immediate：组件加载立即触发回调函数执行，
　　deep: 深度监听，为了发现**对象内部值**的变化，复杂类型的数据时使用，例如数组中的对象内容的改变，注意监听数组的变动不需要这么做。注意：deep无法监听到数组的变动和对象的新增，参考vue数组变异,只有以响应式的方式触发才会被监听到。

6. watch对象可以写成对象形式，也可以写成字符串形式
```js
  watch: {
    a(newVal, oldVal) {
      setTimeout(() => {
        if(newVal.length < 3) {
          this.msg = "不能小于3位"
          return 
        }
        this.msg = ""
      },1000)
    }

    'form.username': function() {
      console.log('username is changed')
    }
  }
```
7. 当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。这是和computed最大的区别，请勿滥用。

**参考：**
>computed: https://segmentfault.com/a/1190000020156646
watched和computed区别: https://www.cnblogs.com/jiajialove/p/11327945.html

## v-if 和 v-show的区别
1.共同点
  都是动态显示DOM元素

2.区别
  v-if 的初始化较快，但切换代价高；v-show 初始化慢，但切换成本低
（1）手段：  
    v-if是动态的向DOM树内添加或者删除DOM元素；
    v-show是通过设置DOM元素的display样式属性控制显隐；
（2）编译过程：  
    v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；
    v-show只是简单的基于css切换；
（3）编译条件：  
    v-if是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译（编译被缓存？编译被缓存后，然后再切换的时候进行局部卸载);   
    v-show是在任何条件下（首次条件是否为真）都被编译，然后被缓存，而且DOM元素保留；
（4）性能消耗：  
    v-if有更高的切换消耗；
    v-show有更高的初始渲染消耗；
（5）使用场景：  
    v-if适合运营条件不大可能改变；
    v-show适合频繁切换。
  
>https://blog.csdn.net/ning0_o/article/details/56006528