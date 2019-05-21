import React, { PureComponent } from 'react'
import ReactEcharts from 'echarts-for-react'
import styled from "styled-components"

const RadarWrap = styled.div`
  margin-bottom:650px;
  position:relative;
`;
export default class Loading extends PureComponent {
  _t = null;
  getOption = () => {
    return {
      title: {
        text: '基础雷达图'
      },
      // 懸停顯示
      tooltip: {
        show: true,
        backgroundColor: 'rgba(20,7,11,.6)',
        padding: 8,
        textStyle: {
          color: 'rgba(206,160,53,.9)',
        },
      },
      legend: {
        data: ['预算分配', '实际开销']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '互動積分', max: 38000 },
          // { name: '敬请期待', max: 52000 },
          { name: '娛樂積分', max: 38000 },
          { name: '遊戲積分', max: 38000 },
          // { name: '敬请期待', max: 52000 },
        ],
        // 坐標
        axisLine: {
          lineStyle: {
            color: 'rgba(112,10,11, 0.9)', // 紅色
          }
        },
        // 分割線
        splitLine: {
          lineStyle: {
            color: 'rgba(206,160,53, 0.9)', // 黃色
          }
        }
      },
      series: [{
        name: '積分雷達圖',
        type: 'radar',
        // areaStyle: {normal: {}},
        // 面積顏色
        areaStyle: {
          color: ['rgba(207,160,53, 0.9)',
            'rgba(207,160,53, 0.8)', 'rgba(207,160,53, 0.9)',
            'rgba(207,160,53, 0.8)', 'rgba(207,160,53, 1)'],
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 10
        },
        data: [
          {
            value: [14300, 5400, 28000],
            // name: '预算分配'
          },
        ]
      }]
    };
  };
  onChartReady = (chart) => {
    this._t = setTimeout(function () {
      chart.hideLoading();
    }, 3000);
  };

  getLoadingOption = () => {
    return {
      text: '加载中...',
      color: '#4413c2',
      textColor: '#270240',
      maskColor: 'rgba(194, 88, 86, 0.3)',
      zlevel: 0
    };
  };

  componentWillUnmount() {
    clearTimeout(this._t);
  };

  render() {
    let code = "onChartReady: function(chart) {\n" +
      "  'chart.hideLoading();\n" +
      "}\n\n" +
      "<ReactEcharts \n" +
      "  option={this.getOption()} \n" +
      "  onChartReady={this.onChartReady} \n" +
      "  loadingOption={this.getLoadingOption()} \n" +
      "  showLoading={true} />";

    return (
      <RadarWrap>
        <div className='parent'>
          <label> Chart loading With <strong> showLoading </strong>: (when chart ready, hide the loading mask.)</label>
          <ReactEcharts
            option={this.getOption()}
            // onChartReady={this.onChartReady}
            // loadingOption={this.getLoadingOption()}
            // showLoading={true}
          />
          <label> code below: </label>
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      </RadarWrap>
    )
  }
}