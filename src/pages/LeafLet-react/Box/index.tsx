/*
 * @creater: panan
 * @message: 地图组件
 * @since: 2023-12-04 13:47:50
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-04 14:56:05
 * @文件相对于项目的路径: /logic-umi/src/pages/LeafLet-react/Box/index.tsx
 */

import React, { FC, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { IBox } from './type'
import 'leaflet/dist/leaflet.css'

const Box: FC<IBox> = ({ id }) => {


  return (
    <MapContainer id={id} style={{ minHeight: '500px' }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
        />
      {/* <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>
  )
}

export default Box
