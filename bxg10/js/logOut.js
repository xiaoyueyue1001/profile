/**
 * Created by wangyue on 2017/9/16.
 */
define([], function () {
    return function () {
        $.ajax({
            url:'/api/logout',
            type:'post',
            success: function () {
                $.removeCookie('info');
                location.href = './login.html';
            }
        });
    }
})