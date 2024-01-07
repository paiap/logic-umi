/*
 * @creater: panan
 * @message: beard
 * @since: 2024-01-03 21:18:40
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-01-03 21:21:31
 * @文件相对于项目的路径: /logic-umi/src/pages/beard/index.tsx
 */

import React, { FC, useEffect, useState } from 'react'
import AppAntd from './antd'
import { Col, Row } from 'antd'
import BeardDetail from './beardDetail'
type BeardProps = Record<string, any>

const Beard: FC<BeardProps> = () => {
  const [item, setItem] = useState<any>()
  return (
    <Row style={{
      height: '600px',
      width: '800px',
      overflow: 'auto',
      backgroundColor: '#fff',
      margin: 'auto'
    }}>
      <Col span={6} >
        <AppAntd setItem={setItem}/>
      </Col>
      <Col span={18}>
        <BeardDetail item={item} />
      </Col>
    </Row>
  )
}

export default Beard