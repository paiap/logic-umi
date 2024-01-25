import { Col, Row } from 'antd'
import React, { FC } from 'react'
import DetailPie from './detailPie'
import DetailTable from './detailTable'
import DetailLine from './detailLine'

interface Props {
  year: string | undefined;
  checkList: any[] | undefined;
  date: string[] | undefined;
  num?: number;
}

const TabItems: FC<Props> = (props) => {
  return (
    <Row>
      <Col span={8}>
        <DetailPie {...props} />
      </Col>
      <Col span={16}>
        <DetailTable {...props} />
      </Col>
      <Col span={24}>
        <DetailLine {...props} />
      </Col>
    </Row>
  )
}

export default TabItems