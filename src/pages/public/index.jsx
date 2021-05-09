import {useState} from 'react'
import {ArrowRightAlt} from '@material-ui/icons'
import {TextField, Button} from '@material-ui/core'
import cookies from 'js-cookies'
import {userLogin, userRegister} from '../../helpers/authHelper'
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../../components/spinner'

import logo from '../../assets/logo-white.png'

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
    const [loading, setLoading] = useState(false)

    const loginHandler = async(e) => {
        e.preventDefault()
        setWarning('')
        setSuccess('')
        setLoading(true)

        const res = await userLogin({username, password})
        console.log(res);
        if (res.status === 200)  
            cookies.setItem('exUser', true, { expires: 7 })
            cookies.setItem('token', res.data.auth_token)
            cookies.setItem('user', JSON.stringify(res.data))
            window.location = "/albums"
        if (res.status === 400)
            setWarning('Unable to login with provided credentials!')
    }
    const registerHandler = async(e) => {
        e.preventDefault()
        setWarning('')
        setSuccess('')
        setLoading(true)

        const res = await userRegister({username, email, password, confirm_password})
        if (res.status === 201)
            setSuccess("User Created Successfully!");
            setLoading(false)
        if (res.status === 400){
            let error
            for (error in res.data)
                setWarning(res.data[error]);
        }
    }   

    return (
        <>
            <div className="bg-gray-300 flex flex-col md:flex-row justify-center md:justify-between items-center h-screen landing-bg py-5 md:p-16">
                <div className="text-center mx-auto text-white self-end">
                    <img className="w-32 md:w-52 mx-auto md:mb-4" src={logo} alt="Logo" />
                    <h1 className="text-xl md:text-3xl font-bold mb-4">The home of your memories</h1>
                </div>
                <div className="flex flex-col justify-center items-center md:bg-black md:bg-opacity-75 md:h-screen md:w-1/2 md:-mr-16 md:pr-16 md:pl-8 lg:pl-0">
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
                        <Button variant="contained" color="primary" type="submit" disabled={loading}>
                            {loading &&<Spinner/>} {isSignup ? 'SIGN UP' : 'LOG IN'}
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
            </div>
        </>
    )
}

export default Home