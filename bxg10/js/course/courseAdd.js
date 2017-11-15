/**
 * Created by wangyue on 2017/9/15.
 */
define(['text!tpls/courseAdd.html'
        ], function (courseAddTpl) {
    return function () {
        var $html = $(courseAddTpl);
        $html.appendTo('body').modal()
            .on('hidden-bs-modal', function () {
                $html.remove();
            })
            .on('submit','form', function (e) {
                e.preventDefault();
                var formData = $(this).serialize();
                $.post('/api/course/create',formData, function () {
                    $html.modal('hide');
                    $('.menu .list-group a[data-type=class_manger]').trigger('click');
                    //$('.menu .list-group a[data-type=class_manger]')
                })
            });
    }
})