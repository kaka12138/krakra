import { get, post } from '../utils/request';

export function createGuashiApi(data: any) {
  return post('/post', data)
}

export function getGuashiListApi(params: any) {
  return get('/post', params)
}

export function getGuashiCommentsApi(id: string) {
  return get(`/post/${id}/comments`)
}

export function createGuashiCommentApi(id: string, data: any) {
  return post(`/post/${id}/comment`, data)
}

export function thumbUpGuashiApi(data: any) {
  return post('/post/follower', data)
}
