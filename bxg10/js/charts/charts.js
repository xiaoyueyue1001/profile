/**
 * Created by wangyue on 2017/9/16.
 */
define([
    'text!tpls/charts.html',
    'common/api',
    'echarts'
], function (chartsTpls,api,echarts) {
    return function () {
        api.ajax('/api/teacher','get',{}, function (res) {
            var $html = $(chartsTpls);
            $('.content-container').html($html);
            var chartsDom = $('#pie')[0];
            var myChart = echarts.init(chartsDom);
            var formData = [
                {value:0, name:'男'},
                {value:0, name:'女'}
            ];
            res.result.forEach(function (v) {
                formData[v.tc_gender].value++;
            })

            var option = {
                title : {
                    text: '讲师性别比例',
                    //subtext: '纯属虚构',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: formData.map(function (v) {
                        return v.name
                    })
                },
                series : [
                    {
                        //name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:formData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);

        })

    }
})