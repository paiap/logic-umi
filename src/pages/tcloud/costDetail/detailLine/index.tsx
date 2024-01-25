/*
 * @creater: panan
 * @message: Line
 * @since: 2024-01-23 13:42:27
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-01-24 14:50:49
 * @文件相对于项目的路径: /logic-umi/src/pages/tcloud/costDetail/detailLine/index.tsx
 */

import React, { FC, useEffect, useRef } from 'react'
import { DualAxes } from '@antv/g2plot';
import { Col, Form, Row, Select, Space } from 'antd';

interface Props {
  year: string | undefined;
  checkList: any[] | undefined;
  date: string[] | undefined;
  num?: number;
}

const uvBillData = [
  { time: '2019-03', value: 350, type: 'uv' },
  { time: '2019-04', value: 900, type: 'uv' },
  { time: '2019-05', value: 300, type: 'uv' },
  { time: '2019-06', value: 450, type: 'uv' },
  { time: '2019-07', value: 470, type: 'uv' },
  { time: '2019-03', value: 220, type: 'bill' },
  { time: '2019-04', value: 300, type: 'bill' },
  { time: '2019-05', value: 250, type: 'bill' },
  { time: '2019-06', value: 220, type: 'bill' },
  { time: '2019-07', value: 362, type: 'bill' },
];

const transformData = [
  { time: '2019-03', count: 80, name: 'a' },
  { time: '2019-04', count: 60, name: 'a' },
  { time: '2019-05', count: 40, name: 'a' },
  { time: '2019-06', count: 38, name: 'a' },
  { time: '2019-07', count: 22, name: 'a' },
  { time: '2019-03', count: 75, name: 'b' },
  { time: '2019-04', count: 65, name: 'b' },
  { time: '2019-05', count: 45, name: 'b' },
  { time: '2019-06', count: 40, name: 'b' },
  { time: '2019-07', count: 32, name: 'b' },
  { time: '2019-03', count: 90, name: 'c' },
  { time: '2019-04', count: 60, name: 'c' },
  { time: '2019-05', count: 45, name: 'c' },
  { time: '2019-06', count: 30, name: 'c' },
  { time: '2019-07', count: 20, name: 'c' },
];

const DetailLine: FC<Props> = (props) => {
  const { year, checkList, date, num } = props;
  const costdetailLineRef = useRef<any>()

  const fetchData = () => {
    if(costdetailLineRef.current) {
      costdetailLineRef.current.changeData([uvBillData, transformData])
      return
    }
    const dualAxes = new DualAxes('CostdetailLine', {
      data: [uvBillData, transformData],
      xField: 'time',
      yField: ['value', 'count'],
      geometryOptions: [
        {
          geometry: 'line',
          seriesField: 'type',
          lineStyle: {
            lineWidth: 3,
            lineDash: [5, 5],
          },
          smooth: true,
        },
        {
          geometry: 'line',
          seriesField: 'name',
          point: {},
        },
      ],
    })

    costdetailLineRef.current = dualAxes;
    dualAxes.render();
  }

  useEffect(() => {
    if (!year || !checkList || !date || !num) return
    fetchData()
  }, [year, checkList, date, num])


  return (
    <Row style={{ marginTop: '50px' }}>
      <Col span={24}>
        <Space>
          <Form.Item label='TCP项目组'>
            <Select
              options={[]}
              placeholder='请选择'
              style={{ minWidth: '300px' }}
            />
          </Form.Item>
          <Form.Item label='北极星指标'>
            <Select
              options={[]}
              placeholder='请选择'
              style={{ minWidth: '300px' }}
            />
          </Form.Item>
        </Space>
      </Col>
      <Col span={24}>
        <div id='CostdetailLine'></div>
      </Col>
    </Row>
  )
}


export default DetailLine