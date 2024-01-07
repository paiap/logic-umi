import { Spin } from 'antd';
import React, { FC, useEffect, useState } from 'react'
// type BeardDetailProps = Record<string, any>
interface BeardDetailProps {
  item: any;
}

const BeardDetail: FC<BeardDetailProps> = (props) => {
  const { item } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [dataSource, setDataSource] = useState<any>()

  const fetchFloder = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    if (!item) return
    if (item.isLeaf) {
      setDataSource(item)
      fetchFloder()
    } else {
      setDataSource(item)
    }
    console.log('item', item)
  }, [item])


  return (

    <Spin spinning={loading}>
      <div style={{
        padding: '10px',
        width: '100%',
        height: '600px',
      }}>
        {
          dataSource?.isLeaf && (
            <div>txt文本文件</div>
          )
        }
        {
          !dataSource?.isLeaf && (
            <div>文件夹</div>
          )
        }
      </div>
    </Spin>
  )
}

export default BeardDetail



