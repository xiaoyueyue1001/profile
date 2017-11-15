/**
 * Created by wangyue on 2017/9/14.
 */
define(['text!tpls/categoryList.html',
        'template',
        'category/add',
        'category/edit'
        ], function (categoryListTpl,template,categoryAdd,categoryEdit) {
    return function () {
        //alert('调用课程分类');
        $.ajax({
            url:'/api/category',
            success:function (res) {
                var html = template.render(categoryListTpl,res);
                var $html = $(html);
                $html.on('click','.btn-add', function () {
                    categoryAdd();
                })
                    .on('click','.btn-edit', function () {
                        var cg_id = $(this).parent().parent().attr('cg_id');
                        categoryEdit(cg_id);
                    })
                $('.content-container').html($html);


                //添加按钮

        }
        })


    }
})
