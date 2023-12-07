/*
 * @creater: panan
 * @message: 测试调研组件
 * @since: 2023-11-20 14:36:53
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-07 11:09:16
 * @文件相对于项目的路径: /logic-umi/src/pages/antv-l7-react/index.tsx
 */
import React, { FC, useEffect, useRef, useState } from 'react'
import type { LarkMapProps } from '@antv/larkmap';
import {
  LarkMap,
  ZoomControl,
  ScaleControl,
  FullscreenControl,
  MouseLocationControl,
  MapThemeControl,
  useScene
} from '@antv/larkmap';
import { Col, Row, Select } from 'antd';
import { data, RootObject } from './sandain'
import Test from './Test';

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    token: "20dd5b16f9d55538324bd56e5338b4cf",
    pitch: 20,
    style: 'light',
    center: [120.21201, 30.2084],
    zoom: 11,
  },
  logoVisible: false
};

const Text: FC<Record<string, any>> = () => {

  const [dataSource, setDataSource] = useState<RootObject[]>([])
  const [options, setOptions] = useState<any[]>([])
  const [location, setLocation] = useState<Array<number>>([])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (dataSource.length === 0) return

    const newOption = dataSource.map((item: RootObject) => {
      return {
        label: item.FullName,
        value: `${item.Longitude}_${item.Latitude}`,
      }
    })
    setOptions(newOption)
  }, [dataSource])

  /**
   * @function message: 调用接口
   * @return {*}
   */
  const fetchData = () => {
    setDataSource(data)
  }

  const handleChangeLocation = (val: string) => {
    const L = val.split('_')
    if (L.length === 2) {
      setLocation([Number(L[0]), Number(L[1])])
    }
  }

  return (
    <>
      <Row gutter={[16, 16]} style={{ height: '100%' }}>
        <Col span={24}>
          <Select
            options={options}
            style={{ minWidth: '300px' }}
            placeholder="请选择集群所在地点"
            onChange={handleChangeLocation}
          />
        </Col>
        <Col span={24}>
          <LarkMap {...config} style={{ height: '500px' }}>
            <Test data={data} location={location} />
            <ZoomControl />
            <MouseLocationControl />
            <FullscreenControl />
            <MapThemeControl />
          </LarkMap>
        </Col>
      </Row>

    </>
  )
}

export default Text
