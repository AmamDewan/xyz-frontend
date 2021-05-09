import {useEffect, useState} from 'react'
import {GridList, GridListTile, makeStyles, Button} from '@material-ui/core'
import {AddPhotoAlternate} from '@material-ui/icons'
import ModalImage from 'react-modal-image'

import {getAlbum, uploadPhoto} from '../../helpers/albumHelper' 
import UserLayout from '../../layouts/userLayout'


const useStyles = makeStyles((theme)=>({
  gridTileAdd:{
    width:'300px',
    height:'200px',
    backgroundColor: '#ccc'
  },
  gridList:{
    marginBottom:'1rem !important',
  },
  gridListTile:{
    // [theme.breakpoints.up('md')]: {
      
    // },
    borderRadius:'0.5rem',
  }
}))

const AlbumDetail = ({match: {params}}) => {
  const classes = useStyles()
  const [album, setAlbum] = useState({title:'a title', photos:[]})
  const [file, setFile] = useState()

  useEffect(()=>{
    getAlbum(params.id).then(res=>{
      console.log(res);
      setAlbum(res.data)
    
    })
  },[params.id])

  
  const uploadHandler = async() => {
    // console.log(file);
    
    let formdata = new FormData()
    formdata.append('url', file)
    formdata.append('album', params.id)
    
    const res = await uploadPhoto(params.id, formdata)
    console.log(res);
    
  }

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    uploadHandler()
  } 

  return(
    <UserLayout>
      <h3 className="text-3xl font-light mt-5 uppercase">{album && album.title}</h3>
      {album && album.photos.length <= 0 && <p className="text-3xl text-center font-bold mt-10 text-gray-200">This album is blank. Start uploading</p>}
      <GridList cellHeight="auto" cols="0" gap="10" className={classes.gridList}>
        {album && album.photos.length>0 && album.photos.map((photo, index)=>(
          <GridListTile key={index} >
            <ModalImage small={photo.url} large={photo.url} className={classes.gridListTile}/>
          </GridListTile>
        ))}
      </GridList>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 relative">
        {album && album.photos.length>0 && album.photos.map((photo, index)=>(
          <div key={index} className="cursor-pointer w-full h-36 overflow-hidden rounded relative bg-gray-200">
            <ModalImage small={photo.url} large={photo.url} className={classes.gridListTile}/>
          </div>
        ))}
      </div>
      <input
        accept="image/*"
        className="hidden"
        id="contained-button-file"
        type="file"
        onChange={(e)=>handleFile(e)}
      />
      <label htmlFor="contained-button-file" className="flex justify-center">
        <Button variant="contained" color="primary" component="span">
          <AddPhotoAlternate/>
        </Button>
      </label>
    </UserLayout>
  )
}

export default AlbumDetail