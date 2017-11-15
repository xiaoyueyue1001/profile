/**
 * 添加课程
 * Author:Wilbert
 *   Date:2017/8/4
 */
define(["jquery","text!tpls/courseAdd.html","common/api"],function($,courseAddTpl,api){
    
    return function(){

        //呈现出模态框
        $("#modalCourseAdd").remove();

        var $courseAddTpl=$(courseAddTpl).on("submit","form",function(){
            var formData=$(this).serialize();

            api.post("course/create",formData,function(){

                //a、关闭模态框
                $courseAddTpl.modal("hide");

                //b、刷新课程列表？-->模拟点击“课程管理”菜单即可
                $(".left .list-group .link-course-manager").trigger("click");  //相当于：点击了讲师管理按钮
            })
            
            
            return false;//阻止页面跳转
        }).appendTo("body").modal();
    }
})