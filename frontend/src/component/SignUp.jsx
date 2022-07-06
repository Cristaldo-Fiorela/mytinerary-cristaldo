// React - redux
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link as LinkRouter } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

// OWN COMPONENTS
import usersActions from '../redux/actions/usersActions';
import GoogleSignUp from './GoogleSignUp'

// TOASTER COMPONENT
import { toast } from 'react-toastify';

// MUI COMPONENT
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// STYLES   
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
    const navigate = useNavigate()
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
            errorMsg.forEach(element => { //la respuesta del formulario vuelve en formato array por lo danto tiene que utilizarse el metodo forEach
                toast.error(element.message)
            })
        }
        if (res.data.from === 'signup')
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/SignIn')
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
                            <img src={process.env.PUBLIC_URL + "/assets/pinkLogo.png"} alt='sakura_logo' className='logoSignForm'/>

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
                                        color="success"
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
                                        color="success"
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
                                        color="success"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel color="success" id="countries">Country*</InputLabel>
                                        <Select
                                            labelId="countries"
                                            id="demo-simple-select"
                                            value={country}
                                            label="Country"
                                            onChange={e => setCountry(e.target.value)}
                                            fullWidth
                                            color="success"
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
                                        color="success"
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
                                        color="success"
                                    />
                                </Grid>
                            </Grid>
                            <button
                                className="signInBtn"
                                type="submit"
                                variant="contained"
                            >
                                Sign Up
                            </button>
                            <p className='orForm'>or</p>
                            <GoogleSignUp />
                            <Grid container justifyContent="flex-end" className='callToActionSign'>
                                <Grid item>
                                    <LinkRouter to='/signin' variant="body2" className='underlineNone signRouter'>
                                        Already have an account? Sign in
                                    </LinkRouter>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>

        </div>
    );
}