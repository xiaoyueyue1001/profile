require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.1.4',
        bootstrap: '../assets/bootstrap/js/bootstrap',
        cookie: 'lib/jquery.cookie',
        text: './lib/text',
        tpls: '../tpls',
        template: './lib/template-web',
        bootstrapDateTimer: '../assets/bootstrap-datetimepicker/js/bootstrap-datetimepicker',
        echarts:'lib/echarts'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        }
    }
})
//以上为requireJS初始化




require(['teacher/list',
    'category/list',
    'course/list',
    'course/courseAdd',
    'charts/charts',
    'logOut',
    'person',




    'jquery',
    //'text!tpls/teacher.html',
    //'template',
    'bootstrap',
    'cookie',
    'bootstrapDateTimer',
    'echarts'
], function (teacherList,categoryList,courseList,courseAdd,charts,logout,person) {//, $, teacherTpl, template
    // var profileData = JSON.parse(localStorage.getItem('info'));

    try {
        var profileData = JSON.parse($.cookie('info'));
    }
    catch (e) {
        location.href = '../login.html';
    }//首次登录时返回登录界面



    //初始化用户信息
    $('.profile img').attr('src', profileData.tc_avatar);
    $('.profile p').html(profileData.tc_name);


    //侧栏菜单点击事件
    $('.menu .list-group').on('click', 'a', function () {
        $(this).addClass('active').siblings().removeClass('active');
        switch ($(this).data('type')) {
            case 'teacher_manger'://讲师列表事件
                teacherList();
                break;
            case 'class_manger':
                courseList();
                break;
            case 'class_add':
                courseAdd();
                break;
            case 'class_class': //课程分类
                categoryList();
                break;
            case 'pic_form':
                charts();
                break;
            default: {
                break;
            }

        }
    })


    //退出按钮
    $('.panel a.log-out').on('click', function () {
        logout();
    })
    //个人中心
    $('.panel a.person').on('click', function () {
        person();
    })


    //初始化点击一次侧边栏
    $('.menu .list-group .active').trigger('click');

})








