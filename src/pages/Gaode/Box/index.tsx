/*
 * @creater: panan
 * @message: 地图组件
 * @since: 2023-12-04 13:47:50
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-04 15:26:36
 * @文件相对于项目的路径: /logic-umi/src/pages/Gaode/Box/index.tsx
 */

import React, { FC, useEffect } from 'react'
import { IBox } from './type'
import AMapLoader from "@amap/amap-jsapi-loader";
import styles from './index.less'


const Box: FC<IBox> = ({ id }) => {

  let map = null as any;

  useEffect(() => {
    AMapLoader.load({
      key: "20dd5b16f9d55538324bd56e5338b4cf", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        map = new AMap.Map(id, {
          // 设置地图容器id
          viewMode: "3D", // 是否为3D地图模式
          zoom: 11, // 初始化地图级别
          center: [120.21201, 30.2084], // 初始化地图中心点位置
        });
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      map?.destroy();
    };
  }, []);

  return (
    <div
      id={id}
      className={styles.container}
      style={{ height: "800px" }}
    ></div>
  )
}

export default Box
