/*
 * @creater: panan
 * @message: 测试调研组件
 * @since: 2023-11-20 14:36:53
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-13 16:32:49
 * @文件相对于项目的路径: /logic-umi/src/pages/paas/Paas/index.tsx
 */

import React, { FC, useEffect, useState } from 'react'
import type { LarkMapProps } from '@antv/larkmap';
import {
  LarkMap,
  ZoomControl,
  FullscreenControl,
  MouseLocationControl,
  MapThemeControl,
} from '@antv/larkmap';
import { Col, Input, Row, Select, Space, Switch } from 'antd';
import { mapData, RootObject, Location } from './sandain'
import Mainer from './Mainer';
import Mainer2 from './Mainer2';

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    token: "20dd5b16f9d55538324bd56e5338b4cf",
    pitch: 20,
    style: 'darkblue',
    center: [120.21201, 30.2084],
    zoom: 16,
  },
  logoVisible: false
};

const AntvL7: FC<Record<string, any>> = () => {

  const [dataSource, setDataSource] = useState<RootObject>()
  const [options, setOptions] = useState<any[]>([])
  const [location, setLocation] = useState<Array<number>>([])

  /**
 * @function message: 调用接口
 * @return {*}
 */
  const fetchData = () => {
    setDataSource(mapData)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (!dataSource) return

    const { location = [] as Location[] } = dataSource


    const newOption = location.map((item: Location) => {
      return {
        label: item.name,
        value: `${item.longitude}_${item.latitude}`,
      }
    })
    setOptions(newOption)
  }, [dataSource])



  const handleChangeLocation = (val: string) => {
    const L = val.split('_')
    if (L.length === 2) {
      setLocation([Number(L[0]), Number(L[1])])
    }
  }

  return (
    <>
      <Row gutter={[16, 16]} style={{ height: '100%' }} justify='space-between'>
        <Col span={12}>
          <div style={{ lineHeight: '32px' }}>
            <Space>
              <span>正式集群数: {dataSource?.prodNormal || 0}/{`${(dataSource?.prodNormal || 0) + (dataSource?.prodAbnormal || 0)}`}</span>
              <span>测试集群数: {dataSource?.testNormal || 0}/{`${(dataSource?.testNormal || 0) + (dataSource?.testAbnormal || 0)}`}</span>
              <span>预发布集群数: {dataSource?.stagingNormal || 0}/{`${(dataSource?.stagingNormal || 0) + (dataSource?.stagingAbnormal || 0)}`}</span>
              <span>开发集群数: {dataSource?.devNormal || 0}/{`${(dataSource?.devNormal || 0) + (dataSource?.devAbnormal || 0)}`}</span>
            </Space>
          </div>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Space>
            <Input.Search
              style={{ minWidth: '220px' }}
              placeholder="搜索集群"
            />
            <Select
              options={options}
              style={{ minWidth: '220px', textAlign: 'left' }}
              placeholder="筛选查询地点"
              onChange={handleChangeLocation}
              showSearch
              filterOption={(input, option) =>
                option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
            <div>
              <span>只含GPU资源集群: <Switch checkedChildren="开启" unCheckedChildren="关闭" /></span>
            </div>
          </Space>
        </Col>
        <Col span={24}>
          <LarkMap {...config} style={{ height: '800px' }}>
            <Mainer data={mapData} location={location} />
            <Mainer2 />
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

export default AntvL7