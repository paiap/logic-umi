/*
 * @creater: panan
 * @message: 全年费用
 * @since: 2024-01-22 14:10:22
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-01-23 21:17:01
 * @文件相对于项目的路径: /logic-umi/src/pages/tcloud/costAllYear/index.tsx
 */
import { Card, Spin } from 'antd';
import React, { FC, useEffect, useState } from 'react'
import Title from '../components/title';
import CountUp from 'react-countup';

interface Props {
  year: string;
  checkList?: any[];
}

const CostAllYear: FC<Props> = (props) => {
  const { year } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    if (!year) return;
    fetchData();
  }, [year])

  return (
    <Card
      title={
        <Title title="全年费用" loading={loading} refresh={fetchData} />
      }
      headStyle={{
        padding: 0,
        margin: 0,
      }}
      bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
    >
      <Spin spinning={loading}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          {
            !loading && (
              <>
                <span style={{ fontSize: '30px', fontWeight: 600 }}>
                  <CountUp end={123456789} duration={2} />
                </span>
                <span>较去年：<span style={{ color: 'red', fontWeight: 500, fontSize: '18px' }}>+12%</span></span>
              </>
            )
          }
        </div>
      </Spin>
    </Card>
  )
}

export default CostAllYear