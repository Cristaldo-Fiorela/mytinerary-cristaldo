import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import usersActions from '../redux/actions/usersActions';
import { toast } from 'react-toastify';
import GoogleSignIn from './GoogleSignIn';



import '../styles/signUp.css'
import 'react-toastify/dist/ReactToastify.css';



const theme = createTheme();

export default function SignInSide() {


    //GUARA LOS DATOS QUE PONE EL DATO EN EL FRONT
        const [email,setEmail] = React.useState("")
        const [password,setPassword] = React.useState("")
    
    
        const dispatch = useDispatch()
    
        const handleSubmit = async (event) => { 
            event.preventDefault()
            const loggedUser = {
                email: email,
                password: password,
                from: 'form-SignUp'
            }
            const res = await dispatch(usersActions.signInUser(loggedUser))
            console.log(res)

            if (res.data.success) {
                    toast.success(res.data.message)
                } else {
                    toast.error(res.data.message)
                }

            setEmail('')
            setPassword('')
        }
        

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '77vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://cutewallpaper.org/25/anime-kawaii-pastel-wallpaper/149832615.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: '60%',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                onChange={e=>setEmail(e.target.value)}
                                value={email}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                color="secondary"
                                autoFocus
                            />
                            <TextField
                                onChange={e=>setPassword(e.target.value)}
                                value={password}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                color="secondary"
                                autoComplete="current-password"
                            />
                            <button 
                            className="signInBtn"
                            type="submit"
                            variant="contained"
                            >
                                Sign In
                            </button>
                            <GoogleSignIn />
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}