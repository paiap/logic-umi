/*
 * @creater: panan
 * @message: mock数据
 * @since: 2023-11-23 14:04:49
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-12-10 10:59:52
 * @文件相对于项目的路径: /logic-umi/src/pages/paas/Paas/sandain.ts
 */

export interface RootObject {
  devNormal: number;
  devAbnormal: number;
  testNormal: number;
  testAbnormal: number;
  stagingNormal: number;
  stagingAbnormal: number;
  prodNormal: number;
  prodAbnormal: number;
  location: Location[];
}

export interface Location {
  latitude: number;
  longitude: number;
  name: string;
  clusters: ClusterCode[];
}

export interface ClusterCode {
  basicInfo: BasicInfo;
  resourceInfo: ResourceInfo;
  capacityInfo: CapacityInfo;
}

export interface CapacityInfo {
  cpuUsageAvg: number;
  cpuUsageLimit: number;
  cpuCapUseful: number;
  cpuCapSum: number;
  memUsageAvg: number;
  memUsageLimit: number;
  memCapUseful: number;
  memCapSum: number;
  gpuUsageAvg: number;
  gpuUsageLimit: number;
  gpuCapUseful: number;
  gpuCapSum: number;
}

export interface ResourceInfo {
  podNum: number;
  nodeNum: number;
  namespaceNum: number;
  workloadNum: number;
}

export interface BasicInfo {
  clusterCode: string;
  clusterName: string;
  clusterState: string;
  clusterLevel: string;
  clusterDesc: string;
  clusterLoc: string;
}

export const mapData: RootObject = {
  devNormal: 1,
  devAbnormal: 1,
  testNormal: 4,
  testAbnormal: 3,
  stagingNormal: 4,
  stagingAbnormal: 4,
  prodNormal: 2,
  prodAbnormal: 2,
  location: [
    {
      clusters: [
        {
          basicInfo: {
            clusterCode: 'dev',
            clusterName: 'ci集群',
            clusterState: '正常',
            clusterLevel: 'dev',
            clusterDesc: 'ci集群',
            clusterLoc: '上海',
          },
          resourceInfo: {
            podNum: 1780,
            nodeNum: 44,
            namespaceNum: 67,
            workloadNum: 24,
          },
          capacityInfo: {
            cpuUsageAvg: 0,
            cpuUsageLimit: 0,
            cpuCapUseful: 0,
            cpuCapSum: 0,
            memUsageAvg: 0,
            memUsageLimit: 0,
            memCapUseful: 0,
            memCapSum: 0,
            gpuUsageAvg: 0,
            gpuUsageLimit: 0,
            gpuCapUseful: 0,
            gpuCapSum: 0,
          },
        },
      ],
      latitude: 31.18874,
      longitude: 121.47083,
      name: '上海',
    },
    {
      clusters: [
        {
          basicInfo: {
            clusterCode: 'paasdev',
            clusterName: 'paas开发集群',
            clusterState: '异常',
            clusterLevel: 'dev',
            clusterDesc: 'paas开发集群',
            clusterLoc: '杭州五常',
          },
          resourceInfo: {
            podNum: 4481,
            nodeNum: 29,
            namespaceNum: 85,
            workloadNum: 707,
          },
          capacityInfo: {
            cpuUsageAvg: 34,
            cpuUsageLimit: 56,
            cpuCapUseful: 234,
            cpuCapSum: 0,
            memUsageAvg: 3245,
            memUsageLimit: 0,
            memCapUseful: 335,
            memCapSum: 3425,
            gpuUsageAvg: 0,
            gpuUsageLimit: 56,
            gpuCapUseful: 34,
            gpuCapSum: 245,
          },
        },
        {
          basicInfo: {
            clusterCode: 'paasdev',
            clusterName: 'paas开发集群',
            clusterState: '异常',
            clusterLevel: 'dev',
            clusterDesc: 'paas开发集群',
            clusterLoc: '杭州五常',
          },
          resourceInfo: {
            podNum: 4481,
            nodeNum: 29,
            namespaceNum: 85,
            workloadNum: 707,
          },
          capacityInfo: {
            cpuUsageAvg: 21,
            cpuUsageLimit: 24,
            cpuCapUseful: 324,
            cpuCapSum: 0,
            memUsageAvg: 0,
            memUsageLimit: 0,
            memCapUseful: 0,
            memCapSum: 0,
            gpuUsageAvg: 0,
            gpuUsageLimit: 0,
            gpuCapUseful: 0,
            gpuCapSum: 0,
          },
        },
      ],
      latitude: 30.270686,
      longitude: 120.043873,
      name: '杭州-五常',
    },
  ],
};
