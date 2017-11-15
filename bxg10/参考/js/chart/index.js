/**
 * 图表统计模块
 * Author:Wilbert
 *   Date:2017/8/5
 */
define(["text!tpls/chart.html", "echarts"], function (chartTpl, echarts) {

    var option = {
        //标题
        title: {
            text: "网站中一系列的比例",
            textStyle: {
                color: "blue"
            },
            left: 200,
            top: 10,
            borderWidth: 3,
            subtext: "二级标题"
        },
        //悬浮框
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        //图例
        legend: {
            orient: 'vertical',//排列方式，默认是水平：
            x: 'left',      //定位方式，x表示水平对齐方式，y表示垂直对齐方式

            //data应该与数据一一对应
            data: ['男', '女']
        },
        series: [
            {
                name: '性别',
                type: 'pie',
                radius: ['40%', '55%'],

                //data:data
            }
        ]
    };

    return function () {

        var $chartTpl = $(chartTpl);
        $(".menu-content").html($chartTpl);


        var domMain = $chartTpl.find("#main").get(0);


        var main = echarts.init(domMain);

        //1、准备数据
        $.get("/api/teacher", function (res) {
            console.log(res);
            //2、构建出饼图需要的数据
            var data = [
                {name: "男", value: 0},
                {name: "女", value: 0}
            ];

            res.result.forEach(function (v) {
                //-->data[v.tc_gender==0?0:1].value++;
                data[v.tc_gender].value++;
            });

            //3、把数据传入到饼图的配置项中
            option.series[0].data = data;

            //4、渲染出饼图
            main.setOption(option);
        })
    }
})