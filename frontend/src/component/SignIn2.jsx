import { React, useState } from "react"
import TextField from '@mui/material/TextField';
import { FormControl} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box } from "@mui/system";


import '../styles/signIn.css'


function SignIn() {

    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        });
    };

    return (
        <div className="flexboxDiv">

            <div className="signInContainer">
                <div className="waveBg">
                    <h3>Hello Friend!</h3>
                    <h4>Ready for another adventure?</h4>
                </div>

                    <Box className='boxTextField' component="form" onSubmit={handleSubmit} noValidate >

                        <TextField
                            label="Email"
                            onChange={handleChange}
                            autoComplete="email"
                            id="email"
                            name="email"
                            autoFocus
                        />

                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </Box>
                    <p>Forgot your pasword?</p>

                    <button className="signInBtn">
                        Sign In
                    </button>

            </div>
        </div>
    )
}

export default SignIn