/*
 * @creater: panan
 * @message: 地图组件
 * @since: 2023-12-04 13:47:50
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-01-11 14:03:26
 * @文件相对于项目的路径: /logic-umi/src/pages/Gaode/Lixian/index.tsx
 */

import React, { FC, useEffect, useRef } from 'react'
import * as L from 'leaflet';
import { IBox } from './type'
import styles from './index.less';
import TestButton from './TestButton';
import { createRoot } from 'react-dom/client';
import 'leaflet/dist/leaflet.css';


const Lixian: FC<IBox> = ({ id }) => {

  const mapRef = useRef<any>();

  useEffect(() => {
    const cntainer = document.getElementById(id);
    if (mapRef.current && cntainer) {
      while (cntainer.firstChild) {
        cntainer.removeChild(cntainer.firstChild)
      }
    }

    const map = L.map(id, {
      minZoom: 3,
      maxZoom: 9
    }).setView([30, 120], 6);
    // 这里的图片少下几个层级作为调试用，然后使用你服务器的地址，使用网络资源加载
    L.tileLayer(`https://panan.xyz/10JQKA/mapabc/roadmap/{z}/{x}/{y}.png`, {
      minZoom: 3,
      maxZoom: 9,
      attribution: '<b>paas集群概览</b>'
    }).addTo(map);

    const greenIcon = L.icon({
      iconUrl: 'https://panan.xyz/10JQKA/marker.gif',
      iconSize: [40, 45], // size of the icon
    });

    const outDiv = document.createElement('div');
    const root = createRoot(outDiv);
    // 挂载弹窗组件
    root.render(<TestButton />)
    L.marker([30, 120], { icon: greenIcon }).bindPopup(outDiv).addTo(map);

    mapRef.current = map

    return () => {
      map.remove()
    }
  }, []);

  return (
    <div
      id={id}
      className={styles.container}
      style={{ height: "800px", width: '100%' }}
    ></div>
  )
}

export default Lixian
