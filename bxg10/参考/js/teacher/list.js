/**
 * 讲师列表模块
 * Author:Wilbert
 *   Date:2017/7/30
 */
define(["jquery","text!tpls/teacherList.html","arttemplate","teacher/show","teacher/add","teacher/edit","teacher/status"],function($,teacherListTpl,template,teacherShow,teacherAdd,teacherEdit,teacherStatus){

    //1、获取讲师列表模板的内容
    //console.log(teacherListTpl);

    //console.log(template);



    return function(){

        $.ajax({
            url:"/api/teacher",
            type:"get",
            success:function(res){
                //优化前：
                // if(res.code==200){
                //     //成功
                // }else{
                //     //失败
                // }

                //优化后：
                if(res.code!=200){
                    console.log(res.msg);
                    return;
                }

                //数据成功接收：
                // --->把数据渲染到模板中
                var teacherList=template.render(teacherListTpl,res);

                //为了给查看按钮绑定事件，可以使用事件委托的方式来绑定，事件委托给谁？可以委托给整个列表的容器，而列表的容器是teacherList，但是teacherList是一个字符串，所以不能直接委托，需要首先把teacherList转换为jquery对象
                var $teacherList=$(teacherList);        //将html字符串转换为dom元素，把dom元素放在jq对象中
                $teacherList
                    .on("click",".btn-show",function(){
                        var tc_id=$(this).parent().attr("tc_id");

                        teacherShow(tc_id);     //调用了teacherShow模块

                    })
                    .on("click",".btn-add-teacher",function(){

                        //触发讲师添加模块
                        teacherAdd();
                    }).on("click",".btn-edit",function(){
                        //编辑讲师-->加载编辑讲师模块
                        var tc_id=$(this).parent().attr("tc_id");
                    
                        teacherEdit(tc_id);
                    }).on("click",".btn-status",function(){
                        //this-->知道这一行是哪一行


                        var btnStatus=this;
                        var tc_id=$(this).parent().attr("tc_id");
                        var tc_status=$(this).parent().attr("tc_status");

                        teacherStatus(tc_id,tc_status,function(status){
                            //console.log("已经更新了服务器数据");

                            //更新页面(这一行)内容-->根据最新的数据才能更新

                            //this-->window

                            //修改按钮的文本
                            $(btnStatus).text(status==0?"注销":"启用");
                            //修改用户状态列文本
                            $(btnStatus).parent().siblings(".status").text(status==0?"启用":"注销");

                            $(btnStatus).parent().attr("tc_status",status);
                        });
                        
                    });


                //    -->模板放到页面中
                $(".menu-content").html($teacherList);       //将html字符串转换为dom元素，把该元素放到页面中

                // $(".menu-content").empty().append($teacherList);

                // $(".menu-content").empty();
                // $teacherList.appendTo(".menu-content");

            }
        })
    }
})