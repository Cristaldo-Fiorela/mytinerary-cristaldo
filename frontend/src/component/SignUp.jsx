import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useDispatch } from 'react-redux';
import usersActions from '../redux/actions/usersActions';

import '../styles/signUp.css'

const theme = createTheme();

export default function SignUp() {


    //GUARA LOS DATOS QUE PONE EL DATO EN EL FRONT
    const [firstName,setFirstName] = React.useState("")
    const [lastName,setLastName] = React.useState("")
    const [email,setEmail] = React.useState("")
    const [password,setPassword] = React.useState("")


    const dispatch = useDispatch()

    //
    const handleSubmit = (event) => { 
        event.preventDefault()
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            from: "form-SignUp"
        }
        dispatch(usersActions.signUpUsers(userData))

        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
    }

    return (
        <div className='containerForm'>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <Box
                    className='signInContainer'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>

                    
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={e=>setFirstName(e.target.value)}
                                    value={firstName}
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                                
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={e=>setLastName(e.target.value)}
                                    value={lastName}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={e=>setEmail(e.target.value)}
                                    value={email}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={e=>setPassword(e.target.value)}
                                    value={password}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        
        </div>
    );
}