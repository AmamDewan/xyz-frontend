import {useEffect, useState} from 'react'
import {Add} from '@material-ui/icons'
import {Fab, Tooltip, Modal} from '@material-ui/core'
import {Link} from 'react-router-dom'
import UserLayout from '../../layouts/userLayout'
import {getAlbums} from '../../helpers/albumHelper'

// const tileData = [
//   {
//     img: 'https://picsum.photos/seed/1/320/200/?blur',
//     title: 'Album Name',
//   },
//   {
//     img: 'https://picsum.photos/seed/2/300/250/?blur',
//     title: 'Album Name',
//   },
//   {
//     img: 'https://picsum.photos/seed/3/300/200/?blur',
//     title: 'Album Name',
//   },
//   {
//     img: 'https://picsum.photos/seed/4/300/200/?blur',
//     title: 'Album Name',
//   },
//   {
//     img: 'https://picsum.photos/seed/5/300/200/?blur',
//     title: 'Album Name',
//   },
//   {
//     img: 'https://picsum.photos/seed/6/300/200/?blur',
//     title: 'Album Name',
//   },
// ];

const Albums = () => {
  const [albums, setAlbums] = useState([])
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      {/* <div className="cursor-pointer mb-6 my-auto border-dashed border-2 border-gray-400 rounded-lg flex items-center justify-center h-36 text-5xl text-gray-400">
          <AddCircleOutline fontSize="large" />
      </div> */}
    </div>
    <div className="fixed bottom-5 right-8 p-0 cursor-pointer bg-gray-300 rounded-full flex items-center justify-center text-5xl text-gray-400">
      <Tooltip title="Add" aria-label="add">
        <Fab color="primary" onClick={handleOpen}>
          <Add />
        </Fab>
      </Tooltip>
    </div>
  </UserLayout>
  )
}

export default Albums