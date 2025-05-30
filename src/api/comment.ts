import { post } from '../utils/request'

export function thumbUpCommentApi(data: any) {
  return post('/comment/follower', data)
}
