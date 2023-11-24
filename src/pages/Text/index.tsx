/*
 * @creater: panan
 * @message: 测试调研组件
 * @since: 2023-11-20 14:36:53
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-11-22 14:53:02
 * @文件相对于项目的路径: /logic-umi/src/pages/Text/index.tsx
 */
import { Bar } from '@antv/g2plot';
import React, { FC, useEffect, useRef, useState } from 'react'
type IText = Record<string, any>

const Text: FC<IText> = () => {
  const [dataSource, setDataSource] = useState<any[]>()
  const sankeyRef = useRef<any>(null)
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (!dataSource) return
    render()
  }, [dataSource])

  /**
   * @function message: 调用接口
   * @return {*}
   */
  const fetchData = () => {
    // fetch('https://gw.alipayobjects.com/os/bmw-prod/fa3414cc-75ed-47b4-8306-f2ffe8c40127.json')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setDataSource(data)
    //   });
    const data = [
      {
        type: '家具家电',
        sales: 38,
        machines: 4
      },
      {
        type: '粮油副食',
        sales: 52,
        machines: 6
      },
      {
        type: '生鲜水果',
        sales: 61,
        machines: 2
      },
      {
        type: '美容洗护',
        sales: 145,
        machines: 5
      },
    ];
    setDataSource(data)
  }

  /**
   * @function message: 渲染图表函数
   * @return {*}
   */
  const render = () => {
    if (sankeyRef.current) {
      sankeyRef.current.changeData(dataSource)
      return
    }
    const barPlot = new Bar('container', {
      data: dataSource || [],
      xField: 'sales',
      yField: 'type',
      // widthField:'machines',
      barWidthRatio: 0.8,
      meta: {
        type: {
          alias: '类别',
        },
        sales: {
          alias: '销售额',
        },
      },
    });

    barPlot.render();
    sankeyRef.current = barPlot;
    barPlot.render();
  }
  return (
    <div id='container'></div>
  )
}

export default Text
