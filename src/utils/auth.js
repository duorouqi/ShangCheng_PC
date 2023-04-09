import Cookies from 'js-cookie'

const TokenKey = 'yan_admin_template_token'
const IdKey = 'yan_admin_template_id'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 15 })
}

export function getID() {
  return Cookies.get(IdKey)
}
export function setID(id) {
  return Cookies.set(IdKey, id)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getHeader() {
  return {
    Authorization: Cookies.get(TokenKey)
  }
}
