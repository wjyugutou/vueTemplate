export const imgExt = ['jpg', 'jpeg', 'png', 'gif', 'bmp'] as const
export const videoExt = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'] as const
export const pdfExt = ['pdf'] as const

/* 图片、视频、pdf */
export const previewExt = [...imgExt, ...videoExt, ...pdfExt]

/* 判断文件是否可以预览 */
export function isPreviewFile(fileName: string) {
  return previewExt.some(ext => fileName?.endsWith(ext))
}

export function download(data: Blob | string, fileName: string) {
  if (typeof data === 'string') {
    fetch(data, { mode: 'no-cors' })
      .then(res => res.blob())
      .then((blob) => {
        const link = document.createElement('a')
        const data = window.URL.createObjectURL(blob)
        link.href = data
        link.download = fileName
        link.click()
        window.URL.revokeObjectURL(data)
      })
  }
  else {
    const blob = new Blob([data])
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)
  }
}
