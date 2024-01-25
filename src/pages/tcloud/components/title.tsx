import { RedoOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC } from 'react'

interface Props {
  title: string;
  loading: boolean;
  refresh: () => void;
}

const Title: FC<Props> = ({ title, refresh, loading }) => {
  return (
    <Button type="text" loading={loading} onClick={refresh} icon={<RedoOutlined />}>
      <span style={{
        fontSize:'16px',
        fontWeight:500
      }}>{title}</span>
    </Button>
  )
}

export default Title