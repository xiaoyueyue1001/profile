/**
 * 验证用户是否登录
 * Author:Wilbert
 *   Date:2017/7/29
 */
define([],function(){

    var userInfo=sessionStorage.getItem("userInfo");

    if(!userInfo){

        location.href="login.html";
    }

})