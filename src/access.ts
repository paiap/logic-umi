/*
 * @creater: panan
 * @message: 
 * @since: 2023-11-20 14:24:44
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2023-11-20 14:24:45
 * @文件相对于项目的路径: /logic-umi/src/access.ts
 */
export default (initialState: API.UserInfo) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
  const canSeeAdmin = !!(
    initialState && initialState.name !== 'dontHaveAccess'
  );
  return {
    canSeeAdmin,
  };
};
