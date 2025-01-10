import { reactive, toRefs } from 'vue'

interface DictItem {
  dictValue: string
  dictLabel: string
}

interface Dicts<T extends string[] | string> {
  list: { value: string, label: string }[]
  map: T extends string[] ?
      { [key in T[number]]: string } : T extends string ?
          { [key in T]: string } : unknown
}

async function getDicts(dictType: string): Promise<{ data: DictItem[] }> {
  console.log(dictType)

  return {
    data: [],
  }
}

export function useDict<T extends string[]>(dict: T): { [K in T[number]]: any }
export function useDict<T extends string>(dict: T): { [K in T]: any }

export function useDict<T extends string | string[]>(dict: T) {
  const dicts = reactive({} as Dicts<T>)

  if (Array.isArray(dict)) {
    dict.forEach((dictType) => {
      getDicts(dictType).then((res) => {
        dicts[dictType] = transformDict(res.data)
      })
    })
  }
  else {
    getDicts(dict).then((res) => {
      dicts[dict] = transformDict(res.data)
    })
  }

  return toRefs(dicts)
}

function transformDict(dictObjList: DictItem[]) {
  return {
    list: dictObjList.map(item => ({ value: item.dictValue, label: item.dictLabel })),
    map: dictObjList.reduce((prev, item) => {
      prev[item.dictValue] = item.dictLabel
      prev[item.dictLabel] = item.dictValue
      return prev
    }, {}),
  }
}

function a<T extends string[] | string>(s: T): T extends readonly string[] ? { [K in T[number]]: K } : { [K in T]: K } {
  const obj = {} as { [key: string]: string }

  if (Array.isArray(s)) {
    s.forEach((item) => {
      obj[item] = item
    })
  }
  else {
    obj[s] = s
  }

  return obj as T extends string[] ? { [K in T[number]]: K } : { [K in T]: K }
}
