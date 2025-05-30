// 获取url中的id
// http://34.219.38.131:9000/test/f0427e7bd6004b9f8c4c25d65e27c7aa?f=JPEG&w=3507&h=2480
export const getUrlId = (url: string) => {
  const urlObj = new URL(url)
  console.log('urlObj', urlObj)
  const arr = urlObj.pathname.split('/')
  return arr[arr.length - 1]
}
