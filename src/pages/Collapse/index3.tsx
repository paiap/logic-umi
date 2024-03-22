/*
 * @creater: panan
 * @message: 输出产物
 * @since: 2024-02-04 16:43:23
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-02-05 13:52:59
 * @文件相对于项目的路径: /logic-umi/src/pages/Collapse/index3.tsx
 */
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Collapse, Form, Input, Row, Select, Space, Switch } from 'antd'
import React, { FC, useState } from 'react'
type Props = Record<string, any>

const Panel = Collapse.Panel
const List = Form.List
const Item = Form.Item

const CollapseComponent: FC<Props> = () => {
  const [status, setStatus] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  return (
    <Form form={form}>
      <Collapse
        defaultActiveKey={'1'}
        style={{ marginTop: '16px' }}
      >
        <Panel
          header='输出产物'
          key={'1'}
        >
          <List name={'list'}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({
                  key,
                  name,
                  ...resetField
                },) => (
                  <div style={{ display: 'flex' }} key={key}>
                    <Row gutter={16} style={{
                      flex: 1,
                      // marginTop: '8px',
                      // marginBottom: '8px',
                      borderRadius: '4px',
                      // border: '1px solid rgba(0,0,0,0.04)',
                    }}>
                      <Col span={12}>
                        <Item
                          {...resetField}
                          label={'名称'}
                          name={[name, 'name']}
                          rules={[{
                            required: true,
                            message: '请输入名称'
                          }]}
                        >
                          <Input placeholder='请输入名称' disabled={status}/>
                        </Item>
                      </Col>
                      <Col span={12}>
                        <Item
                          {...resetField}
                          label={'路径'}
                          name={[name, 'path']}
                          rules={[{
                            required: true,
                            message: '请输入路径'
                          }]}
                        >
                          <Input placeholder='请输入路径' disabled={status}/>
                        </Item>
                      </Col>
                    </Row>
                    <Space style={{ margin: '-16px 0 0 16px' }}>
                      <Button disabled={status} shape='circle' danger icon={<DeleteOutlined />} onClick={remove.bind(this, name)} />
                    </Space>
                  </div>
                ))}
                <Item>
                  <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />} disabled={status}>添加产物</Button>
                </Item>
              </>
            )}
          </List>
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
                <Button type='primary' danger onClick={() => setStatus(!status)} loading={loading}>提交</Button>
              </Item>
            )
          }
        </Panel>
      </Collapse>

    </Form>
  )
}

export default CollapseComponent
