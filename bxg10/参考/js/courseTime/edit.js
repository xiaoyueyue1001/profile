/**
 * 编辑课时
 * Author:Wilbert
 *   Date:2017/8/4
 */
define(["jquery","common/api","text!tpls/courseTimeEdit.html","arttemplate"],function($,api,courseTimeEditTpl,template){

    /**
     *
     * @param id 课时id
     */
    return function(id,callback){
        //api文档：1.5.9. 编辑课时
        api.get("course/chapter/edit",{ct_id:id},function(res){
            //获取到课时详细信息-->把数据编译到模板中
            $("#modalCourseTimeEdit").remove();

            var courseTimeEdit=template.render(courseTimeEditTpl,res.result);

            $(courseTimeEdit).on("submit","form",function(){
                //获取表单信息，通过ajax的方式提交到服务器
                var formData=$(this).serialize();

                api.post("course/chapter/modify",formData,function(){
                    //成功的修改的服务器中的数据

                    //把模态框关闭？-->获取到模态框元素？
                    $("#modalCourseTimeEdit").modal("hide");

                    //告诉课时列表模块：我的事情已经做完了，接下来的事情由你自己完成(单一职责原则)
                    callback();

                })


                return false;
            }).appendTo("body").modal();
        })
        
        //alert("加载了编辑课时模块："+id);
    }
})
