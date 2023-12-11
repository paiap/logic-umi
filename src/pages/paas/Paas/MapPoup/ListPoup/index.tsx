/*
 * @creater: panan
 * @message: ListPoup
 * @since: 2023-12-07 19:36:48
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-10 11:29:02
 * @文件相对于项目的路径: /logic-umi/src/pages/paas/Paas/MapPoup/ListPoup/index.tsx
 */
import React, { FC, useEffect, useState } from 'react'
import { ClusterCode } from '../../sandain'
import { Button, Card, Col, Row } from 'antd'
import { history } from 'umi';

interface IListPoup {
  item: ClusterCode | null
}

const DataMap = {
  basicInfo: {
    clusterCode: '集群Code:',
    clusterName: '集群名称:',
    clusterState: '集群状态:',
    clusterLevel: '集群等级:',
    clusterDesc: '集群描述:',
    clusterLoc: '集群地址:',
  },
  resourceInfo: {
    podNum: "pod数量:",
    nodeNum: "节点数量:",
    namespaceNum: "命名空间数量:",
    workloadNum: "工作负载数量:",
  },
  capacityInfo: {
    cpuUsageAvg: "CPU平均利用率:",
    cpuUsageLimit: "CPU峰值利用率:",
    cpuCapUseful: "CPU可用容量:",
    cpuCapSum: "CPU可用容量:",
    memUsageAvg: "内存平均利用率:",
    memUsageLimit: "内存峰值利用率:",
    memCapUseful: "内存可用容量:",
    memCapSum: "内存总容量:",
    gpuUsageAvg: "GPU平均利用率:",
    gpuUsageLimit: "GPU峰值利用率:",
    gpuCapUseful: "GPU可用容量:",
    gpuCapSum: "GPU可用容量:",
  },
}

const ListPoup: FC<IListPoup> = ({ item }) => {
  const [dataSource, setDataSource] = useState<ClusterCode>()

  useEffect(() => {
    if (!item) return
    setDataSource(item)
  }, [item])

  const handleToDetail = () => {
    console.log(item)
    history.push(`/paas-l7/antv-g6`,{
      ...item
    })
  }
  return (
    <div style={{ width: '400px' }}>
      <Row gutter={[3, 3]} >
        <Col span={24}>
          <Card
            title='基本信息'
            extra={(
              <Button type='primary' onClick={handleToDetail}>详情</Button>
            )}
            bordered={false}
            bodyStyle={{
              padding: '5px',
            }}
            headStyle={{
              padding: '0px 5px',
              minHeight: '40px'
            }}
          >
            <Row gutter={[3, 3]} >
              {
                dataSource?.basicInfo && Object.entries(dataSource?.basicInfo).map(([key, value]) => {

                  const text = <span>{DataMap?.basicInfo[key as keyof typeof DataMap.basicInfo]}</span>
                  return (
                    <>
                      <Col span={11} offset={1}>
                        {text}
                      </Col>
                      <Col span={12}>
                        <span>{value as string}</span>
                      </Col>
                    </>
                  )
                })
              }
            </Row>
          </Card>
        </Col>

        <Col span={24}>
          <Card
            title='资源信息'
            bordered={false}
            bodyStyle={{
              padding: '5px',
            }}
            headStyle={{
              padding: '0px 5px',
              minHeight: '40px'
            }}
          >
            <Row gutter={[3, 3]} >
              {
                dataSource?.resourceInfo && Object.entries(dataSource?.resourceInfo).map(([key, value]) => {
                  return (
                    <>
                      <Col span={11} offset={1}>
                        <span>{DataMap?.resourceInfo[key as keyof typeof DataMap.resourceInfo]}</span>
                      </Col>
                      <Col span={12}>
                        <span>{value as string}</span>
                      </Col>
                    </>
                  )
                })
              }
            </Row>
          </Card>
        </Col>


        <Col span={24}>
          <Card
            title='容量信息'
            bordered={false}
            bodyStyle={{
              padding: '5px',
            }}
            headStyle={{
              padding: '0px 5px',
              minHeight: '40px'
            }}
          >
            <Row gutter={[3, 3]} >
              <Col span={5} offset={1}>
                <span>平均利用率:</span>
              </Col>
              <Col span={6}>
                <span>cpu:{dataSource?.capacityInfo.cpuUsageAvg}</span>
              </Col>
              <Col span={6}>
                <span>内存:{dataSource?.capacityInfo.memUsageAvg}</span>
              </Col>
              <Col span={6}>
                <span>GPU:{dataSource?.capacityInfo.gpuUsageAvg}</span>
              </Col>
              <Col span={5} offset={1}>
                <span>峰值利用率:</span>
              </Col>
              <Col span={6}>
                <span>cpu:{dataSource?.capacityInfo.cpuUsageLimit}</span>
              </Col>
              <Col span={6}>
                <span>内存:{dataSource?.capacityInfo.memUsageLimit}</span>
              </Col>
              <Col span={6}>
                <span>GPU:{dataSource?.capacityInfo.gpuUsageLimit}</span>
              </Col>
              <Col span={5} offset={1}>
                <span>可用容量:</span>
              </Col>
              <Col span={6}>
                <span>cpu:{dataSource?.capacityInfo.cpuCapUseful}</span>
              </Col>
              <Col span={6}>
                <span>内存:{dataSource?.capacityInfo.memCapUseful}</span>
              </Col>
              <Col span={6}>
                <span>GPU:{dataSource?.capacityInfo.gpuCapUseful}</span>
              </Col>
              <Col span={5} offset={1}>
                <span>总容量:</span>
              </Col>
              <Col span={6}>
                <span>cpu:{dataSource?.capacityInfo.cpuCapSum}</span>
              </Col>
              <Col span={6}>
                <span>内存:{dataSource?.capacityInfo.memCapSum}</span>
              </Col>
              <Col span={6}>
                <span>GPU:{dataSource?.capacityInfo.gpuCapSum}</span>
              </Col>
            </Row>
          </Card>
        </Col>


      </Row>
    </div>
  )
}

export default ListPoup