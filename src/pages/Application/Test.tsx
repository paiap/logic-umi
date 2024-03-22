/*
 * @creater: panan
 * @message: 组件测试
 * @since: 2024-03-13 19:16:58
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-03-13 19:37:48
 * @文件相对于项目的路径: /logic-umi/src/pages/Application/Test.tsx
 */

import { Button, Tag } from 'antd'
import React, { useEffect, useState } from 'react'

const Test = (props: {
  title: string
}) => {
  const { title } = props
  const [data, setData] = useState<string[]>([])
  const [show, setShow] = useState<boolean>(false)
  useEffect(() => {
    if (!title) return
    const data = title.split(',')
    setData(data)
    if (data.length > 4) {
      setShow(true)
      return
    }
    setShow(false)
  }, [title])
  return (
    <>
      {
        data.length <= 4 && data.map((item, index) => {
          return <Tag key={index} color="blue">{item}</Tag>
        })
      }
      {
        data.length > 4 && show && (
          <>
            {
              data.slice(0, 4).map((item, index) => {
                return <Tag key={index} color="blue" >{item}</Tag>
              })
            }
            <Button type="link" onClick={() => setShow(false)}>{`展开(${data?.length - 4})`}</Button>
          </>
        )
      }
      {
        data.length > 4 && !show && (
          <>
            {
              data.map((item, index) => {
                return <Tag key={index} color="blue">{item}</Tag>
              })
            }
            <Button type="link" onClick={() => setShow(true)}>收起</Button>
          </>
        )
      }
    </>
  )
}

export default Test
