import axios from 'axios'
import cookies from 'js-cookies'

const API = process.env.REACT_APP_API
const token = cookies.getItem('token')
const user = JSON.parse(cookies.getItem('user'))

const authHeader = {
  headers:{
    'Authorization': `Token ${token}`
  }
}

export const getAlbums = async() => {
  try{
    const res = await axios.get(`${API}/albums/`, authHeader)
    return res
  } catch (err) {
    return err.response
  }
} 

export const getAlbum = async(id) => {
  try{
    const res = await axios.get(`${API}/albums/${id}`, authHeader)
    return res
  } catch (err) {
    return err.response
  }
} 

export const createAlbum = async(title, is_public) => {
  const data = {title, is_public, owner: user.id}
  try{
    const res = await axios.post(`${API}/albums/`, data, authHeader)
    return res
  } catch (err) {
    return err.response
  }
} 

export const uploadPhoto = async(id, data) => {
  try{
    const res = await axios.post(`${API}/albums/${id}/photos/`, data, {
      headers: {
        'Authorization': `Token ${token}`,
      }
    })
    return res
  } catch (err) {
    return err.response
  }
}