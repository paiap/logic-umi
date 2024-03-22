/*
 * @creater: panan
 * @message: echart
 * @since: 2024-02-01 14:45:44
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-02-04 12:57:59
 * @文件相对于项目的路径: /logic-umi/src/pages/Echart/index.tsx
 */

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

const LineBarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);

    const option = {
      title: {
        text: 'Echarts Test'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      barWidth: '30px',
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          stack: 'a',
          name: 'a',
          itemStyle: {
            barBorderRadius: [0, 0], // 这里可以设置成单个数字或数组 [水平半径, 垂直半径]
          }
        },
        {
          data: [10, 46, 64, '-', 0, '-', 0],
          type: 'bar',
          stack: 'a',
          name: 'b',
          itemStyle: {
            barBorderRadius: [0, 0], // 这里可以设置成单个数字或数组 [水平半径, 垂直半径]
          }
        },
        {
          data: [30, '-', 0, 20, 10, '-', 0],
          type: 'bar',
          stack: 'a',
          name: 'c',
          itemStyle: {
            barBorderRadius: [0, 0], // 这里可以设置成单个数字或数组 [水平半径, 垂直半径]
          }
        },
        {
          data: [30, '-', 0, 20, 10, '-', 0],
          type: 'bar',
          stack: 'a',
          name: 'd',
          itemStyle: {
            barBorderRadius: [0, 0], // 这里可以设置成单个数字或数组 [水平半径, 垂直半径]
          }
        },
        {
          data: [10, 20, 150, 0, '-', 50, 10],
          type: 'bar',
          stack: 'a',
          name: 'e',
          itemStyle: {
            barBorderRadius: [0, 0], // 这里可以设置成单个数字或数组 [水平半径, 垂直半径]
          }
        }
      ],
      tooltip: {
        trigger: 'axis',
      }
    };
    chartInstance.setOption(option);

    chartInstance.on('click', (params: any) => {
      console.log(params);
    })
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div ref={chartRef} style={{ height: "600px" }}></div>
    </div>
  );
}

export default LineBarChart;