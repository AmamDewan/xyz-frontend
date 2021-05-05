import {AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core'
import {Menu as MenuIcon} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';

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

    return(
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    XYZ Photography
                </Typography>
                <Button color="inherit">Logout</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header