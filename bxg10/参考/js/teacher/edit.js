/**
 * 编辑讲师模块
 * Author:Wilbert
 *   Date:2017/8/1
 */
define(["jquery","text!tpls/teacherEdit.html","arttemplate"],function($,teacherEditTpl,template){
    
    
    return function(id){
        
        $.ajax({
            url:"/api/teacher/edit",
            type:"get",
            data:{tc_id:id},            //tc_id是接口文档要求传递的参数   id：参数的值
            success:function(res){
                if(res.code!=200) console.log(res.msg);
                
                //成功的获取了数据

                var teacherEdit=template.render(teacherEditTpl,res.result);
                
                var $teacherEdit=$(teacherEdit).on("submit","form",function(){
                    var formData=$(this).serialize();

                    $.ajax({
                        url:"/api/teacher/update",
                        type:"post",
                        data:formData,
                        success:function(res){
                            if(res.code!=200)  console.log(res.msg);

                            //成功之后：关闭模态框;同时刷新讲师列表
                            $teacherEdit.modal("hide");
                            $(".left .list-group .link-teacher").trigger("click");  //相当于：点击了讲师管理按钮
                        }
                    })

                    return false;//做成异步的表单(防止跳转页面)

                }).appendTo("body").modal();
            }
            
        });

        
        
        
    }
})