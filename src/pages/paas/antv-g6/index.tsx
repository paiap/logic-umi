/*
 * @creater: panan
 * @message: antv/g6调研
 * @since: 2023-12-06 14:12:29
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-22 11:12:36
 * @文件相对于项目的路径: /logic-umi/src/pages/paas/antv-g6/index.tsx
 */

import React, { FC, useEffect, useState } from 'react'
import { Breadcrumb, Button, Select, Space, Tabs } from 'antd';
import { history } from 'umi';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { TabsProps } from 'antd';
import TenantG6 from './Tenant';

const AntvG6: FC<Record<string, any>> = () => {

  const [item, setItem] = useState<TabsProps['items']>()
  const [keys, setKeys] = useState<string>()

  useEffect(() => {
    const params = history.location.state
    console.log(params)

    const tabItem: TabsProps['items'] = [
      {
        key: '1',
        label: '租户概览',
        children: <TenantG6 params={params} />
      },
      {
        key: '2',
        label: '应用概览',
        children: '222'
      },
    ]
    setItem(tabItem)

    setKeys('1')
  }, [])

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button
          type='text'
          onClick={() => history.back()}
        >
          <Breadcrumb items={[
            {
              key: '1',
              title: (
                <span >
                  <ArrowLeftOutlined /> <span>test集群</span>
                </span>
              )
            }
          ]}>
          </Breadcrumb>
        </Button>
      </div>
      <Tabs
        items={item}
        onChange={(key) => {
          console.log(key)
          setKeys(key)
        }}
        tabBarExtraContent={(
          <Space>
            <Select
              style={{ minWidth: '200px' }}
              placeholder='集群搜索'
              options={[]}
            />
            {
              keys === '2' && (
                <Button type='primary'>创建应用</Button>
              )
            }
          </Space>
        )}
      />
    </>
  )
}

export default AntvG6