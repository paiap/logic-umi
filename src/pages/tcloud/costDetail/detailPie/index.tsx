/*
 * @creater: panan
 * @message: Pie
 * @since: 2024-01-23 13:44:52
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-01-24 14:00:52
 * @文件相对于项目的路径: /logic-umi/src/pages/tcloud/costDetail/detailPie/index.tsx
 */

import React, { FC, useEffect, useRef } from 'react'
import { Pie, measureTextWidth } from '@antv/g2plot';
import * as echarts from 'echarts';

interface Props {
  year: string | undefined;
  checkList: any[] | undefined;
  date: string[] | undefined;
  num?: number;
}

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '分类五1', value: 10 },
  { type: '分类五2', value: 10 },
  { type: '分类五3', value: 10 },
  { type: '分类五4', value: 10 },
  { type: '分类五5', value: 10 },
  { type: '分类五6', value: 10 },
  { type: '分类五7', value: 10 },
  { type: '分类五8', value: 10 },
  { type: '分类五9', value: 10 },
  { type: '分类五0', value: 10 },
  { type: '分类五11', value: 10 },
  { type: '分类五12', value: 10 },
  { type: '分类五23', value: 10 },
  { type: '分类五44', value: 10 },
  { type: '其他', value: 5 },
];


const DetailPie: FC<Props> = (props) => {
  const { year, checkList, date, num } = props

  const detailPieRef = useRef<any>()

  const renderStatistic = (containerWidth: any, text: any, style: any) => {
    const textWidth = measureTextWidth(text, style);
    const textHeight = style.lineHeight || style.fontSize
    const R = containerWidth / 2;
    // r^2 = (w / 2)^2 + (h - offsetY)^2
    let scale = 1;
    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }
    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
  }

  const fetchData = () => {
    // let myChart = echarts.init(document.getElementById('detailPie'));

    // myChart.setOption({
    //   tooltip: {
    //     trigger: 'item'
    //   },
    //   legend: {
    //     // top: '5%',
    //     // left: 'center'
    //   },
    //   series: [
    //     {
    //       name: 'Access From',
    //       type: 'pie',
    //       radius: ['40%', '70%'],
    //       avoidLabelOverlap: false,
    //       itemStyle: {
    //         borderRadius: 10,
    //         borderColor: '#fff',
    //         borderWidth: 2
    //       },
    //       label: {
    //         show: false,
    //         position: 'center'
    //       },
    //       emphasis: {
    //         label: {
    //           show: true,
    //           fontSize: 20,
    //           fontWeight: 'bold'
    //         }
    //       },
    //       labelLine: {
    //         show: false
    //       },
    //       data: [
    //         { value: 1048, name: 'Search Engine' },
    //         { value: 735, name: 'Direct' },
    //         { value: 580, name: 'Email' },
    //         { value: 484, name: 'Union Ads' },
    //         { value: 484, name: 'Union Ads1' },
    //         { value: 484, name: 'Union Ads2' },
    //         { value: 484, name: 'Union Ads3' },
    //         { value: 484, name: 'Union Ads4' },
    //         { value: 484, name: 'Union Ads5' },
    //         { value: 300, name: 'Video Ads' }
    //       ]
    //     }
    //   ]
    // })

    if (detailPieRef.current) {
      detailPieRef.current?.changeData(data)
      return
    }
    const piePlot = new Pie('detailPie', {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      innerRadius: 0.65,
      meta: {
        value: {
          formatter: (v) => `${v} ¥`,
        },
      },
      label: {
        type: 'inner',
        offset: '-50%',
        style: {
          textAlign: 'center',
        },
        autoRotate: false,
        content: '{value}',
      },
      legend: {
        position: 'bottom',
      },
      statistic: {
        title: {
          offsetY: -4,
          customHtml: (container, view, datum) => {
            const { width, height } = container.getBoundingClientRect();
            const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
            const text = datum ? datum.type : '总计';
            return renderStatistic(d, text, { fontSize: 28 });
          },
        },
        content: {
          offsetY: 4,
          style: {
            fontSize: '32px',
          },
          customHtml: (container, view, datum, data) => {
            const { width } = container.getBoundingClientRect();

            const text = datum ? `¥ ${datum.value}` : `¥ ${data.reduce((r, d) => r + d.value, 0)}`;
            return renderStatistic(width, text, { fontSize: 32 });
          },
        },
      },
      // 添加 中心统计文本 交互
      interactions: [{ type: 'element-selected' }, { type: 'element-active' }, { type: 'pie-statistic-active' }],
    });
    detailPieRef.current = piePlot;
    piePlot.render();
  }

  useEffect(() => {
    if (!year || !checkList || !date || !num) return
    fetchData()
  }, [year, checkList, date, num])

  return (
    <div id='detailPie'></div>
  )
}


export default DetailPie