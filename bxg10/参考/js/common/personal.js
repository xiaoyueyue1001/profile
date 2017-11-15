/**
 * 这里是文档注释
 * Author:Wilbert
 *   Date:2017/8/5
 */
define(["jquery","text!tpls/personal.html","common/api","arttemplate","ueAll"],function($,personalTpl,api,template){
    
    
    return function(){

        //呈现出一个模态框？
        //1、准备一个模板文件
        //2、获取数据，把数据渲染到模态框中
        //3、将真实的内容放到页面中，并且以模态框的形式呈现出来

        api.get("teacher/profile",{},function(res){

            var personal=template.render(personalTpl,res.result);

            $("#modalPersonal").remove();
            var $personal=$(personal).on("submit","form",function(res){
                var formData=$(this).serialize();

                api.post("teacher/modify",formData,function(){
                    $personal.modal("hide");

                })


                return false;
            }).appendTo("body").modal().on("hidden.bs.modal",function(){
                //该事件将会在模态框已经隐藏后触发

                location.reload();

            });

            //UEditor一定要在添加到页面中之后才能去初始化富文本编辑器
            var ue = UE.getEditor('ueContainer');
            ue.ready(function(){

                ue.setContent(res.result.tc_introduce);
            })
        })


    }
})