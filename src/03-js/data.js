require("../02-css/data.less")
const echarts = require("echarts")
document.ready(function () {
    console.log(111);
    console.log(echarts);

    // 柱状图
    var columnarChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    var columnarOption = {
        title: {
            text: '近7天运动时长1'
        },
        tooltip: {},
        legend: {
            data: ['时间']
        },
        xAxis: {
            data: ["8-1", "8-2", "8-3", "8-4", "8-5", "8-6"]
        },
        yAxis: {},
        series: [{
            name: '时间',
            type: 'bar',
            data: [105, 20, 36, 40, 10, 50]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    columnarChart.setOption(columnarOption);
console.log(222);

    // 饼状图
    var pieChart = echarts.init(document.getElementById('content'));
    // 指定图表的配置项和数据
    let pieOption = {
        title: {
            text: '运动类型',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: '唱' },
                    { value: 735, name: '跳' },
                    { value: 580, name: '篮球' },
                    { value: 484, name: 'rap' },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    pieChart.setOption(pieOption);


    // 折线图
    var lineChart = echarts.init(document.getElementById('line'));
    // 指定图表的配置项和数据
    var lineOption = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }]
        };
    // 使用刚指定的配置项和数据显示图表。
    lineChart.setOption(lineOption);


    //散点图
    var dotChart = echarts.init(document.getElementById('dot'));
   // 指定图表的配置项和数据
    var dotOption = {
        xAxis: {},
        yAxis: {},
        series: [{
            symbolSize: 20,
            data: [
                [10.0, 8.04],
                [8.07, 6.95],
                [13.0, 7.58],
                [9.05, 8.81],
                [11.0, 8.33],
                [14.0, 7.66],
                [13.4, 6.81],
                [12.5, 6.82],
                [9.15, 7.20],
                [7.08, 5.82],
                [5.02, 5.68]
            ],
            type: 'scatter'
        }]
    };
     // 使用刚指定的配置项和数据显示图表。
     dotChart.setOption(dotOption);
})