import { Token } from '../../types/setup'
import getStorage from './getStorage'

const TOKEN_KEY = 'vsf-commercetools-token'

const storeToken = (token: Token) => {
  const storage = getStorage()
  storage.setItem(TOKEN_KEY, JSON.stringify(token))
}

const getToken = (): Token => {
  const storage = getStorage()
  const item = storage.getItem(TOKEN_KEY)
  return item ? JSON.parse(item) : null
}

export { storeToken, getToken }
