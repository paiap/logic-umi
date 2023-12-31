/*
 * @creater: panan
 * @message: 测试调研组件
 * @since: 2023-11-20 14:36:53
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-13 14:20:24
 * @文件相对于项目的路径: /logic-umi/src/pages/paas/Paas/Mainer.tsx
 */
import React, { FC, useEffect, useMemo, useState } from 'react'
import { Location, RootObject } from './sandain'
import {
  useScene,
  PointLayer,
  LayerPopup,
  TextLayer,
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
    scene.setZoom(16)
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
              const { clusters } = feature || {}
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
