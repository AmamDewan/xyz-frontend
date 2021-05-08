import axios from 'axios'
import cookies from 'js-cookies'
import FormData from 'form-data'
import fs from 'fs'

const API = process.env.REACT_APP_API
const token = cookies.getItem('token')

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

export const uploadPhoto = async(data) => {
  const formData = new FormData()

  formData.append('title', data.title)
  formData.append('album', data.album)
  formData.append('url', fs.createReadStream(data.url))
  try{
    console.log('data',data);
    console.log('form',formData);
    const res = await axios.post(`${API}/albums/${data.album}/photos/`, formData, {
      headers: {
        'Authorization': `Token ${token}`,
        ...formData.getHeaders()
      }
    })
    return res
  } catch (err) {
    return err.response
  }
}