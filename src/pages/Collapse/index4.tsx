/*
 * @creater: panan
 * @message: 输出产物
 * @since: 2024-02-04 16:43:23
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-03-06 14:22:49
 * @文件相对于项目的路径: /logic-umi/src/pages/Collapse/index4.tsx
 */
import React, { FC, useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
type Props = Record<string, any>

const data = [
  {
    title: 'group',
    description: "Ant Design 111"
  },
  {
    title: 'node selector',
    description: "Ant Design 111"
  },
  {
    title: 'annotations',
    description: "Ant Design 222"
  },
  {
    title: 'labels',
    description: "Ant Design 333"
  },
  {
    title: 'tolerations',
    description: "Ant Design 444"
  },
  {
    title: 'affinity',
    description: "Ant Design 555"
  },
];

const Item = Form.Item

const CollapseComponent: FC<Props> = () => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<boolean>(true)

  return (
    <Form form={form}>
      {
        data.map((item) => (
          <>
            <Item
              label={item?.title}
              name={item?.title}
              key={item?.title}
              initialValue={item?.description}
              labelCol={{ span: 3 }}
            >
              <Input
                placeholder={`请输入${item?.title}`}
                style={{ width: '300px' }}
                disabled={status}
              />
            </Item>
          </>
        ))
      }
      {
        status && (
          <Item
            key={'edit'}
            labelCol={{ span: 3 }}
          >
            <Button type='primary' onClick={() => setStatus(!status)}>编辑</Button>
          </Item>
        )
      }
      {
        !status && (
          <Item
            key={'confirm'}
            labelCol={{ span: 3 }}
          >
            <Button type='primary' danger onClick={() => setStatus(!status)} loading={loading}>确认</Button>
          </Item>
        )
      }
    </Form>
  )
}

export default CollapseComponent
