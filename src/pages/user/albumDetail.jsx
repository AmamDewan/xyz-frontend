import {GridList, GridListTile, makeStyles, Button} from '@material-ui/core'
import {AddPhotoAlternate} from '@material-ui/icons'
import ModalImage from 'react-modal-image'
import UserLayout from '../../layouts/userLayout'


const tileData = [
  {
    img: 'https://picsum.photos/seed/1/320/200/?blur',
    imgL: 'https://picsum.photos/seed/1/900/600/',
    title: 'Photo Title',
  },
  {
    img: 'https://picsum.photos/seed/2/300/250/?blur',
    imgL: 'https://picsum.photos/seed/2/300/200/',
    title: 'Photo Title',
  },
  {
    img: 'https://picsum.photos/seed/3/300/200/?blur',
    imgL: 'https://picsum.photos/seed/3/300/200/',
    title: 'Photo Title',
  },
  {
    img: 'https://picsum.photos/seed/4/300/200/?blur',
    imgL: 'https://picsum.photos/seed/1/300/200/',
    title: 'Photo Title',
  },
  {
    img: 'https://picsum.photos/seed/5/300/200/?blur',
    imgL: 'https://picsum.photos/seed/1/300/200/',
    title: 'Photo Title',
  },
  {
    img: 'https://picsum.photos/seed/6/300/200/?blur',
    imgL: 'https://picsum.photos/seed/1/300/200/',
    title: 'Photo Title',
  },
];

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

const AlbumDetail = () => {
  const classes = useStyles()
  return(
    <UserLayout>
      <h3 className="text-3xl font-light mt-5">Album Name</h3>
      <GridList cellHeight="auto" cols="0" gap="10" className={classes.gridList}>
        {tileData.map((tile, index)=>(
          <GridListTile key={index} >
            <ModalImage small={tile.img} large={tile.imgL} className={classes.gridListTile}/>
          </GridListTile>
        ))}
      </GridList>
      <input
        accept="image/*"
        className="hidden"
        id="contained-button-file"
        type="file"
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