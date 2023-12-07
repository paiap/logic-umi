/*
 * @creater: panan
 * @message: 测试调研组件
 * @since: 2023-11-20 14:36:53
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-06 10:49:10
 * @文件相对于项目的路径: /logic-umi/src/pages/Antv-l7/index.tsx
 */
import React, { FC, useEffect, useRef, useState } from 'react'
import {
  Scene,
  PointLayer,
  PolygonLayer,
  LineLayer,
  Source,
  Marker,
  MarkerLayer,
  Fullscreen,
  MouseLocation,
  Zoom,
  LayerPopup,
  MapTheme,
  Popup
} from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { data, RootObject } from './sandain'
import Sandian from './sandian';

const Text: FC<Record<string, any>> = () => {
  const [dataSource, setDataSource] = useState<RootObject[]>([])

  const newMarkerLayer = useRef(new MarkerLayer());

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (dataSource.length === 0) return
    render()
  }, [dataSource])

  /**
   * @function message: 调用接口
   * @return {*}
   */
  const fetchData = () => {
    setDataSource(data)
  }

  /**
   * @function message: addMarkers
   * @param {any} scene
   * @return {*}
   */
  const addMarkers = (scene: Scene) => {
    const settings = {
      cluster: true,
      clusterOption: {
        // method: 'min',
        element: (obj: RootObject) => {
          console.log(obj)
          newMarkerLayer.current.clear()
          // const { FullName, Latitude, Longitude } = obj
          // var el = document.createElement('div');
          // el.style.height = '25px';
          // el.style.lineHeight = '25px';
          // el.style.padding = '0px 10px';
          // el.style.borderRadius = '50px';
          // el.style.background = '#97D870';
          // el.textContent = '1'

          // const singleMarker = new Marker({
          //   color: 'red',
          //   extData: {
          //     FullName, Latitude, Longitude
          //   }
          // }).setLnglat({
          //   lng: Longitude,
          //   lat: Latitude
          // })
          // newMarkerLayer.current.addMarker(singleMarker);
          // scene.addMarkerLayer(newMarkerLayer.current);

          // singleMarker.on('mouseover', (e) => {
          //   console.log(e)
          // })
          // return el
        },
      },
    }
    const markerLayer = new MarkerLayer(settings);
    // 处理数据
    dataSource.forEach((item: RootObject) => {
      const { Latitude, Longitude } = item;
      const marker = new Marker({
        // 添加属性，看为节点id
        extData: {
          lng: Longitude,
          lat: Latitude,
          id: 1
        },
        color: 'red'
      }).setLnglat({
        lng: Longitude,
        lat: Latitude,
      });
      markerLayer.addMarker(marker);
    })
    scene.addMarkerLayer(markerLayer);

    scene.on('mousewheel', () => {
      const markers = markerLayer.getMarkers() as Marker[]
      // console.log(markers)
      markers.forEach(marker => {
      })
    })
  }

  /**
   * @function message: 全屏按钮展示
   * @param {any} scene
   * @return {*}
   */
  const full = (scene: Scene) => {
    const fullscreen = new Fullscreen({
      btnText: '全屏',
      exitBtnText: '退出全屏',
    });
    scene.addControl(fullscreen);
  }

  /**
   * @function message: 鼠标经纬度展示
   * @param {any} scene
   * @return {*}
   */
  const mouseL = (scene: Scene) => {
    const mouseLocation = new MouseLocation({
      transform: (position) => position
    });
    scene.addControl(mouseLocation);
  }

  /**
   * @function message: 实例化 Zoom 控件，可以在构造器中传入控件的配置
   * @param {any} scene
   * @return {*}
   */
  const createZoom = (scene: Scene) => {
    const zoom = new Zoom({
      position: 'topleft',
    });
    scene.addControl(zoom);
  }

  /**
   * @function message: 主题选择
   * @param {any} scene
   * @return {*}
   */
  const theme = (scene: Scene) => {
    const mapTheme = new MapTheme({
      position: 'rightcenter'
    });
    scene.addControl(mapTheme);
  }

  /**
  * @function message: 渲染图表函数
  * @return {*}
  */
  const render = () => {
    const scene = new Scene({
      id: 'map',
      logoVisible: false,//关闭默认antv/l7的logo
      map: new GaodeMap({
        token: "20dd5b16f9d55538324bd56e5338b4cf",
        style: 'light',
        center: [120.21201, 30.2084],
        zoom: 11,
        pitch: 20,
        // plugin: ['AMap.ToolBar', 'AMap.LineSearch'],
      }),
    });

    scene.addImage(
      'marker',
      'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*BJ6cTpDcuLcAAAAAAAAAAABkARQnAQ'
    );

    scene.on('loaded', () => {
      // 全屏
      full(scene)

      // 鼠标经纬度
      mouseL(scene)

      // 实例化 Zoom 控件，可以在构造器中传入控件的配置
      createZoom(scene)

      // 主题选择
      theme(scene)

      // 添加点数据
      addMarkers(scene);

      // 渲染scene
      scene.render();
    });
  }


  return (
    <>
      <div style={{ minHeight: '700px', justifyContent: 'center', position: 'relative' }} id="map" />
      {/* <Sandian /> */}
    </>
  )
}

export default Text
