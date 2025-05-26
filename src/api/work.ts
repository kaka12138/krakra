import { get, post } from '../utils/request';

export function createOC_AU_Work_Api(data: any) {
  return post('/creation', data)
}

export function createGuashi_Api(data: any) {
  return post('/post', data)
}
