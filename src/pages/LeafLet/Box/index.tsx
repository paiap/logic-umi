/*
 * @creater: panan
 * @message: 地图组件
 * @since: 2023-12-04 11:24:24
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-19 14:40:10
 * @文件相对于项目的路径: /logic-umi/src/pages/LeafLet/Box/index.tsx
 */

import React, { FC, useEffect } from 'react'
import L from 'leaflet'
import { IBox } from './type'
import 'leaflet/dist/leaflet.css'

const Box: FC<IBox> = ({ id }) => {


  /**
 * @function message: 渲染图表函数
 * @return {*}
 */
  const render = () => {
    const container = document.getElementById(id)
    if (container) {
      // 创建地图实例
      const map = L.map(id).setView([30.2084, 120.21201], 13);

      let baseLayer = L.tileLayer("http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}", {
        attribution: '&copy; paas集群总览',
        maxZoom: 13,
        minZoom: 4,
        subdomains: "1",
      });
      map.addLayer(baseLayer);
    }

  }

  useEffect(() => {
    render()
  }, [])



  return (
    <div id={id} style={{ minHeight: '600px' }}></div>
  )
}

export default Box
