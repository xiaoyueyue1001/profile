## 安装webstorm编译less的插件
1、npm install less -g
2、打开webstorm-->File-->Settings-->File Watchers-->+-->less-->选择less工具的路径


## arttemplate模板引擎(作者：糖饼)
### 官网：https://aui.github.io/art-template/docs/api.html
### API
1. template("id名",数据)：编译页面中指定的script标签中的模板内容，返回包含真实数据的字符串
    1. id名：表示页面中的指定的script标签
    <script id="tplTeacher">
        我的性别是：{{gender}}
    </script>

    var str=template("tplTeacher",{  gender:"男"  });
    //str：我的性别是：男

2. template.render("模板",数据)：编译指定的模板内容，返回包含真实数据的字符串
    1. 模板：表示由arttemplate语法编写出来的模板内容，比如："{{new}}"

    var str=template.render("我的性别是：{{gender}}",{  gender:"男"  });
    //str：我的性别是：男

### 数组和伪数组的区别：数组的构造函数是Array，伪数组的并不是


## 基本思路
1. 内容的入口(讲师列表-->点击讲师管理按钮触发、查看讲师-->点击表格中的查看按钮触发)
2. 把内容呈现出来
    + 准备一个html模板-->text插件获取模板中的内容(`避免字符串拼接DOM元素`)
    + 编译模板-->arttemplate
        -->导入arttemplate模块
        -->通过接口文档，进行ajax请求，获取相应的数据
        -->var html=template.render(模板内容,数据);
    + c、把html放到页面中


## 使用bootstrap日期控件
1. 导入bootstrap.css
2. 导入控件.css
3. 导入jquery.js
4. 导入控件.js
5. 页面中添加一个`<input type="text" value="2012-05-15" id="datetimepicker">`
6. js代码
```js
    $('#datetimepicker').datetimepicker({
            format: 'yyyy-mm-dd',       //指定日期显示格式
            language:"zh-CN",           //指定日期控件的语言-->需要导入相应的语言包
            weekStart:1,        //1：周一：日期框的标题中一周从哪里开始
            //daysOfWeekDisabled:[1,2]        //1：周一和2：周二不能选择
            autoclose:true,         //当选择完毕一个时间之后就自动隐藏
            //startView:"year"      //当日期控件刚加载出来的时候就给用户看什么界面？year-->12个月   month-->"30天"
            minView:"month",        //可以看到的最小视图-->"month"那么就只能选择到几号
            todayBtn:true,          //在选择框下面将会出现一个今天的按钮
            todayHighlight:true     //高亮今天的日期
    });
```


## 编辑讲师功能的实现思路
1. 雏形：给讲师列表绑定事件==》通过编辑按钮触发-->弹出模态框
						-->准备模板内容  把模板内容放到页面中，并且以模态框的形式展现出来

2. 完善雏形：发现数据还没有？就要研究怎么来？-->讲师信息怎么来获取？
						1、信息从表格中直接获取  -->不能的  -->每次更新的时候都应该获取用户最新的数据
						2、只能通过http请求从服务器中获取(/teacher/edit)
							-->接口需要tc_id：已经保存在按钮的父元素中
								-->调用接口，获取到数据
									-->把数据渲染在页面中  -->页面在之前的模板中  -->编译模板

## 添加分类
1. 功能的入口：点击了添加分类按钮-->给添加分类的按钮绑定事件
2. 弹出模态框
    -->封装一个模块(实现添加分类的功能)
        -->a、准备一个模板文件（xxx.html）
        -->b、把模板文件放到页面中，以模态框的形式呈现出来

## 添加分类代码
1. 要进行事件绑定，先找到绑定事件的元素在哪里
    + 元素在list.js中动态加载categoryList.html
        - 在模板文件中给按钮设置一个类名：.btn-add-category
        - 进行事件绑定：发现模板还是一个字符串，字符串是不能绑定事件，所以需要把字符串转换为jquery对象从而进行事件绑定
        - ☆☆☆测试☆☆☆：事件绑定有没有成功
        + 把添加分类的功能放到了category/add中去处理
            - 编写cagetory/add.js
            - list.js中调用category/add.js
            - ☆☆☆测试☆☆☆：模块能不能正确的调用
        + 完成加载模态框
            - 编写一个模板文件(categoryAdd.html)
            - 把模板文件放到页面中：
                - text插件导入模板文件，通过依赖注入获取模板的内容
                - 通过jquery操作把模板放到页面中，并且以模态框的形式呈现出来
                - ☆☆☆测试☆☆☆：看看模态框能不能正确的加载




## $.ajax的简便方法
$.get(请求的地址,请求的数据,成功之后的回调函数)
$.post(请求的地址,请求的数据,成功之后的回调函数)

## 函数自调用？
1.
```js
    var fn=function fn2(){
          //fn();
          //argument.callee()
          //fn2();
    };
```

## 设置bootstrap模态框的大小：通过为 .modal-dialog 增加一个样式调整类实现
+ 较大的模态框：modal-lg
+ 较小的模态框：modal-sm

## 如果下拉框选中的option没有value，结果将会是文本   如果option有value，那么获取的是value值

## 图表软件：echarts highcharts
## 富文本编辑器：ueditor ckeditor
## 上传插件：uploadify / file upload


## 递归调用
// function fn(a){
//     if(a==3){
//         fn();
//     }
// }
//
// fn(3);

## id什么时候用形参传，什么时候用隐藏的？
+ 讲师列表中调用编辑讲师模块
    + 在编辑讲师模块中需要用到id
        + 而这个id可以在讲师列表中获取-->需要把id作为形参传入到编辑讲师模块中

    + 隐藏域就是为了提交表单


## 课时信息--编辑按钮--提交信息成功后模拟点击 那一块有点模糊
### 需求：编辑完成，已经成功的修改了服务器中的数据，希望刷新课时列表
+ `封装模块遵循单一职责原则`
    + 编辑课时提交表单这是“编辑课时模块”的职责
    + 刷新课时列表是“课时列表模块”的职责
+ 思路：当在编辑课时模块中已经成功的修改了服务器中的数据，就应该回到课时列表模块
    - 第一种方案（不可行）：编辑课时中依赖课时列表，将会造成模块的循环引用
    (课时列表已经依赖了编辑课时模块)
    - 第二种方案（回调函数）：在课时列表中调用编辑课时模块时，传入一个回调函数（就是当编辑课时模块的事情做完之后，调用该回调函数）

## UEditor
### demo
```html
    <!--1、加载编辑器的容器 -->
    <script id="container" name="content" type="text/plain">
            这里写你的初始化内容
        </script>
    <!--2、配置文件 -->
    <script type="text/javascript" src="../assets/ueditor/ueditor.config.js"></script>
    <!--3、编辑器源码文件 -->
    <script type="text/javascript" src="../assets/ueditor/ueditor.all.js"></script>
    <!--4、实例化编辑器 -->
    <script type="text/javascript">
        var ue = UE.getEditor('container');
    </script>
```

## 实现退出功能
1. 清除登录状态
    + 服务器中的登录状态：通过ajax请求实现
    + 清除保存的cookie/sessionStorage这些状态数据
2. 退回到登录页面