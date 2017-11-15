/**
 * Created by wangyue on 2017/9/16.
 */
define([], function () {
    return {
        ajax: function (url,type,data,callback) {
            $.ajax({
                url:url,
                type:type,
                data:data,
                success: function (res) {
                    if(res.code!=200) throw new Error(res.msg);
                    callback(res);
                }
            })
        }
    }
})