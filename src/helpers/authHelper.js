import axios from 'axios'
import cookies from 'js-cookies'

const API = process.env.REACT_APP_API

export const userLogin = async (data) => {
  try{
    const res = await axios.post(`${API}/users/login/`, data)
    return res
  } catch (err) {
    return err.response
  }
}
export const userRegister = async (data) => {
  try{
    const res = await axios.post(`${API}/users/`, data)
    return res
  } catch (err) {
    return err.response
  }
}

export const isUserAuthenticated = () => {
  const token = cookies.getItem('token')
  if (token) return true
  return false
}