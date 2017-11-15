/**
 * 课程基本信息
 * Author:Wilbert
 *   Date:2017/8/4
 */
define(["jquery","text!tpls/courseBaseInfo.html","common/api","arttemplate"],function($,courseBaseInfoTpl,api,template){

    return function(id){
        api.get("course/basic",{cs_id:id},function(res){
            res.result.category.top.unshift({
                cg_id:0,
                cg_name:"顶级分类"
            })


            var courseBaseInfo=template.render(courseBaseInfoTpl,res.result);

            var $courseBaseInfo=$(courseBaseInfo);

            $courseBaseInfo.on("change",".select-top",function(){

                //获取下拉框的值？
                var val=$(this).val();   //如果下拉框选中的option没有value，结果将会是文本   如果option有value，那么获取的是value值
                //alert(val);

                //根据该val值（分类的id）获取该分类的下属分类？
                api.get("category/child",{cg_id:val},function(res){
                    //console.log(res);

                    //把数据渲染到第二个下拉框中？
                    //a、数据：res.result
                    //b、数据放到哪里去？-->第二个下拉框

                    var str="";
                    res.result.forEach(function(v){
                        //v:{cg_id:...,cg_name:...}
                        str+="<option value='"+v.cg_id+"'>"+v.cg_name+"</option>";
                    });

                    //$courseBaseInfo.find(".select-child").empty().append(str);

                    $courseBaseInfo.find(".select-child").html(str);


                })

            }).on("submit","form",function(){
                var formData=$(this).serialize();

                api.post("course/update/basic",formData,function(){
                    $(".left .list-group .link-course-manager").trigger("click");  //相当于：点击了讲师管理按钮

                });

                return false;

            })

            $(".menu-content").html($courseBaseInfo);
        })


    }
})