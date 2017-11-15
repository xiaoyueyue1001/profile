/**
 * Created by wangyue on 2017/9/15.
 */
define(['text!tpls/courseList.html',
        'template',
        'course/editTime',
        'course/editBaseTime'
        ], function (courseListTpl,template,editTime,editBaseTime) {
    return function () {
        //alert('调用模块');
        $.ajax({
            url:'/api/course',
            success: function (res) {
                var html = template.render(courseListTpl,res);
                $html = $(html);
                $html
                    .on('click','.btn-edit', function () {
                    var cs_id = $(this).parent().parent().attr('cs_id');
                    editTime(cs_id);
                })
                    .on('click','.btn-base-edit', function () {
                    var cs_id = $(this).parent().parent().attr('cs_id');
                    editBaseTime(cs_id);
                })
                $('.content-container').html($html);
            }
        })
    }
})
