import React, { FC } from 'react'
import MyProTable from '@/components/MyProtable'
import type { ProColumns } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag, message } from 'antd';
import { TableDropdown } from '@ant-design/pro-components';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import request from 'umi-request';


type isPackage = {
  [key: string]: any
}

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const Package: FC<isPackage> = () => {

  // 表格和search配置信息
  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      copyable: true,
      ellipsis: true,
      tip: '标题过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      // disable: true,
      title: '状态',
      dataIndex: 'state',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        all: { text: '超长'.repeat(50) },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
          // disabled: true,//是否禁用
        },
        processing: {
          text: '解决中',
          status: 'Processing',
        },
      },
    },
    {
      // disable: true,//是否可配置
      title: '标签',
      dataIndex: 'labels',
      search: false,//是否显示在search组件中
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space>
          {record.labels.map(({ name, color }) => (
            <Tag color={color} key={name}>
              {name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'created_at',
      valueType: 'date',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '更新时间',
      key: 'updateTime',
      dataIndex: 'updated_at',
      valueType: 'date',
      hideInSearch: true,//是否展示在table中
      // hideInTable: true,//是否展示在table中
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        // <a
        //   key="editable"
        //   onClick={() => {
        //     action?.startEditable?.(record.id);
        //   }}
        // >
        //   编辑
        // </a>,
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>,
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="copy">
          复制
        </a>,
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="delete">
          删除
        </a>,
      ],
    },
  ];

  // 自定义右上方配置信息
  const handlerBar = () => {
    return (
      [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            message.success('新建成功')
          }}
          type="primary"
        >
          新建
        </Button>,
      ]
    )
  }

  // 接口信息
  const getTenantData = (params:any) => {
    return request('https://proapi.azurewebsites.net/github/issues', {
      params,
    })
  }

  // 其他属性，参考protable
  const otherstyle = {
    
  }

  return (
    <MyProTable
      columns={columns}
      // span={8}
      title="自定义表格"
      requestData={getTenantData}
      toolBarRender={handlerBar}
      otherstyle={otherstyle}
    />
  )
} 

export default Package