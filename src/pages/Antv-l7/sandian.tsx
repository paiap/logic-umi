/*
 * @creater: panan
 * @message: 测试调研组件
 * @since: 2023-12-05 20:24:00
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-05 20:49:35
 * @文件相对于项目的路径: /logic-umi/src/pages/Antv-l7/index.tsx
 */
import React, { FC, useEffect, useState } from 'react'
import {
  Scene,
  PointLayer,
} from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { data } from './sandain'

const Sandian: FC<Record<string, any>> = () => {
  const [dataSource, setDataSource] = useState<any[]>([])

  /**
 * @function message: 调用接口
 * @return {*}
 */
  const fetchData = () => {
    setDataSource(data)
  }

  /**
  * @function message: 渲染图表函数
  * @return {*}
  */
  const render = (scene: Scene) => {

    scene.on('loaded', () => {
      const pointLayer = new PointLayer({})
        .source(dataSource, {
          parser: {
            type: 'json',
            x: 'Longitude',
            y: 'Latitude'
          }
        })
        .shape('circle')
        .active(true)
        .animate(true)
        .size(40)
        .color('red')

      scene.addLayer(pointLayer);

      // 渲染scene
      scene.render();
    });
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (dataSource.length === 0) return

    const scene = new Scene({
      id: 'map2',
      logoVisible: false,//关闭默认的logo
      map: new GaodeMap({
        token: "20dd5b16f9d55538324bd56e5338b4cf",
        // pitch: 20,
        style: 'light',
        center: [112, 23.69],
        zoom: 2.5,
      }),
    });
    render(scene)
  }, [dataSource])


  return (
    <div style={{ minHeight: '700px', justifyContent: 'center', position: 'relative' }} id="map2" />
  )
}

export default Sandian
