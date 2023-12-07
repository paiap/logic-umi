/*
 * @creater: panan
 * @message: antv/g6调研
 * @since: 2023-12-06 14:12:29
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-07 11:19:41
 * @文件相对于项目的路径: /logic-umi/src/pages/antv-g6/index.tsx
 */

import G6, { Graph, Item, Node, Edge, Tooltip } from '@antv/g6';
import React, { FC, useEffect, useRef } from 'react'
import { Button, message } from 'antd';
import { data } from './mock'
import { createRoot } from "react-dom/client";

const AntvG6: FC<Record<string, any>> = () => {
  const nodeRef = useRef<Graph>()

  const main = (graph: Graph) => {
    const remoteData = data

    const nodes = remoteData.nodes;
    const edges = remoteData.edges;
    nodes.forEach((node: any) => {
      if (!node.style) {
        node.style = {};
      }
      node.size = node.label > 20 ? node.label : 20;
      node.style.lineWidth = 2;
      node.style.stroke = '#6D9CF9';
      node.style.fill = '#C6E5FF';
      node.labelCfg = { ...node.labelCfg, fill: '#000' }
      // node.label = 'panan'
    });
    edges.forEach((edge: any) => {
      if (!edge.style) {
        edge.style = {};
      }
      edge.style.lineWidth = edge.weight;
      edge.style.opacity = 0.6;
      edge.style.stroke = '#E2E2E2';
    });

    graph.data(remoteData as any);
    graph.render();

    // 监听鼠标进入节点
    graph.on('node:mouseenter', (e: any) => {
      const nodeItem = e.item;
      // 设置目标节点的 hover 状态 为 true
      graph.setItemState(nodeItem, 'hover', true);
    });
    // 监听鼠标离开节点
    graph.on('node:mouseleave', (e: any) => {
      const nodeItem = e.item;
      // 设置目标节点的 hover 状态 false
      graph.setItemState(nodeItem, 'hover', false);
    });
    // 监听鼠标点击节点
    graph.on('node:click', (e: any) => {
      // 先将所有当前有 click 状态的节点的 click 状态置为 false
      const clickNodes = graph.findAllByState('node', 'click');
      clickNodes.forEach((cn: any) => {
        graph.setItemState(cn, 'click', false);
      });
      const nodeItem = e.item;
      // 设置目标节点的 click 状态 为 true
      graph.setItemState(nodeItem, 'click', true);
    });
    // 监听鼠标点击节点
    graph.on('edge:click', (e: any) => {
      // 先将所有当前有 click 状态的边的 click 状态置为 false
      const clickEdges = graph.findAllByState('edge', 'click');
      clickEdges.forEach((ce: any) => {
        graph.setItemState(ce, 'click', false);
      });
      const edgeItem = e.item;
      // 设置目标边的 click 状态 为 true
      graph.setItemState(edgeItem, 'click', true);
    });
  };

  const addListener = (graph: Graph) => {
    graph.on('node:click', (ev) => {
      const node = ev.item as Node; // 被点击的节点元素
      // const shape = ev.target; // 被点击的图形，可根据该信息作出不同响应，以达到局部响应效果
      // ... do sth

      // Node: getModel() 获取节点数据源
      // Node: getEdges() 获取节点的边数据源
      // Node: getInEdges() 获取节点的入边数据源

      // 获取节点数据源
      console.log(node.getModel())
    });

    // graph.on('edge:click', (ev) => {
    //   const edge = ev.item; // 被点击的边元素
    //   const shape = ev.target; // 被点击的图形，可根据该信息作出不同响应，以达到局部响应效果
    //   // ... do sth
    // });

    // graph.on('combo:click', (ev) => {
    //   const combo = ev.item; // 被点击 combo 元素
    //   const shape = ev.target; // 被点击的图形，可根据该信息作出不同响应，以达到局部响应效果
    //   // ... do sth
    // });
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

  useEffect(() => {
    if (nodeRef.current) {
      nodeRef.current.read(data as any)
      return
    }

    const container = document.getElementById('mountNode');
    if (container) {
      const width = container.scrollWidth;
      const height = container.scrollHeight || 800;
      const graph = new Graph({
        container: container, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: width, // Number，必须，图的宽度
        height: height, // Number，必须，图的高度
        animate: true, // Boolean，可选，全局变化时否使用动画过渡

        plugins: [tooltip],
        // 布局
        layout: {
          // type: 'fruchterman',
          // // gravity: 20, // 可选
          // // clustering: true, // 可选
          // speed: 50, // 可选
          // // clusterGravity: 30, // 可选
          // // maxIteration: 2000, // 可选，迭代次数
          // workerEnabled: true, // 可选，开启 web-worker
          // gpuEnabled: true, // 可选，开启 GPU 并行计算，G6 4.0 支持

          type: 'force',// 指定为力导向布局
          linkDistance: 50,// 指定边距离为100
          preventOverlap: true,// 防止节点重叠
          nodeStrength: -20,
          edgeStrength: 0.1,
        },

        // 节点默认配置
        defaultNode: {
          labelCfg: {
            style: {
              fill: '#000',
            },
          },
        },
        // 边默认配置
        defaultEdge: {
          labelCfg: {
            autoRotate: true,
          },
        },
        // 节点在各状态下的样式
        nodeStateStyles: {
          // hover 状态为 true 时的样式
          hover: {
            fill: 'lightsteelblue',
          },
          // click 状态为 true 时的样式
          // click: {
          //   stroke: '#efefef',
          //   lineWidth: 3,
          // },
        },
        // 边在各状态下的样式
        edgeStateStyles: {
          // click 状态为 true 时的样式
          // click: {
          //   stroke: 'steelblue',
          // },
        },

        // 内置交互
        modes: {
          default: ['drag-canvas', 'zoom-canvas'],
        },

        // 复杂的布局系统会打破适配的规则，反而会造成更多的困扰。让我们将相关的适配代码变为注释
        // fitView: true,//设置是否将图适配到画布中；
        // fitViewPadding: 20 ,//画布上四周的留白宽度:[20, 40, 50, 20]
      });

      graph.data(data as any); // 读取 Step 2 中的数据源到图上

      // 布局将在调用  graph.render() 时执行计算。
      graph.render(); // 渲染图
      nodeRef.current = graph

      main(graph)
      addListener(graph)

      if (typeof window !== 'undefined')
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return;
          if (!container || !container.scrollWidth || !container.scrollHeight) return;
          graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
    }
  }, [])
  return (
    <div id="mountNode" ></div>
  )
}

export default AntvG6