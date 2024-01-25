import React, { FC, useState, useEffect } from 'react'
import type { TabsProps, CheckboxProps } from 'antd';
import { Button, Card, Checkbox, Col, Row, Space, Tabs } from 'antd'
import CostAllYear from './costAllYear';
import CostTrend from './costTrend';
import CostAnalysis from './costAnalysis';
import CostDetail from './costDetail';

type TcoudProps = Record<string, any>

const years = ['2024年', '2023年', '2022年']
const plainOptions = ['GPU', '机房托管', '五常自建', '公有云', '专线', '短信', '语音', '域名', '信息安全', 'CDN'];

const Tcoud: FC<TcoudProps> = () => {
  const [items, setItems] = useState<TabsProps['items']>()
  const [currentYear, setCurrentYear] = useState<string>()
  const [checkedList, setCheckedList] = useState<any[]>();


  useEffect(() => {
    const item = years.map((year) => ({
      key: year,
      label: year,
    }))
    setItems(item)
    setCurrentYear(item[0].key)
    setCheckedList(plainOptions)
  }, [])

  const onChange = (key: string) => {
    console.log(key);
    setCurrentYear(key)
  };

  const checkAll = plainOptions.length === checkedList?.length;
  const indeterminate = checkedList && checkedList.length > 0 && checkedList.length < plainOptions.length;
  const checkboxChange = (list: any[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  return (
    <div style={{ backgroundColor: '#efefef' }}>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Card
            bodyStyle={{
              padding: '5px',
            }}
          >
            <Tabs
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
              type='card'
              tabBarStyle={{
                margin: 0
              }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <CostAllYear year={currentYear || ''} checkList={checkedList || []} />
        </Col>
        <Col span={18}>
          <CostTrend year={currentYear || ''} checkList={checkedList || []} />
        </Col>
        <Col span={24}>
          <Card
            title={(
              <Row>
                <Col span={24}>
                  <Space>
                    <span>费用类别</span>
                    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                      全部
                    </Checkbox>
                    <Checkbox.Group options={plainOptions} value={checkedList} onChange={checkboxChange} />
                  </Space>
                </Col>
                {/* <Col span={2} style={{ textAlign: 'right' }}>
              <Button type='primary'>搜索</Button>
            </Col> */}
              </Row>
            )}
          >
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <CostAnalysis year={currentYear || ''} checkList={checkedList || []} />
              </Col>
              <Col span={24}>
                <CostDetail year={currentYear || ''} checkList={checkedList || []} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Tcoud
