import { get, post } from '../utils/request';

export function createGuashiApi(data: any) {
  return post('/product/post', data)
}

export function getGuashiListApi(params: any) {
  return get('/product/post', params)
}

export function getGuashiCommentsApi(id: string) {
  return get(`/product/post/${id}/comments`)
}

export function createGuashiCommentApi(id: string, data: any) {
  return post(`/product/post/${id}/comment`, data)
}

export function thumbUpGuashiApi(data: any) {
  return post('/product/post/follower', data)
}
