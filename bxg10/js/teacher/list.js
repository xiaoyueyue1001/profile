define([
    'text!tpls/teacherList.html',
    'template',
    './show',
    './logon',
    './add',
    './edit'
], function (teacherTpl, template, teacherShow, teacherLogon, teacherAdd,teacherEdit) {
    return function fn() {
        $.ajax({
            url: '/api/teacher',
            success: function (res) {
                var html = template.render(teacherTpl, res);
                var $html = $(html)
                $('.content-container').html($html);

                //查看按钮
                $($html).on('click', '.btn-watch', function () {
                    var tc_id = $(this).parent().parent().attr('tc_id');
                    teacherShow(tc_id);
                })


                //注销按钮
                $($html).on('click', '.btn-logon', function () {
                    var tc_id = $(this).parent().parent().attr('tc_id');
                    var tc_status = $(this).parent().parent().attr('tc_status');
                    teacherLogon(tc_id, tc_status);
                })

                //添加讲师
                $($html).on('click', '.btn-add', function () {
                    teacherAdd(fn);
                })

                //编辑讲师
                $($html).on('click', '.btn-edit', function () {
                    var tc_id = $(this).parent().parent().attr('tc_id');
                    teacherEdit(tc_id);
                })

            }
        });
    }
})