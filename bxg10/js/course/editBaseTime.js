/**
 * Created by wangyue on 2017/9/15.
 */
define([
    'text!tpls/courseBaseTimeEdit.html',
    'template'
], function (courseBaseTimeEditTpl,template) {
    return function (id) {
        $.get('/api/course/basic',{cs_id:id}, function (res) {
          var html = template.render(courseBaseTimeEditTpl,res.result);
            $html = $(html);
                $html.on('change','.select-top', function () {
                var cg_id = $(this).val();
                $.get('/api/category/child',{cg_id:cg_id}, function (res) {
                        var arr = res.result.map(function (v) {
                            return '<option value='+v.cg_id+'>'+v.cg_name+'</option>';
                        })
                    $html.find('.select-child').html(arr.join(' '));
                })
            })
            $('.content-container').html($html);
        })
    }
})