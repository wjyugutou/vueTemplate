import { reactive, toRefs, type ToRefs } from 'vue'

export interface DictItem {
  dictLabel: string
  dictValue: string | number
  [key: string]: unknown
}

export interface DictReturn {
  list: { value: DictItem['dictValue'], label: DictItem['dictLabel'] }[]
  map: Record<string, string | number | boolean>
}

function getDictApi(dictType: string) {
  return request.Get<DictItem[]>(`/system/dict/getDict/${dictType}`)
}

type Dict<T extends [...string[]]> = {
  [K in T[number]]: DictReturn
}

/**
 * 字典hooks
 * @param dicts 字典值
 */
export function useDict<T extends string[]>(...dicts: T): ToRefs<Dict<T>> {
  const initvalue = dicts.reduce((prev, item) => {
    prev[item as T[number]] = { list: [], map: {} }
    return prev
  }, {} as Dict<T>)

  const dictMap = reactive(initvalue) as Dict<T>

  dicts.forEach((dict) => {
    getDictApi(dict).then((res) => {
      dictMap[dict as T[number]] = transformDict(res)
    })
  })

  return toRefs(dictMap)
}

function transformDict(dictValue: DictItem[]): DictReturn {
  return {
    list: dictValue.map(item => ({ value: item.dictValue, label: item.dictLabel })),
    map: dictValue.reduce<DictReturn['map']>((prev, item) => {
      prev[item.dictValue] = item.dictLabel
      prev[item.dictLabel] = item.dictValue
      return prev
    }, {}),
  }
}
