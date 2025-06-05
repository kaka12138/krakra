// 获取url中的id
// http://34.219.38.131:9000/test/f0427e7bd6004b9f8c4c25d65e27c7aa?f=JPEG&w=3507&h=2480
export const getUrlId = (url: string) => {
  const urlObj = new URL(url)
  console.log('urlObj', urlObj)
  const arr = urlObj.pathname.split('/')
  return arr[arr.length - 1]
}

// 计算当前时间和目标时间的差值，差值小于1分钟，返回xx秒前，差值小于1小时，返回xx分钟前，差值小于1天，返回xx小时前，差值小于1个月，返回xx天前，差值小于1年，返回xx个月前，差值大于1年，返回xx年前
export const getTimeDiff = (targetTime: string) => {
  const now = new Date()
  const target = new Date(targetTime)
  const diff = now.getTime() - target.getTime()
  if (diff < 60 * 1000) {
    return `${Math.floor(diff / 1000)}秒前`
  } else if (diff < 60 * 60 * 1000) {
    return `${Math.floor(diff / 60 / 1000)}分钟前`
  } else if (diff < 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / 60 / 60 / 1000)}小时前`
  } else if (diff < 30 * 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / 24 / 60 / 60 / 1000)}天前`
  } else if (diff < 365 * 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / 30 / 24 / 60 / 60 / 1000)}个月前`
  } else {
    return `${Math.floor(diff / 365 / 24 / 60 / 60 / 1000)}年前`
  }
}
