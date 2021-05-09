import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {makeStyles, Button, Fab, Tooltip} from '@material-ui/core'
import { ArrowBack, CloudUpload} from '@material-ui/icons'
import ModalImage from 'react-modal-image'

import {getAlbum, uploadPhoto} from '../../helpers/albumHelper' 
import UserLayout from '../../layouts/userLayout'
import LinearProgress from '../../components/LinearProgress'


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
  const history = useHistory()

  const [album, setAlbum] = useState({title:'a title', photos:[]})
  const [files, setFiles] = useState()
  const [progress, setProgress] = useState(0);

  useEffect(()=>{
    getAlbum(params.id).then(res=>{
      setAlbum(res.data)
    
    })
  },[params.id, album])

  
  const uploadHandler = async() => {
    
    for (let index = 0; index < files.length; index++) {
      const file = files[index]
      setProgress(((index+1)/files.length)*100-1)

      let formdata = new FormData()
      formdata.append('title', file.name)
      formdata.append('url', file)
      formdata.append('album', params.id)

      const res = await uploadPhoto(params.id, formdata)
      setAlbum({...album, photos:[...album.photos, res.data]})
      setProgress(0)
      console.log(res.data)
    }
    // console.log(files);
    
    // let formdata = new FormData()
    // formdata.append('url', file)
    // formdata.append('album', params.id)
    
    // const res = await uploadPhoto(params.id, formdata)
    // console.log(res);
    setFiles(null)
  }

  const handleFile = (e) => {
    setFiles(e.target.files);
  } 
  return(
    <UserLayout>
      <div className="flex items-center  mt-5">
        <Fab color="primary" size="small" aria-label="Back" onClick={()=>history.goBack()}>
          <ArrowBack />
        </Fab>
        <h3 className="text-3xl font-light ml-4">
          Album: <span className="font-semibold uppercase">{album && album.title}</span>
        </h3>
      </div>

      {album && album.photos.length <= 0 && <p className="text-3xl text-center font-bold mt-10 text-gray-200">This album is blank. Start uploading</p>}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 relative">
        {album && album.photos.length>0 && album.photos.map((photo, index)=>(
          <div key={index} className="cursor-pointer w-full h-36 overflow-hidden rounded relative">
            <ModalImage small={photo.url} large={photo.url} className={classes.gridListTile}/>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <input
          accept="image/*"
          className="border-0"
          multiple
          id="contained-button-file"
          type="file"
          onChange={(e)=>handleFile(e)}
        />
        <Tooltip title="Upload">
          <Button variant="contained" color="primary" component="span" onClick={uploadHandler}>
            <CloudUpload/>
          </Button>
        </Tooltip>
      </div>
      {progress > 0 && <LinearProgress value={progress}/>}
      
    </UserLayout>
  )
}

export default AlbumDetail