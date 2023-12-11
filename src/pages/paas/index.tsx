/*
 * @creater: panan
 * @message: paas首页
 * @since: 2023-12-10 10:49:59
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-10 11:00:21
 * @文件相对于项目的路径: /logic-umi/src/pages/paas/index.tsx
 */
import { Tabs, TabsProps } from 'antd'
import React from 'react'
import AntvL7 from './Paas'

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '云监控',
    children: <AntvL7 />
  }
]

const Index = () => {


  return (
    <Tabs
      items={items}
      tabBarStyle={{
        border: '1px solid #efefef',
        padding: '10px',
        boxShadow: '0 1px 1px #345',
      }}
    />
  )
}

export default Index