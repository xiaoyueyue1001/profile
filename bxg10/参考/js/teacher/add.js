/**
 * 讲师添加模块
 * Author:Wilbert
 *   Date:2017/8/1
 */
define(["jquery","text!tpls/teacherAdd.html","datetime"],function($,teacherAddTpl){
    
    
    return function(){
        $("#modalTeacherAdd").remove();

        //第一种方式：
        var $teacherAddTpl=$(teacherAddTpl);

        $teacherAddTpl.find("form").on("submit",function(){

            //需求：获取表单数据，提交到服务器中？
            //this-->当前form标签
            //-->$(this).serialize();获取表单中的数据   -->前提：所有需求提交到服务器中的表单数据都应该具有name属性

            var formData=$(this).serialize();

            $.ajax({
                url:"/api/teacher/add",
                type:"post",
                data:formData,
                success:function(res){
                    if(res.code!=200) console.log(res.msg);

                    //刷新页面：location.href="index.html";//location.reload();

                    //只刷新讲师列表？-->点击讲师管理按钮实现刷新
                    $teacherAddTpl.modal("hide");   //-->隐藏模态框

                    $(".left .list-group .link-teacher").trigger("click");  //相当于：点击了讲师管理按钮
                }
            })


            return false;//阻止同步提交表单
        });
        $teacherAddTpl.appendTo("body").modal();


        //日期控件的渲染一定要等到加载到页面中之后再添加
        $teacherAddTpl.find(".join-date").datetimepicker({
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

        //第二种方式：
        // $(teacherAddTpl).find("form").on("submit",function(){
        //
        //
        // }).end().appendTo("body").modal();

        //第三种方式：
        // $(teacherAddTpl).on("submit","form",function(){
        //
        //
        // }).appendTo("body").modal();
    }
})