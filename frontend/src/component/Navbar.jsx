import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link as LinkRouter } from 'react-router-dom';


import '../styles/navbar.css'

const pages = [
    {
        to: '/',
        name : 'Home'
    },
    {
        to:  '/Cities',
        name : 'Cities'
    }
];

const settings = [
    {
        to: '/SignIn',
        name: 'Sign In'
    }, 
    {
        to: '/SignUp',
        name: 'Sign Up'
    }];

const ResponsiveAppBar = () => {

    
    const ScrollToTop = () =>  {
        window.scroll({
            top: 0,
            behavior: "smooth",
            left:0
        })
    }

    const [anchorElNav, setAnchorElNav] = React.useState(null); // componente funcional con hook
    const [anchorElUser, setAnchorElUser] = React.useState(null); // escuchar el cambio de estado, el valor "null" hace referencia al valor q va a pasar

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => { 
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => { 
        setAnchorElUser(null);
    };

    return (
        <AppBar position="sticky" className='navbar-color'>
            <Container maxWidth="xl">
                <Toolbar  disableGutters>

                    {/* chiquito */}

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <img src={process.env.PUBLIC_URL+"/assets/logo.png"} alt="logo" style={{height: "4rem"}} />
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page, index) => (
                                <LinkRouter to={page.to}
                                key={index} 
                                onClick={handleCloseNavMenu}
                                className='underlineNone colorMenu'
                                >
                                    <MenuItem>
                                        <Typography onClick={ScrollToTop}  textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                </LinkRouter>

                            ))}
                        </Menu>
                    </Box>

                    {/* MEDIANO */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <img src={process.env.PUBLIC_URL+"/assets/logo.png"} alt="logo" style={{height: "4rem"}} />
                        {pages.map((page, index) => (
                            <LinkRouter 
                            to={page.to}
                            key={index}
                            onClick={handleCloseNavMenu}
                            className='underlineNone '
                            >
                                <Button onClick={ScrollToTop} sx={{ my: 2, color: 'white', display: 'block' }}>
                                {page.name}
                                </Button>
                            </LinkRouter>

                        ))}
                    </Box>

                    {/* MENU HAMBURGUESA */}

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircleIcon style={{color: "#F2F2F2"}} fontSize="large"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((page, index) => (
                                <LinkRouter
                                to={page.to}
                                key={index}
                                onClick={handleCloseUserMenu}
                                className='underlineNone colorMenu' 
                                >
                                    <MenuItem>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                </LinkRouter>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
