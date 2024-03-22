/*
 * @creater: panan
 * @message: 权限示例
 * @since: 2023-11-18 19:21:55
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-03-14 11:14:43
 * @文件相对于项目的路径: /logic-umi/src/pages/Application/index.tsx
 */
import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button, Select } from 'antd';
import React from 'react';
import Test from './Test';

const options = [
  {
    label: 'panan',
    value: 'panan'
  },
  {
    label: 'wangkun',
    value: 'wangkun'
  },
  {
    label: 'liusheng',
    value: 'liusheng'
  },
  {
    label: 'wanghaibo',
    value: 'wanghaibo'
  },
  {
    label: 'mojiayong',
    value: 'mojiayong'
  },
]

const AccessPage: React.FC = () => {
  const access = useAccess();
  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <Access accessible={access.canSeeAdmin}>
        <Button>只有 Admin 可以看到这个按钮</Button>
        <Select
          style={{ width: '300px' }}
          showSearch
          placeholder="请选择"
          options={options}
          mode='tags'
          filterOption={(inputValue: string, option: any) => option?.label.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0}
          onChange={(value) => console.log('value', value)}
        />
        {/* <div style={{ width: '300px' }}>
          <Test
            title='panan,wangkun,sunlinqing,wanghaibo,mojiayong,liangjiahao,zhangyue'
          />
        </div> */}
      </Access>

    </PageContainer>
  );
};

export default AccessPage;
