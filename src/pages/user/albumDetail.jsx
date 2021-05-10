import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {
  makeStyles, 
  Button, 
  Fab, 
  Tooltip, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core'
import { Album, ArrowBack, CloudUpload, Delete, Edit} from '@material-ui/icons'
import ModalImage from 'react-modal-image'

import {getAlbum, uploadPhoto, removeAlbum} from '../../helpers/albumHelper' 
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

  const [album, setAlbum] = useState({title:'', photos:[]})
  const [files, setFiles] = useState()
  const [progress, setProgress] = useState(0);
  const [edit, setEdit] = useState(false)
  const [remove, setRemove] = useState(false)

  const handleDialog = (method, value) => {
    method(value)
  };


  useEffect(()=>{
    getAlbum(params.id)
    .then(res=>{
      setAlbum(res.data)
    })
    .catch(err =>{ 
      window.location = '/albums'
    })
  },[params.id, progress])

  
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
    }
  }

  const handleFile = (e) => {
    setFiles(e.target.files);
  } 

  const handleDelete = async() => {
    const res = await removeAlbum(params.id)
    if (res.status === 204)
    history.goBack()
  } 
  const handleEdit = () => {
    console.log('changed');
  } 

  return(
    <UserLayout>
      <div className="flex items-center  mt-5">
        <Fab color="primary" size="small" aria-label="Back" onClick={()=>history.goBack()}>
          <ArrowBack />
        </Fab>
        <h3 className="text-3xl font-light ml-4 mr-auto">
          Album: <span className="font-semibold uppercase">{album && album.title}</span>
        </h3>
        <div className="flex flex-col md:flex-row">

        <Tooltip title="Edit Album">
          <IconButton aria-label="delete" size="medium" onClick={()=>handleDialog(setEdit,true)}>
            <Edit fontSize="small"/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Album">
          <IconButton aria-label="delete" size="medium" onClick={()=>handleDialog(setRemove,true)}>
            <Delete fontSize="small"/>
          </IconButton>
        </Tooltip>
        </div>
      </div>

      {album && album.photos.length <= 0 && <p className="text-3xl text-center font-bold mt-10 text-gray-200">This album is blank. Start uploading</p>}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 relative">
        {album && album.photos.length>0 && album.photos.map((photo, index)=>(
          <div key={index} className="cursor-pointer w-full h-36 overflow-hidden rounded relative">
            <ModalImage small={photo.url} large={photo.url} className={classes.gridListTile}/>
          </div>
        ))}
      </div>
      {progress > 0 && <LinearProgress value={progress}/>}
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
      {/* Edit Album Dialog */}
      <Dialog
        open={edit}
        onClose={()=>handleDialog(setEdit, false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Album"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Edit Form
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleDialog(setEdit, false)} color="primary">
            Disagree
          </Button>
          <Button onClick={()=>handleDialog(setEdit, false)} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* Remove Album Dialog */}
      <Dialog
        open={remove}
        onClose={()=>handleDialog(setRemove, false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove Album: {album.title.toUpperCase()}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to parform this operation? This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleDialog(setRemove, false)} color="primary" autoFocus>
            Close
          </Button>
          <Button onClick={handleDelete} color="secondary">
            I'll do it!
          </Button>
        </DialogActions>
      </Dialog>
    </UserLayout>
  )
}

export default AlbumDetail