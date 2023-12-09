/*
 * @creater: panan
 * @message: Poup弹窗组件
 * @since: 2023-12-07 13:41:27
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-09 17:03:24
 * @文件相对于项目的路径: /logic-umi/src/pages/antv-g6/Poup.tsx
 */

import { Descriptions } from 'antd';
import React, { FC, useEffect, useState } from 'react'
import type { DescriptionsProps } from 'antd';

const Poup: FC<Record<string, any>> = ({ data }) => {

  const [dataSource, setDataSource] = useState()
  const [basicItems, setBasicItems] = useState<DescriptionsProps['items']>()
  const [sourceItems, setSourceItems] = useState<DescriptionsProps['items']>()
  const [memeryItems, setMemeryItems] = useState<DescriptionsProps['items']>()

  // const items: DescriptionsProps['items'] = [
  //   {
  //     key: '1',
  //     label: 'Product',
  //     children: 'Cloud Database',
  //     span:3
  //   },
  //   {
  //     key: '2',
  //     label: 'Billing Mode',
  //     children: 'Prepaid',
  //     span:3
  //   },
  //   {
  //     key: '3',
  //     label: 'Automatic Renewal',
  //     children: 'YES',
  //     span:3
  //   },
  //   {
  //     key: '4',
  //     label: 'Order time',
  //     children: '2018-04-24 18:00:00',
  //     span:3
  //   },
  //   {
  //     key: '5',
  //     label: 'Usage Time',
  //     children: '2019-04-24 18:00:00',
  //     span:3
  //   },
  //   {
  //     key: '6',
  //     label: 'Status',
  //     span: 3,
  //     children: <Badge status="processing" text="Running" />,
  //   },
  //   {
  //     key: '7',
  //     label: 'Negotiated Amount',
  //     children: '$80.00',
  //     span:3
  //   },
  //   {
  //     key: '8',
  //     label: 'Discount',
  //     children: '$20.00',
  //     span:3
  //   },
  // ];
  useEffect(() => {
    if (!data) return
    setDataSource(data)
    const { id, label, cluster } = data
    setBasicItems([
      {
        key: '1',
        label: '应用code',
        children: id,
        span: 3
      },
      {
        key: '2',
        label: '应用名称',
        children: label,
        span: 3
      },
      {
        key: '3',
        label: '所属租户',
        children: cluster,
        span: 3
      },
      {
        key: '4',
        label: '所属领域',
        children: 'cluster',
        span: 3
      },
    ])
    setSourceItems([
      {
        key: '1',
        label: 'Deployments',
        children: '306',
        span: 3
      },
      {
        key: '2',
        label: 'Pods',
        children: 647,
        span: 3
      },
      {
        key: '3',
        label: 'Containers',
        children: 861,
        span: 3
      }
    ])
    setMemeryItems([
      {
        key: '1',
        label: 'Limits',
        children: 1000 + 'C',
        span: 3
      },
      {
        key: '2',
        label: 'Requests',
        children: label,
        span: 3
      },
      {
        key: '3',
        label: 'Usage',
        children: cluster,
        span: 3
      },
      {
        key: '4',
        label: 'ALLocatable Capacity',
        children: 200 + 'C',
        span: 3
      },
      {
        key: '5',
        label: 'Capacity',
        children: 1200 + 'C',
        span: 3
      },
    ])
  }, [data])
  return (
    <>
      {
        dataSource && (
          <>
            <Descriptions title="基本信息" items={basicItems} />
            <Descriptions title="资源信息" items={sourceItems} />
            <Descriptions title="容量信息" items={memeryItems} />
          </>
        )
      }
    </>
  )
}

export default Poup

