import { Card, Col, Row } from 'antd';
import React, { FC, useEffect, useRef, useState } from 'react'
import Title from '../components/title';
import { Pie, Line } from '@antv/g2plot';
// import Highcharts from 'highcharts'
// import HighchartsReact from 'highcharts-react-official'

interface Props {
  year: string;
  checkList: any[];
}

const colors = [
  '#DB6BCF',
  '#E2E22E',
  '#21A97A',
  '#EA400F',
  '#1F3EEF',
  '#65D9EF',
  '#025DF4',
  '#FFA8A8',
  '#2391FF',
]

const CostAnalysis: FC<Props> = (props) => {
  const { year, checkList } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const CostAnalysisPieRef = useRef<any>()
  const CostAnalysisLineRef = useRef<any>()

  const renderPie = () => {
    const data = [
      { type: '分类一', value: 27 },
      { type: '分类二', value: 25 },
      { type: '分类三', value: 18 },
      { type: '分类四', value: 15 },
      { type: '分类五', value: 10 },
      { type: '其他', value: 5 },
    ];
    if (CostAnalysisPieRef.current) {
      CostAnalysisPieRef.current?.changeData(data)
      return
    }
    const piePlot = new Pie('CostAnalysisPie', {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.9,
      // innerRadius: 0.64,
      label: {
        type: 'inner',
        offset: '-30%',
        content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        style: {
          fontSize: 14,
          textAlign: 'center',
        },
      },
      interactions: [{ type: 'element-active' }],
      legend: {
        position: 'top',
      },
      color: colors,
      // @TODO 后续会换一种动画方式
      animation: {
        appear: {
          animation: 'path-in',
          duration: 1500,
        },
      },
    });
    CostAnalysisPieRef.current = piePlot
    piePlot.render();
  }

  const renderLine = () => {

    fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
      .then((res) => res.json())
      .then((data: any) => {

        if (CostAnalysisLineRef.current) {
          CostAnalysisLineRef.current?.changeData(data)
          return
        }

        const linePlot = new Line('CostAnalysisLine', {
          data,
          xField: 'year',
          yField: 'gdp',
          seriesField: 'name',
          yAxis: {
            label: {
              formatter: (v: any) => `${(v / 10e8).toFixed(1)} B`,
            },
          },
          legend: {
            position: 'top',
          },
          color: colors,
          // smooth: true,
          // @TODO 后续会换一种动画方式
          animation: {
            appear: {
              animation: 'path-in',
              duration: 1500,
            },
          },
        });
        CostAnalysisLineRef.current = linePlot
        linePlot.render();
      });
  }

  const fetchData = () => {
    // setLoading(true)
    renderPie()
    renderLine()
    // setTimeout(() => {
    //   setLoading(false)
    // }, 1000)
  }


  useEffect(() => {
    if (!year || !checkList) return
    fetchData()
  }, [year, checkList])

  return (
    <Card
      title={
        <Title title="费用分析" loading={loading} refresh={fetchData} />
      }
      headStyle={{
        padding: 0,
        margin: 0,
      }}
      loading={loading}
    >
      <Row>
        <Col span={8}>
          <div id="CostAnalysisPie"></div>
        </Col>
        <Col span={16}>
          <div id="CostAnalysisLine"></div>
        </Col>
        {/* <Col span={24}>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
        </Col> */}
      </Row>
    </Card>
  )
}

export default CostAnalysis
