/**
 * 这里是文档注释
 * Author:Wilbert
 *   Date:2017/7/29
 */

//requireJS主要实现单页应用(ajax请求实现数据交互-->大量的应用于企业级项目)

require.config({
    baseUrl:"js",
    paths:{
        jquery:"lib/jquery-2.1.4",
        bootstrap:"../assets/bootstrap/js/bootstrap",
        text:"lib/text",
        tpls:"../tpls",      //-->bxg/tpls
        arttemplate:"lib/template-web",
        datetime:"../assets/datetimepicker/js/bootstrap-datetimepicker",
        upload:"../assets/uploadify/jquery.uploadify",
        echarts:"lib/echarts.min",
        ueAll:"../assets/ueditor/ueditor.all",
        ueConf:"../assets/ueditor/ueditor.config"
    },
    shim:{
        bootstrap:{
            deps:["jquery"]
        },
        upload:{
            deps:["jquery"]
        },
        ueAll:{
            deps:["ueConf"]
        }
    }

})

require(["jquery","teacher/list","category/list","course/list","courseTime/list","course/add","chart/index","common/personal","bootstrap","common/checkLogin"],function($,teacherList,categoryList,courseList,courseTimeList,courseAdd,chartIndex,commonPersonal){

    var userInfoStr=sessionStorage.getItem("userInfo");

    var userInfo=JSON.parse(userInfoStr);
    //console.log(userInfo);

    //1、设置用户的头像和用户名
    $(".profile img").attr("src",userInfo.tc_avatar);
    $(".profile h4").text(userInfo.tc_name);

    //2、点击不同菜单，切换不同菜单的功能？
    $(".left .list-group").on("click",".list-group-item",function(){

        //根据不同的菜单-->不同的菜单有不同的类名？-->去拿每一个类名去给标签做一一的对比，对比成功就可以
        if($(this).hasClass("link-teacher")){
            teacherList();

        }else if($(this).hasClass("link-course-manager")){
            courseList();

            

        }else if($(this).hasClass("link-course-category")){
            categoryList();
            
        }else if($(this).hasClass("link-chart")){
            chartIndex();

        }else if($(this).hasClass("link-course-time")){
            //点击了课时列表菜单？触发课时列表的时候需要一个课程id？
            var cs_id=$(this).attr("cs_id");
            courseTimeList(cs_id);

        }else if($(this).hasClass("link-course-add")){
            //点击了添加课程按钮
            courseAdd();
        }

        //让自己变为蓝色，让别人变为白色
        $(this).addClass("active").siblings().removeClass("active");


    });

    //需求：希望页面加载成功之后，立刻加载讲师管理的功能-->通过模拟点击讲师管理按钮来实现

    $(".left .list-group .link-teacher").trigger("click");  //相当于：点击了讲师管理按钮

    //个人中心
    $(".link-personal").on("click",function(){
        commonPersonal();

    });

    $(".link-logout").on("click",function(){
        // + 服务器中的登录状态：通过ajax请求实现
        $.post("/api/logout",function(){
            // + 清除保存的cookie/sessionStorage这些状态数据
            sessionStorage.removeItem("userInfo");

            // + 退回登录页面
            location.href="login.html";
        })



    })

})