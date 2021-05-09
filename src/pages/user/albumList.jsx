import {useEffect, useState} from 'react'
import {Add, Close} from '@material-ui/icons'
import {Fab, Tooltip, Modal, makeStyles} from '@material-ui/core'
import {Link} from 'react-router-dom'
import UserLayout from '../../layouts/userLayout'
import {getAlbums, createAlbum} from '../../helpers/albumHelper'


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '0.5rem',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    bottom:'2rem',
    right: '3rem',
    display: 'flex',
    flexDirection: 'column',
  },
}));


const Albums = () => {
  const classes = useStyles()
  const [albums, setAlbums] = useState([])
  const [open, setOpen] = useState(false);
  const [albumName, setAlbumName] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async() => {
    const res = await createAlbum({title: albumName, owner: 1})
    console.log(res)
  }

  useEffect(()=>{
    getAlbums().then(res=>setAlbums(res.data))
  },[])
  
  console.log(albums);
  return(
  <UserLayout>
    <h3 className="text-3xl font-light mt-5">Albums</h3>
    {albums.length <= 0 && <p className="text-5xl text-center font-bold mt-20 text-gray-300">You don't have any album yet! Create one.</p>}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 relative">
      {albums && albums.map(album=>(
        <Link to={`/albums/${album.id}`}>
          <div className="cursor-pointer w-full h-36 overflow-hidden rounded relative bg-gray-200">
            <p className="absolute text-white bottom-0 p-2 inset-x-0" style={{backgroundColor:'rgba(0,0,0,0.3)',}}>{album.title}</p>
            {album.photos.length > 0 ? <img className="cover" src={album.photos[0].url} alt=""/>:<p className="mt-4 text-gray-300 text-2xl text-center">Cover</p>}
          </div>
        </Link>
      ))}
      {/*
        <div className="cursor-pointer mb-6 my-auto border-dashed border-2 border-gray-400 rounded-lg flex items-center justify-center h-36 text-5xl text-gray-400">
          <AddCircleOutline fontSize="large" />
        </div>
      */}
    </div>
    <div className="fixed bottom-5 right-8 p-0 cursor-pointer bg-gray-300 rounded-full flex items-center justify-center text-5xl text-gray-400">
      <Tooltip title="Add" aria-label="add">
        <Fab color="primary" onClick={handleOpen}>
          <Add />
        </Fab>
      </Tooltip>
    </div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
       <div  className={classes.paper}>
         <div className="relative">
            <Close className="absolute -right-6 -top-3 cursor-pointer" onClick={handleClose} />
         </div>
        <h2 className="text-xl font-semibold">Create A New Album</h2>
        <input className="border-2 border-gray-300 rounded my-2 px-2" type="text" placeholder="Album Name" value={albumName} onChange={(e)=>{setAlbumName(e.target.value)}}/>
        <div className="text-center">
          <button className="bg-blue-400 px-4 py-1" onClick={handleCreate}>Create</button>
        </div>
      </div>
    </Modal>
  </UserLayout>
  )
}

export default Albums