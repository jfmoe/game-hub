import axios from 'axios'

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: '6e05b54c848845a4b28acc6c1170c9b9',
  },
})

export interface FetchResponse<T> {
  count: number
  results: T[]
}
