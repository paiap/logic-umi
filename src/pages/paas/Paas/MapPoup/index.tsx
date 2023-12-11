/*
 * @creater: panan
 * @message: mapPoup弹窗
 * @since: 2023-12-07 15:03:41
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-10 11:18:10
 * @文件相对于项目的路径: /logic-umi/src/pages/paas/Paas/MapPoup/index.tsx
 */

import React, { FC, useEffect, useState } from 'react'
import { ClusterCode } from '../sandain'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd';
import ListPoup from './ListPoup'

interface MapPoupProps {
  items: ClusterCode[] | undefined
}

const MapPoup: FC<MapPoupProps> = ({ items }) => {
  const [dataSource, setDataSource] = useState<ClusterCode[]>()
  const [tabItems, setTabItems] = useState<TabsProps['items']>()

  useEffect(() => {
    if (!items) return
    setDataSource(items)
  }, [items])

  useEffect(() => {
    if (!dataSource) return
    if (dataSource.length > 1) {
      const newItems = dataSource.map((item: ClusterCode, index: number) => {
        return {
          key: String(index),
          label: item.basicInfo.clusterName,
          children: <ListPoup item={item} />
        }
      })
      setTabItems(newItems)
    }
  }, [dataSource])
  return (
    <>
      {
        items?.length === 1 ? (
          <ListPoup item={dataSource ? dataSource[0] : null} />
        ) : (
          <Tabs
            items={tabItems}
            tabPosition='left'
            tabBarStyle={{ padding: '0px', margin: '0px' }}
            size='small'
          />
        )
      }
    </>
  )
}

export default MapPoup