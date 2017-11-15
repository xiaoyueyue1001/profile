/**
 * 这里是文档注释
 * Author:Wilbert
 *   Date:2017/8/2
 */
define(["jquery"], function ($) {
    var obj = {
        /**
         *
         * @param url 请求地址
         * @param type 请求类型
         * @param data 请求参数
         * @param callback 请求成功后执行的回调函数
         */
        ajax: function (url, type, data, callback) {
            $.ajax({
                url: "/api/" + url,
                type: type,
                data: data,
                success: function (res) {
                    if (res.code != 200) throw new Error(res.msg);

                    callback(res);
                }
            })

        }

        // get:function(url,data,callback){
        //     this.ajax(url,"get",data,callback);
        // },
        // post:function(url,data,callback) {
        //     this.ajax(url, "post", data,callback);
        // }

    };

    var fns = "get,post".split(",");
    fns.forEach(function (fnName) {
        obj[fnName] = function (url, data, callback) {
            this.ajax(url, fnName, data, callback);

            //obj.ajax(url, fnName, data, callback);
        };
    })

    return obj;
})