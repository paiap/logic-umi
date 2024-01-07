import React, { FC, useEffect, useState } from 'react';
import { Tree } from 'antd';

const { DirectoryTree } = Tree;

interface RootObject {
  type: string | null;
  size: number;
  show_size: string | null;
  path: string | null;
  name: string | null;
  file_count: number | null;
  is_directory: boolean;
  key?: string;
  title?: string;
  isLeaf?: boolean;
  children?: RootObject[];
}

const initData: RootObject = {
  type: '111',
  size: 155846124,
  show_size: '148.63MB',
  path: '/aaa/bbb',
  name: 'floder1',
  file_count: 6,
  is_directory: true,
}

const childData: RootObject[] = [
  {
    type: '222',
    size: 1556124,
    show_size: '14.63MB',
    path: '/aaa/bbb/ccc',
    name: 'floder1',
    file_count: null,
    is_directory: false,
  }
]

interface AppAntdProps {
  setItem: any;
}

const AppAntd: FC<AppAntdProps> = (props: any) => {
  const { setItem } = props
  const [treeData, setTreeData] = useState<RootObject[]>([]);

  const transData = (data: RootObject[]): RootObject[] => {
    const current = data.map((item: RootObject) => {
      return {
        ...item,
        key: item.path,
        title: item.name,
        isLeaf: !item.is_directory,
      }
    })

    return current as RootObject[]
  }

  useEffect(() => {
    const newData = transData([initData])
    setTreeData(newData)
  }, [])

  const loadData = (treeNode: any): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { eventKey } = treeNode.props;
        const updatedTreeData = treeData.map((node) => {
          if (node.key === eventKey && !node.children) {
            return {
              ...node,
              children: transData(childData),
            };
          }
          return node;
        });
        setTreeData(updatedTreeData);
        resolve();
      }, 1000);
    });
  };

  const renderTreeNode = (node: RootObject): React.ReactNode => {
    if (node.children) {
      return (
        <Tree.TreeNode key={node.key} title={node.title} isLeaf={node.isLeaf}>
          {node.children.map((childNode) => renderTreeNode(childNode))}
        </Tree.TreeNode>
      );
    }
    return <Tree.TreeNode key={node.key} title={node.title} isLeaf={node.isLeaf} />;
  };

  return (
    <DirectoryTree
      loadData={loadData}
      showLine
      onSelect={(selectedKeys: any[], { node }) => {
        setItem(node)
      }}
    >
      {treeData.map((node) => renderTreeNode(node))}
    </DirectoryTree>
  );
};

export default AppAntd;