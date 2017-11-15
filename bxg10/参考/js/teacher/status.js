/**
 * 用户状态模块
 * Author:Wilbert
 *   Date:2017/8/1
 */
define([],function(){
    
    
    return function(id,status,callback){
        
        //1、通过ajax请求修改数据
        $.ajax({
            url:"/api/teacher/handle",
            type:"post",
            data:{
                tc_id:id,
                tc_status:status
            },
            success:function(res){
                if(res.code!=200) console.log(res.msg);

                //成功的修改了服务器数据-->把数据渲染到页面中
                var tc_status=res.result.tc_status;

                //-->让list模块完成更新页面内容
                callback(tc_status);        //给回调函数提供实参，为了给回调函数的形参使用

            }

        })
    }
})