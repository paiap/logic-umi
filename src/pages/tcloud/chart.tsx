import React, { FC, useEffect } from 'react'
import { Column } from '@antv/g2plot';

import { data } from './mock'
type TcoudProps = Record<string, any>

const Tcoud: FC<TcoudProps> = () => {
  useEffect(() => {
    const stackedColumnPlot = new Column('container', {
      data,
      isStack: true,
      xField: 'month',
      yField: 'value',
      seriesField: 'type',
      label: {
        // 可手动配置 label 数据标签位置
        position: 'middle', // 'top', 'bottom', 'middle'
        // 可配置附加的布局方法
        layout: [
          // 柱形图数据标签位置自动调整
          { type: 'interval-adjust-position' },
          // 数据标签防遮挡
          { type: 'interval-hide-overlap' },
          // 数据标签文颜色自动调整
          { type: 'adjust-color' },
        ],
      },
    });

    stackedColumnPlot.render();
  }, [])
  return (
    <div id='container'></div>
  )
}

export default Tcoud
