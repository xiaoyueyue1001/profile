/**
 * 这里是文档注释
 * Author:Wilbert
 *   Date:2017/8/4
 */
define(["jquery","text!tpls/courseImage.html","common/api","arttemplate","upload"],function($,courseImageTpl,api,template){
    
    return function(id){
        
        
        //alert("课程图片模块，课程id："+id);

        api.get("course/picture",{cs_id:id},function(res){

            var courseImage=template.render(courseImageTpl,res.result);

            $(".menu-content").html(courseImage);

            $("#fileCourse").uploadify({
                auto:true,     //选完文件是否自动上传，默认：true

                buttonText:"选择文件",
                fileObjName:"cs_cover_original",        //表示name值
                formData:{cs_id:id},                     //上传文件的时候要传递的额外的参数
                uploader      : '/api/uploader/cover',//要把文件上传到哪里去？
                height        : 30,
                swf           : '../assets/uploadify/uploadify.swf',
                width         : 120,

                itemTemplate:"<span></span>",    //这样的设置用户就看不到上传的细节
                onUploadSuccess:function(){
                    //数据已经上传成功-->刷新课程列表
                    $(".left .list-group .link-course-manager").trigger("click");  //相当于：点击了讲师管理按钮

                }
            });
        })


    }
})