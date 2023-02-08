// REACT - REDUX
import * as React from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link as LinkRouter } from "react-router-dom";

// COMPONENTS
import usersActions from '../redux/actions/usersActions';
import GoogleSignIn from './GoogleSignIn';

// MUI COPONENT
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// STYLES
import '../styles/signUp.css'
import 'react-toastify/dist/ReactToastify.css';



const theme = createTheme();

export default function SignInSide() {

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
                            <img src='https://i.imgur.com/88RQV1o.png' alt='sakura_logo' className='logoSignForm'/>
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
                                color="success"
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
                                color="success"
                                autoComplete="current-password"
                            />
                            <button 
                            className="signInBtn"
                            type="submit"
                            variant="contained"
                            >
                                Sign In
                            </button>
                            <p className='orForm'>or</p>
                            <GoogleSignIn />

                            <Grid container className='callToActionSign'>
                                <Grid item>
                                    <LinkRouter to='/signup' variant="body2" className='underlineNone signRouter'>
                                        Don't have an account? Sign Up
                                    </LinkRouter>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}