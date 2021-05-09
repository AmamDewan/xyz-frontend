import {AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core'
import {Menu as MenuIcon} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import cookies from 'js-cookies'
import {Link} from 'react-router-dom'
import logo from '../assets/logo-white.png'

const useStyles = makeStyles((theme)=>({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1
    },
}))

const Header = () => {
    const classes = useStyles()

    const logoutHandler = () => {
        cookies.removeItem('token')
        window.location = '/' 
    }

    return(
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" className={classes.title}>
                    <Link to="/albums">
                        <img className="h-12" src={logo} alt="XYZ PhotoBook"/>
                    </Link>
                </Typography>
                <Button color="inherit" onClick={logoutHandler}>Logout</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header