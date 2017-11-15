/**
 * 课程列表模块
 * Author:Wilbert
 *   Date:2017/8/2
 */
define(["jquery","text!tpls/courseList.html","arttemplate","common/api","courseTime/list","course/baseInfo","course/image"],function($,courseListTpl,template,commonApi,courseTimeList,courseBaseInfo,courseImage){
    
    return function(){
        commonApi.get("course",{},function(res){
            //成功的获取了数据-->把数据通过arttemplate模板引擎编译到模板中
            var courseList=template.render(courseListTpl,res);

            var $courseList=$(courseList);

            $courseList.on("click",".btn-course-time",function(){
                //alert("点击了编辑课时按钮");

                //调用课时管理列表模块-->传入课程id
                var cs_id=$(this).parent().attr("cs_id");
                
                courseTimeList(cs_id);
            }).on("click",".btn-course-baseinfo",function(){

                //调用课程基本信息模块
                var cs_id=$(this).parent().attr("cs_id");
                courseBaseInfo(cs_id);

            }).on("click",".link-image",function(){
                
                var cs_id=$(this).attr("cs_id");

                //进入课程图片模块
                courseImage(cs_id);
            })

            $(".menu-content").html($courseList);
            
        });



    }
})