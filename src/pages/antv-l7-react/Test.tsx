/*
 * @creater: panan
 * @message: 测试调研组件
 * @since: 2023-11-20 14:36:53
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-07 10:58:28
 * @文件相对于项目的路径: /logic-umi/src/pages/antv-l7-react/Test.tsx
 */
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { RootObject } from './sandain'
import {
  LarkMap,
  Marker,
  useScene,
  PointLayer,
  useLayer,
  LayerPopup
} from '@antv/larkmap';

const Test: FC<Record<string, any>> = ({ data, location }) => {
  const [dataSource, setDataSource] = useState<RootObject[]>([])
  const scene = useScene();

  useEffect(() => {
    fetchData()
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
  const fetchData = () => {
    setDataSource(data)
  }


  const renderMark = useMemo(() => {
    return dataSource.map((item: RootObject, index: number) => {
      return (
        <Marker
          key={index}
          lngLat={{ lng: item.Longitude, lat: item.Latitude }}
          anchor="center"
          onClick={(e) => {
            console.log(e)
          }}
          extData={item}
          color='red'
        >
        </Marker>
      )
    })
  }, [dataSource])

  return (
    <>
      <PointLayer
        id='pointLayer'
        source={{
          data: dataSource,
          parser: {
            type: 'json',
            x: 'Longitude',
            y: 'Latitude'
          },
        }}
        shape='circle'
        animate={true}
        size={40}
        color='red'
      />
      <LayerPopup
        items={[
          {
            layer: 'pointLayer',
            customContent: (feature: RootObject) => {
              console.log(feature)
              // 处理data数据
              const { SATCATDesignation = '', FullName = '', Longitude = '', Latitude = '', Designation = '' } = feature || {}
              return (
                <div>
                  <p>{SATCATDesignation}</p>
                  <p>{FullName}</p>
                  <p>{Longitude}</p>
                  <p>{Latitude}</p>
                  <p>{Designation}</p>
                </div>
              )
            },
          }
        ]}
        // 交互方式
        trigger='click'
        // 弹窗宽度
        maxWidth='400px'
      />

    </>
  )
}

export default Test
