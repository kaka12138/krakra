import { get, post } from '../utils/request';

export function createOC_AU_Work_Api(data: any) {
  return post('/oc/au/work', data)
}
