import http from './public'
// 添加书籍
export const addBook = (params) => {
  return http.fetchPost('/books/addBook', params)
}
export const getMybook = (params) => {
  return http.fetchGet('/books/getMybook', params)
}
