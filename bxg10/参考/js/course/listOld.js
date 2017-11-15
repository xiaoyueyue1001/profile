/**
 * 课程列表
 * Author:Wilbert
 *   Date:2017/8/2
 */
define(["jquery","text!tpls/courseList.html","arttemplate"],function($,courseListTpl,template){
    
    return function(){

        $.ajax({
            url:"/api/course",
            type:"get",
            success:function(res){
                if(res.code!=200) console.log(res.msg);

                //成功的获取了数据-->把数据通过arttemplate模板引擎编译到模板中
                var courseList=template.render(courseListTpl,res);

                $(".menu-content").html(courseList);
            }
        })


    }
})