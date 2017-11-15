/**
 * 这里是文档注释
 * Author:Wilbert
 *   Date:2017/7/30
 */
define(["jquery","text!tpls/teacherShow.html","arttemplate"],function($,teacherShowTpl,template){


    return function(tc_id){

        //1、根据讲师id获取数据？
        //alert(tc_id);

        $.ajax({
            url:"/api/teacher/view",
            data:{tc_id:tc_id},
            type:"get",
            success:function(res){
                if(res.code!=200){
                    console.log(res.msg);
                    return;
                }
                
                //2、成功的获取了讲师数据
                $("#modalTeacherShow").remove();

                var teacherShow=template.render(teacherShowTpl,res.result);

                $(teacherShow).appendTo("body").modal();//把内容放到页面中，并且以模态框的形式展现出来



            }
        })
    }
})