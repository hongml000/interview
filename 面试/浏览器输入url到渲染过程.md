# 输入url到渲染出页面的整个过程

## DNS解析url的过程
DNS解析过程，其实就是将域名解析到IP地址。   
  1.浏览器缓存 - 浏览器缓存DNS记录一段时间  
  2.操作系统缓存 - 文件（比如Hosts文件）查找是否有该域名和对应IP  
  3.路由器缓存 - 一般路由器也会缓存域名信息  
  4.ISP DNS缓存 - 本地DNS服务器缓存去找，比如电信、移动等  
  5.都没有找到，则向根域名服务器查找域名对应IP，根域名服务器把请求转发到下一级查找IP 
    www.baidu.com查找顺序是：  
      根域名服务器（.）-> .com(一级域名) -> .baidu.com（二级域名） -> www.baidu.com（三级）

## 浏览器与服务器交互的过程
1. 首先浏览器利用tcp协议通过三次握手与服务器建立连接
　　http请求包括header和body。header中包括请求的方式（get和post）、请求的协议 （http、https、ftp）、请求的地址ip、缓存cookie。body中有请求的内容。
2. 浏览器根据解析到的IP地址和端口号发起http的get请求.
3. 服务器接收到http请求之后，开始搜索html页面，并使用http返回响应报文
4. 若状态码为200显示响应成功，浏览器接收到返回的html页面之后，开始进行页面的渲染

## 浏览器页面渲染过程
1. 浏览器根据深度遍历的方式把html节点遍历成DOM树
2. 将css解析成CSS DOM树
3. 将dom树和CSS DOM树构造成render树
4. JS根据得到的render树 计算所有节点在屏幕中的位置，进行布局（回流）
5. 遍历render树并调用硬件API绘制所有节点（重绘）

>参考：
https://www.jianshu.com/p/308212675adb
https://segmentfault.com/a/1190000014311983
https://www.cnblogs.com/qing-5/p/11126524.html
