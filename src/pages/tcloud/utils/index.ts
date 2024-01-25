/*
 * @creater: panan
 * @message: utils
 * @since: 2024-01-22 20:02:17
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-01-22 20:02:18
 * @文件相对于项目的路径: /logic-umi/src/pages/tcloud/utils/index.ts
 */

export const extractYearFromString = (str: string) => {
  // 匹配四位连续的数字作为年份
  const match = str.match(/\d{4}/);
  // 如果找到匹配项，则返回匹配到的年份；否则返回null
  return match ? match[0] : null;
};
