/*
 * @creater: panan
 * @message: antv/g6调研
 * @since: 2023-12-06 14:12:29
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-08 17:32:36
 * @文件相对于项目的路径: /logic-umi/src/pages/antv-g6/Fruchterman备份.tsx
 */

import { Edge, Graph, Node, Tooltip } from '@antv/g6';
import React, { FC, useEffect, useRef, useState } from 'react'
import { mockData } from './mock'
import { Button, Col, Input, Row, Select, Space, message } from 'antd';
import Poup from './Poup';
import { Form } from 'antd';
import { createRoot } from 'react-dom/client';


const colors = [
  '#BDD2FD',
  '#BDEFDB',
  '#C2C8D5',
  '#FBE5A2',
  '#F6C3B7',
  '#B6E3F5',
  '#D3C6EA',
  '#FFD8B8',
  '#AAD8D8',
  '#FFD6E7',
];
const strokes = [
  '#5B8FF9',
  '#5AD8A6',
  '#5D7092',
  '#F6BD16',
  '#E8684A',
  '#6DC8EC',
  '#9270CA',
  '#FF9D4D',
  '#269A99',
  '#FF99C3',
];


const AntvG6: FC<Record<string, any>> = () => {
  const [data, setData] = useState<any>()
  const nodeRef = useRef<Graph>()
  const clusterMapRef = useRef<Map<string, any>>()
  const [form] = Form.useForm()


  useEffect(() => {
    if (nodeRef.current) {
      nodeRef.current.read(mockData)
      return
    }

    const nodes = mockData.nodes;
    const clusterMap = new Map();
    let clusterId = 0;
    nodes.forEach((node: any) => {
      if (node.cluster && clusterMap.get(node.cluster) === undefined) {
        clusterMap.set(node.cluster, clusterId);
        clusterId++;
      }
      const cid = clusterMap.get(node.cluster);
      if (!node.style) {
        node.style = {};
      }
      node.style.fill = colors[cid % colors.length];
      node.style.stroke = strokes[cid % strokes.length];
    });
    clusterMapRef.current = clusterMap;

    const container = document.getElementById('container');
    if (container) {
      const width = container.scrollWidth;
      const height = container.scrollHeight || 800;

      const graph = new Graph({
        container: 'container',
        width,
        height,
        plugins: [tooltip],
        modes: {
          default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
        },
        layout: {
          // type: 'fruchterman',
          // speed: 30, // 可选
          // clustering: true, //开启聚类
          // clusterGravity: 10, // 可选
          // // maxIteration: 2000, // 可选，迭代次数
          // workerEnabled: true, // 可选，开启 web-worker
          // gpuEnabled: true, // 可选，开启 GPU 并行计算，G6 4.0 支持

          type: 'force',// 指定为力导向布局
          linkDistance: 50,// 指定边距离为100
          preventOverlap: true,// 防止节点重叠
          nodeStrength: -20,
          edgeStrength: 0.1,
        },
        animate: true,
        defaultEdge: {
          style: {
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              fill: '#e2e2e2',
            },
          },
        },
      });
      graph.data(mockData);
      graph.render();
      nodeRef.current = graph

      addListener(graph)

      if (typeof window !== 'undefined')
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return;
          if (!container || !container.scrollWidth || !container.scrollHeight) return;
          graph.changeSize(container.scrollWidth, container.scrollHeight);
        };

    }
  }, [])

  const addListener = (graph: Graph) => {
    // graph.on('node:click', (ev) => {
    //   const node = ev.item as Node; // 被点击的节点元素
    //   console.log(node.getID())
    // });

    graph.on('node:mousemove', (ev) => {
      const node = ev.item as Node; // 被点击的节点元素
      setData(node.getModel())
      // const shape = ev.target; // 被点击的图形，可根据该信息作出不同响应，以达到局部响应效果
      graph.updateItem(node, {
        style: {
          fill: '#6DC8EC',
        },
      })

      const inEdges = node.getInEdges() as Edge[]
      const outEdges = node.getOutEdges() as Edge[]
      // 所有入边
      inEdges.forEach((inEdge: Edge) => {
        const inNode = inEdge.getSource()
        // console.log('指向该节点的节点', inNode)
      })

      // 所有出边
      outEdges.forEach((outEdge: Edge) => {
        const outNode = outEdge.getTarget() as Node
        // console.log('该节点指向的节点', outNode)
        graph.updateItem(outNode, {
          style: {
            fill: '#9270CA'
          }
        })
      })
      // 获取节点数据源
    });

    graph.on('node:mouseout', (ev) => {
      const node = ev.item as Node; // 被点击的节点元素
      // const shape = ev.target; // 被点击的图形，可根据该信息作出不同响应，以达到局部响应效果
      const { cluster } = node.getModel()
      if (!clusterMapRef.current) return
      const colorId = clusterMapRef.current.get(cluster as string)
      // node.style.fill = colors[cid % colors.length];
      // node.style.stroke = strokes[cid % strokes.length];
      graph.updateItem(node, {
        style: {
          fill: colors[colorId % colors.length],
          stroke: strokes[colorId % strokes.length]
        },
      })


      const inEdges = node.getInEdges() as Edge[]
      const outEdges = node.getOutEdges() as Edge[]
      // 所有入边
      inEdges.forEach((inEdge: Edge) => {
        const inNode = inEdge.getSource()
      })

      // 所有出边
      outEdges.forEach((outEdge: Edge) => {
        const outNode = outEdge.getTarget() as Node
        const { cluster } = outNode.getModel()
        if (!clusterMapRef.current) return
        const colorId = clusterMapRef.current.get(cluster as string)
        graph.updateItem(outNode, {
          style: {
            fill: colors[colorId % colors.length],
            stroke: strokes[colorId % strokes.length]
          },
        })
      })
    });
  }

  const handleSearch = () => {
    const formData = form.getFieldsValue()
    console.log(formData)
  }

  const tooltip = new Tooltip({
    offsetX: 10,
    offsetY: 10,
    // v4.2.1 起支持配置 trigger，click 代表点击后出现 tooltip。默认为 mouseenter
    trigger: 'click',
    // the types of items that allow the tooltip show up
    // 允许出现 tooltip 的 item 类型
    itemTypes: ['node', 'edge'],
    // custom the tooltip's content
    // 自定义 tooltip 内容
    getContent: (e: any) => {
      const outDiv = document.createElement('div');
      const root = createRoot(outDiv);
      // 挂载弹窗组件
      root.render(<GetComp item={e} />)
      return outDiv;
    },
  });

  // 弹窗组件
  const GetComp = ({ item }: any): React.ReactElement<HTMLDivElement> => {
    return (
      <>
        <h4>Content</h4>
        <ul>
          <li>Type: ${item.item.getType()}</li>
        </ul>
        <ul>
          <li>Label: ${item.item.getModel().label || item.item.getModel().id}</li>
        </ul>
        <Button type='primary' onClick={() => message.info(`antd组件使用${item.item.getModel().label || item.item.getModel().id}`)}>antd组件使用</Button>
      </>
    )
  }

  return (
    <Row gutter={[10, 10]}>
      <Col span={24}>
        <Form form={form}>
          <Space>
            <Form.Item name='cluster'>
              <Select
                style={{ minWidth: '200px' }}
                placeholder='集群搜索'
                options={[]}
              />
            </Form.Item>
            <Form.Item
              name='name'
            >
              <Input
                style={{ minWidth: '200px' }}
                placeholder='租户名搜索'
              />
            </Form.Item>
            <Form.Item name='nameAdmin'>
              <Input
                style={{ minWidth: '200px' }}
                placeholder='租户名管理员搜索'
              />
            </Form.Item>
            <Form.Item name='select'>
              <Select
                style={{ minWidth: '200px' }}
                placeholder='按条件搜索'
                options={[]}
              />
            </Form.Item>
            <Form.Item>
              <Button type='primary' onClick={handleSearch}>搜索</Button>
            </Form.Item>
          </Space>
        </Form>
      </Col>
      <Col span={24}>
        <div id="container" ></div>
      </Col>
      {/* <Col span={4}>
        <Poup data={data} />
      </Col> */}
    </Row>
  )
}

export default AntvG6