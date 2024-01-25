/*
 * @creater: panan
 * @message: Table
 * @since: 2024-01-23 13:45:20
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-01-23 15:50:48
 * @文件相对于项目的路径: /logic-umi/src/pages/tcloud/costDetail/detailTable/index.tsx
 */

import React, { FC, useEffect } from 'react'
import { Table } from 'antd'
interface Props {
  year: string | undefined;
  checkList: any[] | undefined;
  date: string[] | undefined;
  num?: number;
}

const initColumns = [
  {
    title: '排行',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: 'TCP项目组',
    dataIndex: 'tcpProjectGroup',
    key: 'tcpProjectGroup',
  },
  {
    title: '机房托管',
    dataIndex: 'dataCenterHosting',
    key: 'dataCenterHosting',
    sorter: true,
  },
  {
    title: '五常自建',
    dataIndex: 'wuchangSelfBuilt',
    key: 'wuchangSelfBuilt',
    sorter: true,
  },
  {
    title: 'GPU',
    dataIndex: 'gpu',
    key: 'gpu',
    sorter: true,
  },
  {
    title: '专线',
    dataIndex: 'dedicatedLine',
    key: 'dedicatedLine',
    sorter: true,
  },
  {
    title: '总费用',
    dataIndex: 'totalCost',
    key: 'totalCost',
    sorter: true,
  },
];

const DetailTable: FC<Props> = (props) => {
  const { year, checkList, date, num } = props

  const fetchData = () => {
    console.log(year, checkList, date, num)
  }
  useEffect(() => {
    if(!year || !checkList || !date || !num) return
    fetchData()
  },[year, checkList, date, num])
  return (
    <>
      <Table
        columns={initColumns}
        dataSource={[]}
      />
      <Table
        columns={initColumns}
        dataSource={[]}
        showHeader={false}
      />
    </>
  )
}


export default DetailTable