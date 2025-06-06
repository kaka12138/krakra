import { get, post } from '../utils/request';

export function getHotCardListApi() {
  return get('/product/card/hotCards')
}

export function createCardApi(data: any) {
  return post('/product/card', data)
}

export function searchCardApi(params: any) {
  return get('/product/card/getCardList', params)
}
