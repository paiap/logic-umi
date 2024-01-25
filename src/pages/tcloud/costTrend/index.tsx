import { Card } from 'antd';
import React, { FC, useEffect, useRef, useState } from 'react'
import Title from '../components/title';
import { Line } from '@antv/g2plot';

interface Props {
  year: string;
  checkList?: any[];
}

const CostTrend: FC<Props> = (props) => {
  const { year } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const costTrendRef = useRef<any>()

  const fetchData = () => {
    setLoading(true)
    fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
      .then((res) => res.json())
      .then((data) => {
        if (costTrendRef.current) {
          costTrendRef.current.changeData(data)
          return
        }
        const line = new Line('costTrendLine', {
          data,
          xField: 'year',
          yField: 'value',
          seriesField: 'category',
          xAxis: {
            type: 'time',
          },
          yAxis: {
            label: {
              // 数值格式化为千分位
              formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
          },
          animation: {
            appear: {
              animation: 'path-in',
              duration: 1500,
            },
          },
        });
        costTrendRef.current = line
        line.render();
      }).finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!year) return
    fetchData()
  }, [year])


  return (
    <Card
      title={
        <Title title="费用走势" loading={loading} refresh={fetchData} />
      }
      headStyle={{
        padding: 0,
        margin: 0,
      }}
    >
      <div id="costTrendLine" style={{ height: '200px' }}></div>
    </Card>
  )
}

export default CostTrend