/**
 * 分类列表的加载
 * Author:Wilbert
 *   Date:2017/8/2
 */
define(["jquery","arttemplate","text!tpls/categoryList.html","category/add","category/edit"],function($,template,categoryListTpl,categoryAdd,categoryEdit){
    
    return function(){

        $.ajax({
            url:"/api/category",
            type:"get",
            success:function(res){
                if(res.code!=200) console.log(res.msg);

                //成功的获取了数据
                //      -->数据放到表格中
                //          -->表格在模板中
                //              -->arttemplate编译模板
                var categoryList=template.render(categoryListTpl,res);

                var $categoryList=$(categoryList);
                $categoryList.on("click",".btn-add-category",function(){

                    categoryAdd();
                }).on("click",".btn-edit",function(){
                    var cg_id=$(this).parent().attr("cg_id");

                    //编辑分类
                    categoryEdit(cg_id);
                })

                $(".menu-content").html($categoryList);
            }
        })




    }
})