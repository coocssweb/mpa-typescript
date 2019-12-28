/**
 * @file utils/domHelper.ts dom相关操作
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */
export function isFunction(func: any): boolean {
  return (
    typeof func === "function" ||
    Object.prototype.toString.call(func) === "[object Function]"
  );
}

export function isNum(num: any): boolean {
  return typeof num === "number" && !isNaN(num);
}

export function int(a: string): number {
  return parseInt(a, 10);
}
