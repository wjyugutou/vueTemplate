import { reactive, toRefs, type ToRefs } from 'vue'
import { useRequest } from 'alova'

interface DictItem {
  dictLabel: string
  dictValue: string | number
  [key: string]: any
}

interface DictObj {
  list: { value: DictItem['dictValue'], label: DictItem['dictLabel'] }[]
  map: Record<string, string | number | boolean>
}

async function getDicts(dictType: string): Promise<{ data: DictItem[] }> {
  console.log(dictType)

  return {
    data: [],
  }
}

type Dict<T extends [...string[]]> = {
  [K in T[number]]: DictObj
}


export function useDict$1<T extends string[]>(...dict: T) {
  useRequest()
}


/**
 * 字典hooks
 * @param dict 字典值
 */
export function useDict<T extends string[]>(...dict: T): ToRefs<Dict<T>> {
  const dicts = reactive({}) as Dict<T>

  dict.forEach((dictType) => {
    getDicts(dictType).then((res) => {
      dicts[dictType as T[number]] = transformDict(res.data)
    })
  })

  return toRefs(dicts)
}

function transformDict(dictObjList: DictItem[]): DictObj {
  return {
    list: dictObjList.map(item => ({ value: item.dictValue, label: item.dictLabel })),
    map: dictObjList.reduce<DictObj['map']>((prev, item) => {
      prev[item.dictValue] = item.dictLabel
      prev[item.dictLabel] = item.dictValue
      return prev
    }, {}),
  }
}
