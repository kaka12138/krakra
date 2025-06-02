import { post } from '../utils/request'

export function thumbUpCommentApi(data: any) {
  return post('/product/comment/follower', data)
}
