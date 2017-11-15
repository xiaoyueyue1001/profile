/**
 * 添加分类
 * Author:Wilbert
 *   Date:2017/8/2
 */
define(["jquery","text!tpls/categoryAdd.html","arttemplate"],function($,categoryAddTpl,template){
    
    
    return function(){
        $.ajax({
            url:"/api/category/top",
            type:"get",
            success:function(res){
                if(res.code!=200) console.log(res.msg);

                res.result.unshift({
                    cg_id:0,
                    cg_name:"顶级分类"
                })

                //成功的获取了数据-->把数据放到页面中-->把数据编译到模板中
                var categoryAdd=template.render(categoryAddTpl,res);





                $("#modalcategoryadd").remove();
                var $categoryAdd=$(categoryAdd).on("submit","form",function(){

                    var formData=$(this).serialize();

                    $.ajax({
                        url:"/api/category/add",
                        data:formData,
                        type:"post",
                        success:function(res){
                            if(res.code!=200) console.log(res.msg);

                            //成功的提交了数据
                            //-->1、关闭模态框？
                            $categoryAdd.modal("hide");
                            //-->2、刷新分类列表
                            $(".left .list-group .link-course-category").trigger("click");  //相当于：点击了讲师管理按钮
                        }
                    })

                    return false;
                }).appendTo("body").modal();
            }

        })


    }
})