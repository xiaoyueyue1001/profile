/**
 * Created by wangyue on 2017/9/14.
 */
define(['text!tpls/categoryEdit.html',
        'template'
        ], function (categoryEditTpl,template) {
    return function (id) {
        //$.ajax({
        //    url:'/api/category/top',
        //    success: function (resold) {
                $.ajax({
                    url:'/api/category/edit',
                    data:{
                        cg_id:id
                    },
                    success: function (res) {
                        res.result.top.unshift({
                            cg_name:'顶级分类',
                            cg_id:0
                        });
                        var html = template.render(categoryEditTpl,res);
                        var $html = $(html);
                        $html.appendTo('body').modal()
                            .on('hidden.bs.modal', function () {
                                $html.remove();
                            })
                            .on('submit','form', function (e) {
                                e.preventDefault();
                                var formData = $(this).serialize();
                                $.ajax({
                                    url:'/api/category/modify',
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
        //    }
        //})
    }
})