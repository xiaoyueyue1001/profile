/**
 * 课时管理列表
 * Author:Wilbert
 *   Date:2017/8/4
 */
define(["jquery","text!tpls/courseTimeList.html","common/api","arttemplate","courseTime/edit"],function($,courseTimeListTpl,api,template,courseTimeEdit){
    

    //fn3只能在函数体内部使用，外部访问不了
    //fn3在函数体内部指向当前当前函数本身
    return function fn3(id){

        var fn=arguments.callee;

        //根据课程id获取到课程对应的课时信息："1.5.7. 课时管理"

        api.get("course/lesson",{cs_id:id},function(res){
            //成功的获取了课程对应的课时信息-->把数据渲染到页面中-->把数据渲染到模板中
            var courseTimeList=template.render(courseTimeListTpl,res.result);

            var $courseTimeList=$(courseTimeList);
            $courseTimeList.on("click",".btn-edit",function(){
                //alert("编辑课时");

                var ct_id=$(this).attr("ct_id");
                courseTimeEdit(ct_id,function(){
                    console.log("已经实现了课时编辑的操作")

                    //刷新课时列表？-->模拟点击课时列表菜单
                    //-->把课程id可以让菜单获取？

                    //非常繁琐的解决方案：
                    // $(".left .list-group .link-course-time")
                    //     .attr("cs_id",id)
                    //     .trigger("click");


                    //非常巧妙的方式：
                    fn(id);

                    //fn3(id);
                });

            })

            $(".menu-content").html($courseTimeList);
        })


    }
})