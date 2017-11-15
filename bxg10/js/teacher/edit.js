/**
 * Created by wangyue on 2017/9/14.
 */
define(['text!tpls/teacherEdit.html',
        'template'
        ], function (teacherEditTpl,template) {
    return function (id) {
        $.ajax({
            url:'/api/teacher/edit',
            data:{
                tc_id:id
            },
            success: function (res) {
                console.log(res);
                var html = template.render(teacherEditTpl,res);
                $html = $(html);
                $html.appendTo('body').modal()
                    .on('hidden.bs.modal', function () {
                        $html.find(".join-date").datetimepicker("remove");
                    $html.remove();
                })
                    .on('submit','form', function (e) {
                        e.preventDefault();
                        var formData= $(this).serialize();
                        $.ajax({
                            url:'/api/teacher/update',
                            type:'post',
                            data:formData,
                            success: function () {
                                $html.modal('hide');
                                $('.menu .list-group .active').trigger('click');
                            }
                        })
                    })
            }
        });
    }
})