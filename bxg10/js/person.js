/**
 * Created by wangyue on 2017/9/16.
 */
define([
    'text!tpls/person.html',
    'template'
], function (personTpl,template) {
    return function () {
        $.ajax({
            url:'/api/teacher/profile',
            success: function (res) {
                var html = template.render(personTpl,res.result);
                $html = $(html);
                $html.modal()
                    .on('hidden.bs.modal', function () {
                        $html.remove();
                    })
            }
        });

    }
})