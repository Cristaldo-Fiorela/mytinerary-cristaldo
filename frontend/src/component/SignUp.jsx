import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import usersActions from '../redux/actions/usersActions';
import GoogleSignUp from './GoogleSignUp'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';


import '../styles/signUp.css'
import 'react-toastify/dist/ReactToastify.css';


const theme = createTheme();



export default function SignUp() {

    let countries = ["", "Mexico", "England", "United States", "Japan", "Spain", "Argentina", "Corea", "Russia", "Brazil", "France", "Iceland", "Other Country"]
    let orderedCountries = countries.sort()


    //GUARA LOS DATOS QUE PONE EL DATO EN EL FRONT
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [country, setCountry] = React.useState("")
    const [userPhoto, setUserPhoto] = React.useState("")


    const dispatch = useDispatch()

    //
    const handleSubmit = async (event) => {
        event.preventDefault()
        const userData = {
            firstName: firstName,
            lastName: lastName,
            country: country,
            userPhoto: userPhoto,
            email: email,
            password: password,
            from: "form-SignUp"
        }
        const res = await dispatch(usersActions.signUpUsers(userData))
        
        const errorMsg = res.data.message

        if (res.data.from === 'validator') {
            errorMsg.forEach(element => {
                toast.error(element.message)
            })
        }
        if (res.data.from === 'signup')
            if (res.data.success) {
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        

        // VALIDACION

        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setCountry('')
        setUserPhoto('')
    }

    return (
        <div className='containerForm'>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" >
                    <CssBaseline />
                    <Box
                        className='signUpContainer'
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
                                        onChange={e => setFirstName(e.target.value)}
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
                                        onChange={e => setLastName(e.target.value)}
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
                                        onChange={e => setUserPhoto(e.target.value)}
                                        value={userPhoto}
                                        name="userPhoto"
                                        required
                                        fullWidth
                                        id="userPhoto"
                                        label="Photo"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="countries">Country*</InputLabel>
                                        <Select
                                            labelId="countries"
                                            id="demo-simple-select"
                                            value={country}
                                            label="Country"
                                            onChange={e => setCountry(e.target.value)}
                                            fullWidth
                                        >
                                            {orderedCountries.map(everyCountry =>
                                                <MenuItem key={everyCountry} value={everyCountry}> {everyCountry} </MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        onChange={e => setEmail(e.target.value)}
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
                                        onChange={e => setPassword(e.target.value)}
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
                            </Grid>
                            <button
                                className="signInBtn"
                                type="submit"
                                variant="contained"
                            >
                                Sign In
                            </button>
                            <Typography>or</Typography>
                            <Grid container justifyContent="flex-end">
                                <Grid>
                                    <GoogleSignUp />
                                </Grid>
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