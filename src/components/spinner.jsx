import {CircularProgress, makeStyles} from '@material-ui/core'


const Spinner = ({color="#3f51b5"}) => {
    const useStyles = makeStyles(()=>({
        spinner:{
            color,
            width: '20px !important',
            height: '20px !important',
            marginRight: '5px'
        }
    }))
    const classes = useStyles()
    return (
        <CircularProgress className={classes.spinner}/>
    )
} 

export default Spinner