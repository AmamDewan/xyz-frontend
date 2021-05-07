import {useState} from 'react' 
import {ArrowRightAlt} from '@material-ui/icons'
import {TextField, Button} from '@material-ui/core'
// import Header from '../../components/header'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    input: {
        marginBottom:'1rem',
        background:'#F3F4F6',
        border:'none',
        fontWeight: '700'
    }
}))
const Home = () => {
    const classes = useStyles()
    const [isSignup, setIsSignup] = useState(true)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    return (
        <>
            <div className="bg-gray-300 flex flex-col justify-center h-screen landing-bg md:p-16">
                <div className="bg-white w-72 mx-auto md:ml-auto md:mr-16 rounded-lg p-6">
                    <h3 className="text-center mb-4 text-2xl font-semibold">{isSignup ? 'SIGN UP' : 'LOG IN'}</h3>
                    <form className="flex flex-col">
                    <TextField
                        className={classes.input}
                        required
                        id="outlined-required"
                        label="USERNAME"
                        variant="outlined"
                        size="small"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        />
                    {isSignup && (

                        <TextField
                        className={classes.input}
                        required
                        id="outlined-required"
                        label="EMAIL"
                        variant="outlined"
                        size="small"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                    )}
                    <TextField
                        className={classes.input}
                        required
                        id="outlined-password-input"
                        label="PASSWORD"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        size="small"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    <TextField
                        className={classes.input}
                        required
                        id="outlined-password-input"
                        label="CONFIRM PASSWORD"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        size="small"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                    <Button variant="contained" color="primary">
                        {isSignup ? 'SIGN UP' : 'LOG IN'}
                    </Button>
                    </form>
                </div>
                {isSignup?
                <div onClick={()=>setIsSignup(false)} className="bg-white w-72 mx-auto md:ml-auto md:mr-16 rounded mt-3 p-4 text-center cursor-pointer">
                    Already user? LOG IN <ArrowRightAlt/>
                </div>
                :
                <div onClick={()=>setIsSignup(true)} className="bg-white w-72 mx-auto md:ml-auto md:mr-16 rounded mt-3 p-4 text-center cursor-pointer">
                    New here? SIGN UP <ArrowRightAlt/>
                </div>
                }
            </div>
        </>
    )
}

export default Home