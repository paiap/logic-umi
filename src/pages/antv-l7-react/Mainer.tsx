/*
 * @creater: panan
 * @message: 测试调研组件
 * @since: 2023-11-20 14:36:53
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-08 11:24:07
 * @文件相对于项目的路径: /logic-umi/src/pages/antv-l7-react/Mainer.tsx
 */
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Location, RootObject, ClusterCode } from './sandain'
import {
  LarkMap,
  Marker,
  useScene,
  PointLayer,
  useLayer,
  LayerPopup,
  TextLayer
} from '@antv/larkmap';
import MapPoup from './MapPoup';

interface iMainer {
  data: RootObject;
  location: any;
}

const Mainer: FC<iMainer> = (props) => {
  const { data, location } = props
  const [dataSource, setDataSource] = useState<Location[]>([])
  const scene = useScene();

  useEffect(() => {
    const { location } = data
    setDataSource(location)
  }, [])

  useEffect(() => {
    if (dataSource.length === 0) return
    scene.setMapStyle('dark');
  }, [dataSource])

  useEffect(() => {
    if (!location) return
    scene.setCenter(location)
    scene.setZoom(5)
  }, [location])

  /**
   * @function message: 调用接口
   * @return {*}
   */
  const renderLayerPoup = useMemo(() => {
    return (
      <LayerPopup
        items={[
          {
            layer: 'pointLayer',
            customContent: (feature: Location) => {
              console.log(feature)
              // 处理data数据
              const { clusters, name } = feature || {}
              return (
                <MapPoup items={clusters} />
              )
            },
          }
        ]}
        // 交互方式
        trigger='click'
        // 弹窗宽度
        maxWidth='1000px'
        anchor='left'
      />
    )
  }, [dataSource])
  return (
    <>
      <PointLayer
        id='pointLayer'
        source={{
          data: dataSource,
          parser: {
            type: 'json',
            x: 'longitude',
            y: 'latitude'
          },
        }}
        shape='circle'
        animate={true}
        size={40}
        color='red'
      />

      <TextLayer
        id='textLayer'
        // name='panan'
        source={{
          data: dataSource,
          parser: {
            type: 'json',
            x: 'longitude',
            y: 'latitude',
          },
        }}
        style={{
          fill: 'red',
          textOffset: [0, 20],
        }}
      />
      {renderLayerPoup}

    </>
  )
}

export default Mainer
