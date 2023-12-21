/*
 * @creater: panan
 * @message: 111
 * @since: 2023-12-13 14:05:15
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-13 16:34:22
 * @文件相对于项目的路径: /logic-umi/src/pages/paas/Paas/Mainer2.tsx
 */
import type { LocationSearchOption } from '@antv/larkmap';
import { CustomControl, useScene, LocationSearch } from '@antv/larkmap';
import { message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

export default () => {
  const [location, setLocation] = useState('');
  const scene = useScene();

  // 同步地图中心点至 location 中
  // const syncMapCenter = useCallback(() => {
  //   if (scene) {
  //     const { lng, lat } = scene.getCenter();
  //     setLocation(`${lng},${lat}`);
  //   }
  // }, [scene]);

  // useEffect(() => {
  //   if (scene) {
  //     syncMapCenter();
  //     scene?.on('moveend', syncMapCenter);
  //     scene?.on('zoomend', syncMapCenter);
  //   }
  // }, [scene, syncMapCenter]);

  const onChange = (name?: string, item?: LocationSearchOption) => {
    if (item) {
      const { longitude, latitude } = item;
      scene.setZoomAndCenter(16, [longitude, latitude]);
      // setLocation(`${longitude},${latitude}`)
    }
  };

  return (
    <>
      <CustomControl position="topleft">
        <LocationSearch
          searchParams={{
            key: '3db09f8eeae01a8e1f79e2fa8e3af38a',
            // location,
          }}
          autoFocus
          value={null}
          onChange={onChange}
        />
      </CustomControl>
    </>
  );
};