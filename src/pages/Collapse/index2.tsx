/*
 * @creater: panan
 * @message: 参数设置
 * @since: 2024-02-04 19:42:59
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-02-05 14:10:01
 * @文件相对于项目的路径: /logic-umi/src/pages/Collapse/index2.tsx
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
      >
        <Panel
          header='参数设置'
          key={'1'}
        >
          <Item>
            <Collapse
              defaultActiveKey={'1'}
              style={{ marginTop: '16px' }}
            >
              <Panel
                header='参数'
                key={'1'}
              >
                <List name={'params'}>
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
                            <Col span={8}>
                              <Item
                                {...resetField}
                                label={'key'}
                                name={[name, 'key']}
                                rules={[{
                                  required: true,
                                  message: '请输入key'
                                }]}
                              >
                                <Input placeholder='key' disabled={status} />
                              </Item>
                            </Col>
                            <Col span={8}>
                              <Item
                                {...resetField}
                                label={'value'}
                                name={[name, 'value']}
                                rules={[{
                                  required: true,
                                  message: '请输入value'
                                }]}
                              >
                                <Input placeholder='请输入value' disabled={status} />
                              </Item>
                            </Col>
                            <Col span={8}>
                              <Item
                                {...resetField}
                                label={'remarks'}
                                name={[name, 'remarks']}
                                rules={[{
                                  required: true,
                                  message: '请输入remarks'
                                }]}
                              >
                                <Input.TextArea
                                  placeholder='请输入remarks'
                                  autoSize={{
                                    minRows: 2,
                                    maxRows: 2
                                  }}
                                  disabled={status}
                                />
                              </Item>
                            </Col>
                          </Row>
                          <Space style={{ margin: '-16px 0 0 16px' }}>
                            <Button disabled={status} shape='circle' icon={<DeleteOutlined />} onClick={remove.bind(this, name)} />
                          </Space>
                        </div>
                      ))}
                      <Item>
                        <Button disabled={status} type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>添加参数</Button>
                      </Item>
                    </>
                  )}
                </List>
              </Panel>
            </Collapse>
            <Collapse
              defaultActiveKey={'1'}
              style={{ marginTop: '16px' }}
            >
              <Panel
                header='环境变量'
                key={'1'}
              >
                <List name={'environmentVariable'}>
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
                            // marginTop: '32px',
                            borderRadius: '4px',
                            // marginBottom: '8px',
                            // border: '1px solid rgba(0,0,0,0.04)'
                          }}>
                            <Col span={8}>
                              <Item
                                {...resetField}
                                label={'key'}
                                name={[name, 'key']}
                                rules={[{
                                  required: true,
                                  message: '请输入key'
                                }]}
                              >
                                <Input placeholder='key' disabled={status} />
                              </Item>
                            </Col>
                            <Col span={8}>
                              <Item
                                {...resetField}
                                label={'value'}
                                name={[name, 'value']}
                                rules={[{
                                  required: true,
                                  message: '请输入value'
                                }]}
                              >
                                <Input placeholder='请输入value' disabled={status} />
                              </Item>
                            </Col>
                            <Col span={8}>
                              <Item
                                {...resetField}
                                label={'remarks'}
                                name={[name, 'remarks']}
                                rules={[{
                                  required: true,
                                  message: '请输入remarks'
                                }]}
                              >
                                <Input.TextArea
                                  placeholder='请输入remarks'
                                  autoSize={{
                                    minRows: 2,
                                    maxRows: 2
                                  }}
                                  disabled={status}
                                />
                              </Item>
                            </Col>
                          </Row>
                          <Space style={{ margin: '-16px 0 0 16px' }}>
                            <Button disabled={status} shape='circle' icon={<DeleteOutlined />} onClick={remove.bind(this, name)} />
                          </Space>
                        </div>
                      ))}
                      <Item>
                        <Button disabled={status} type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>添加环境变量</Button>
                      </Item>
                    </>
                  )}
                </List>
              </Panel>
            </Collapse>
          </Item>
          {
            status && (
              <Item
                key={'edit'}
              >
                <Button type='primary' onClick={() => setStatus(!status)}>编辑</Button>
              </Item>
            )
          }
          {
            !status && (
              <Item
                key={'confirm'}
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
