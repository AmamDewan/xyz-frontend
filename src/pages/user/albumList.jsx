import {Add} from '@material-ui/icons'
import {Fab, Tooltip} from '@material-ui/core'
import {Link} from 'react-router-dom'
import UserLayout from '../../layouts/userLayout'

const tileData = [
  {
    img: 'https://picsum.photos/seed/1/320/200/?blur',
    title: 'Album Name',
  },
  {
    img: 'https://picsum.photos/seed/2/300/250/?blur',
    title: 'Album Name',
  },
  {
    img: 'https://picsum.photos/seed/3/300/200/?blur',
    title: 'Album Name',
  },
  {
    img: 'https://picsum.photos/seed/4/300/200/?blur',
    title: 'Album Name',
  },
  {
    img: 'https://picsum.photos/seed/5/300/200/?blur',
    title: 'Album Name',
  },
  {
    img: 'https://picsum.photos/seed/6/300/200/?blur',
    title: 'Album Name',
  },
];

const Albums = () => {
  return(
  <UserLayout>
    <h3 className="text-3xl font-light mt-5">Albums</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 relative">
      {tileData && tileData.map(tile=>(
        <Link to="/album-details">
          <div className="cursor-pointer w-full h-36 overflow-hidden rounded relative">
            <p className="absolute text-white bottom-0 p-2 inset-x-0" style={{backgroundColor:'rgba(0,0,0,0.3)',}}>{tile.title}</p>
            <img className="cover" src={tile.img} alt=""/>
          </div>
        </Link>
      ))}
      {/* <div className="cursor-pointer mb-6 my-auto border-dashed border-2 border-gray-400 rounded-lg flex items-center justify-center h-36 text-5xl text-gray-400">
          <AddCircleOutline fontSize="large" />
      </div> */}
    </div>
    <div className="fixed bottom-5 right-8 p-0 cursor-pointer bg-gray-300 rounded-full flex items-center justify-center text-5xl text-gray-400">
      <Tooltip title="Add" aria-label="add">
        <Fab color="primary">
          <Add />
        </Fab>
      </Tooltip>
    </div>
  </UserLayout>
  )
}

export default Albums