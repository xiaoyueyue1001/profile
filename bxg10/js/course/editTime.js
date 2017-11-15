/**
 * Created by wangyue on 2017/9/15.
 */
define([
    'text!tpls/courseTimeEdit.html',
    'template'
], function (courseTimeEditTpl,template) {
    return function (id) {
        $.get('/api/course/lesson',{cs_id:id}, function (res) {
            var html = template.render(courseTimeEditTpl,res.result);
            $html = $(html);
            $html;
            $('.content-container').html($html);
        })

    }
})