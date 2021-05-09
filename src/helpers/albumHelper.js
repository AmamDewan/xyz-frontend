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

export const createAlbum = async(data) => {
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