import { VNodeChild } from '../vnode'
import { isArray, isString, isObject } from '@vue/shared'

export function renderList(
  source: any,
  renderItem: (value: any, key: string | number, index?: number) => VNodeChild
): VNodeChild[] {
  let ret: VNodeChild[] = []
  if (isArray(source) || isString(source)) {
    for (let i = 0, l = source.length; i < l; i++) {
      ret.push(renderItem(source[i], i))
    }
  } else if (typeof source === 'number') {
    for (let i = 0; i < source; i++) {
      ret.push(renderItem(i + 1, i))
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator as any]) {
      ret = Array.from(source as Iterable<any>, renderItem)
    } else {
      const keys = Object.keys(source)
      ret = new Array(keys.length)
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i]
        ret[i] = renderItem(source[key], key, i)
      }
    }
  }
  return ret
}
