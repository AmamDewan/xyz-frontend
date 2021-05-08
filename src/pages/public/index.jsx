import {useState} from 'react' 
import {ArrowRightAlt} from '@material-ui/icons'
import {TextField, Button} from '@material-ui/core'
import cookies from 'js-cookies'
import {userLogin, userRegister} from '../../helpers/authHelper'
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
    const [isSignup, setIsSignup] = useState(!cookies.getItem('exUser'))

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirm_password, setConfirmPassword] = useState()

    const [warning, setWarning] = useState('')
    const [success, setSuccess] = useState('')

    const loginHandler = async(e) => {
        e.preventDefault()
        setWarning('')
        setSuccess('')

        const res = await userLogin({username, password})
        if (res.status === 200)
            cookies.setItem('exUser', true, { expires: 7 })
            cookies.setItem('token', res.data.auth_token)
            window.location = "/albums"
        if (res.status === 400)
            setWarning('Unable to login with provided credentials!')
    }
    const registerHandler = async(e) => {
        e.preventDefault()
        setWarning('')
        setSuccess('')

        const res = await userRegister({username, email, password, confirm_password})
        if (res.status === 201)
            setSuccess("User Created Successfully!");
        if (res.status === 400){
            let error
            for (error in res.data)
                setWarning(res.data[error]);
        }
    }   

    return (
        <>
            <div className="bg-gray-300 flex flex-col justify-center h-screen landing-bg md:p-16">
                <div className="bg-white w-72 mx-auto md:ml-auto md:mr-16 rounded-lg p-6">
                    <h3 className="text-center mb-4 text-2xl font-semibold">{isSignup ? 'SIGN UP' : 'LOG IN'}</h3>
                    {warning && (<p className="mb-4 text-red-500 text-sm bg-red-100 rounded p-2 border border-red-500">{warning}</p>)}
                    {success && (<p className="mb-4 text-green-500 text-sm bg-green-100 rounded p-2 border border-green-500">{success}</p>)}
                    <form className="flex flex-col" onSubmit={isSignup ? registerHandler:loginHandler}>
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
                    {isSignup && (
                        <TextField
                        className={classes.input}
                        required
                        id="outlined-password-input"
                        label="CONFIRM PASSWORD"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        size="small"
                        value={confirm_password}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                    )}
                    <Button variant="contained" color="primary" type="submit">
                        {isSignup ? 'SIGN UP' : 'LOG IN'}
                    </Button>
                    </form>
                </div>
                {isSignup?
                <div onClick={()=>setIsSignup(false)} className="bg-white w-72 mx-auto md:ml-auto md:mr-16 rounded mt-3 p-4 text-center cursor-pointer">
                    LOG IN instead?<ArrowRightAlt/>
                </div>
                :
                <div onClick={()=>setIsSignup(true)} className="bg-white w-72 mx-auto md:ml-auto md:mr-16 rounded mt-3 p-4 text-center cursor-pointer">
                    SIGN UP instead?<ArrowRightAlt/>
                </div>
                }
            </div>
        </>
    )
}

export default Home