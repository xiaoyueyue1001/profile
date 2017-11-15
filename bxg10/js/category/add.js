/**
 * Created by wangyue on 2017/9/14.
 */
define(['text!tpls/categoryAdd.html',
        'template'
        ], function (categortAddTpl,template) {
    return function () {
        //alert(11);

        $.ajax({
            url:'/api//category/top',
            success: function (res) {
                res.result.unshift({
                    cg_name:'顶级分类',
                    cg_id:0
                });
                var html = template.render(categortAddTpl,res);
                var $html = $(html);
                $html.appendTo('body').modal()
                    .on('hidden.bs.modal', function () {
                        $html.remove();
                    })
                    .on('submit','form', function (e) {
                    e.preventDefault();
                    var formData = $(this).serialize();
                    $.ajax({
                        url:'/api//category/add',
                        type:'post',
                        data:formData,
                        success: function () {
                            $html.modal('hide');
                            $('.menu .list-group .active').trigger('click');
                        }
                    })
                });
            }
        })
    }
})