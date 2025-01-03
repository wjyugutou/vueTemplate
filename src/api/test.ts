interface ReqParams {
  [key: string]: any
}

export function getTestApi(params?: ReqParams) {
  return request.Get<{
    content: string
    params: ReqParams
  }>('/test', {
    params,
    meta: {
      filterData: false,
    },
  }).send(true)
}

export function getTestErrApi() {
  return request.Get('/test/err')
}

export function postTestApi(data?: ReqParams) {
  return request.Post('/test', data).send(false)
}

export function postTestFileApi(data: { path: string }) {
  return request.Post<{
    filename: string
    data: Blob
  }>('/test/file', data, {
    meta: {
      blob: true,
    },
  })
}
