/*
 * @creater: panan
 * @message: layout
 * @since: 2023-11-18 19:21:53
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-01-19 11:19:58
 * @文件相对于项目的路径: /logic-umi/src/app.ts
 */
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};