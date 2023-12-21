/*
 * @creater: panan
 * @message: 地图组件
 * @since: 2023-12-04 13:47:50
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-20 10:10:09
 * @文件相对于项目的路径: /logic-umi/src/pages/Gaode/TestDemo/index.tsx
 */

import React, { FC, useEffect } from 'react'
import { IBox } from './type'
import styles from './index.less';

const TestDemo: FC<IBox> = ({ id }) => {

  useEffect(() => {

  }, []);

  return (
    <div
      id={id}
      className={styles.container}
      style={{ height: "800px" }}
    > 11</div>
  )
}

export default TestDemo
