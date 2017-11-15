/**
 * 编辑分类
 * Author:Wilbert
 *   Date:2017/8/2
 */
define(["jquery","text!tpls/categoryEdit.html","arttemplate"],function($,categoryEditTpl,template){
    
    
    return function(id){
        $.ajax({
            url:"/api/category/edit",
            type:"get",
            data:{cg_id:id},
            success:function(res){
                if(res.code!=200) console.log(res.msg);

                res.result.top.unshift({
                    cg_id:"0",
                    cg_name:"顶级分类"
                })

                //成功了？-->把数据渲染到模态框中-->arttemplate模板引擎
                var categoryEdit=template.render(categoryEditTpl,res.result);

                var $categoryEdit=$(categoryEdit).on("submit","form",function(){
                    var formData=$(this).serialize();

                    $.ajax({
                        url:"/api/category/modify",
                        data:formData,
                        type:"post",
                       success:function(res){
                            if(res.code!=200) console.log(res.msg);


                           //关闭模态框
                           $categoryEdit.modal("hide");
                           //刷新分类列表
                           $(".left .list-group .link-course-category").trigger("click");  //相当于：点击了课程分类菜单
                        }

                    })

                    return false; //阻止页面刷新
                }).appendTo("body").modal();
            }

        })
        

    }
})