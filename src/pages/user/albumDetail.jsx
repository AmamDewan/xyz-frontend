import {useEffect, useState} from 'react'
import {GridList, GridListTile, makeStyles, Button} from '@material-ui/core'
import {AddPhotoAlternate} from '@material-ui/icons'
import ModalImage from 'react-modal-image'
import fs from 'fs'

import {getAlbum, uploadPhoto} from '../../helpers/albumHelper' 
import UserLayout from '../../layouts/userLayout'


// const tileData = [
//   {
//     img: 'https://picsum.photos/seed/1/320/200/?blur',
//     imgL: 'https://picsum.photos/seed/1/900/600/',
//     title: 'Photo Title',
//   },
//   {
//     img: 'https://picsum.photos/seed/2/300/250/?blur',
//     imgL: 'https://picsum.photos/seed/2/300/200/',
//     title: 'Photo Title',
//   },
//   {
//     img: 'https://picsum.photos/seed/3/300/200/?blur',
//     imgL: 'https://picsum.photos/seed/3/300/200/',
//     title: 'Photo Title',
//   },
//   {
//     img: 'https://picsum.photos/seed/4/300/200/?blur',
//     imgL: 'https://picsum.photos/seed/1/300/200/',
//     title: 'Photo Title',
//   },
//   {
//     img: 'https://picsum.photos/seed/5/300/200/?blur',
//     imgL: 'https://picsum.photos/seed/1/300/200/',
//     title: 'Photo Title',
//   },
//   {
//     img: 'https://picsum.photos/seed/6/300/200/?blur',
//     imgL: 'https://picsum.photos/seed/1/300/200/',
//     title: 'Photo Title',
//   },
// ];

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

  useEffect(()=>{
    getAlbum(params.id).then(res=>{
      console.log(res);
      setAlbum(res.data)
    
    })
  },[params.id])

  const uploadHandler = async(file) => {
    console.log(file);
    const res = await uploadPhoto({title:'A photo title', url:file, album:params.id})
    console.log(res);
  }


  console.log(album);
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
      <input
        accept="image/*"
        className="hidden"
        id="contained-button-file"
        type="file"
        onChange={(e)=>uploadHandler(e.target.value)}
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