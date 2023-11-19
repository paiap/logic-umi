import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Card, Col, Row, Space } from 'antd';
import styles from './index.less';
import react, { useEffect } from 'react';

const data = [
  {
    id: 1,
    name: '股票1',
    code: '股票代码'
  },
  {
    id: 2,
    name: '股票2',
    code: '股票代码'
  },
  {
    id: 3,
    name: '股票3',
    code: '股票代码'
  },
  {
    id: 4,
    name: '股票4',
    code: '股票代码'
  },
  {
    id: 5,
    name: '股票5',
    code: '股票代码'
  },
  {
    id: 6,
    name: '股票6',
    code: '股票代码'
  },
  {
    id: 7,
    name: '股票7',
    code: '股票代码'
  },
  {
    id: 8,
    name: '股票8',
    code: '股票代码'
  }
]

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    <PageContainer ghost>
      <div className={styles.applications}>
        {
          data.map(item => (
            <Card
              key={item.id}
              className={styles.item}
              title={item.name}
              bordered={true}
            >
              {item.code}
              <br />
              <br />
              <Space >
                <Button type='link' color='blue'>查看详情</Button>
                <Button type='link' danger>删除</Button>
              </Space>
            </Card>
          ))
        }
      </div>
    </PageContainer>
  );
};

export default HomePage;