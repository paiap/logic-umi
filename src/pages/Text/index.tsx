/*
 * @creater: panan
 * @message: 测试调研组件
 * @since: 2023-11-20 14:36:53
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-11-20 16:26:11
 * @文件相对于项目的路径: /logic-umi/src/pages/Text/index.tsx
 */
import { Sankey } from '@antv/g2plot';
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

  const fetchData = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/fa3414cc-75ed-47b4-8306-f2ffe8c40127.json')
      .then((res) => res.json())
      .then((data) => {
        setDataSource(data)
      });
  }

  const render = () => {
    if (sankeyRef.current) {
      sankeyRef.current.changeData(dataSource)
      return
    }
    const sankey = new Sankey('container', {
      data: dataSource || [],
      sourceField: 'source',
      targetField: 'target',
      weightField: 'value',
      color: ['red', 'green', 'yellow'],
      edgeStyle: {
        fill: '#ccc',
        fillOpacity: 0.4,
      },
    });
    sankeyRef.current = sankey;
    sankey.render();
  }
  return (
    <div id='container'></div>
  )
}

export default Text
