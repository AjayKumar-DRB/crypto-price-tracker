import React from 'react';
import { useLoginContext } from './LoginContext';
import './Login.css'; // Import CSS file here
import { Container, Grid, Typography, TextField} from '@mui/material'; // Import necessary components from Material-UI
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Login = () => {
    const {  isLogin, toggleLoginRegister, showPassword, error, handleFormSubmit, handleSubmit, formData, validationErrors, handleChange, handlePasswordVisibility, openSnackbar, setOpenSnackbar  } = useLoginContext();

    const handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenSnackbar(false);
    };
    

    return (
<div className='LoginRegisterBody'>
            <Container>
                <Grid container justifyContent="center" alignItems="center">
                    {isLogin ? (
                        <Grid container spacing={2} className='box sign-in d-flex justify-content-center align-items-center w-75 my-0 mx-1'>
                            {/* Login Form */}
                            <Grid item xs={12} sm={7} sx={{ padding: '16px' }}>
                                <form onSubmit={handleSubmit}>
                                    <Typography className='ps-2' variant="h4">Sign In</Typography>
                                    <TextField
                                        className='textField'
                                        label="Email"
                                        type="email"
                                        autoComplete="email"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={validationErrors.email}
                                        helperText={validationErrors.email}
                                    />
                                        <TextField
                                        type={showPassword ? 'text' : 'password'}
                                        label="Password"
                                        InputProps={{
                                            endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                onClick={handlePasswordVisibility}
                                                edge="end"
                                                >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                            ),
                                        }}
                                        className='textField'
                                        autoComplete="current-password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={validationErrors.password}
                                        helperText={validationErrors.password}
                                        />
                                    <button type="submit" variant="outlined" className="btn btn-outline-dark py-2 px-4 mt-2">Sign In</button>
                                    {error && <Typography color="error">{error}</Typography>}
                                </form>
                            </Grid>
                            {/* Registration Redirect */}
                            <Grid item xs={12} sm={5} className='text-right h-100'>
                                <div className="p-4 d-flex flex-column justify-content-center align-items-center">
                                    <Typography variant="h4">Hello, Friend!</Typography>
                                    <Typography className='text-center' variant="body1">Register with your personal details to use all site features</Typography>
                                    <button onClick={toggleLoginRegister} variant="outlined" className="btn btn-outline-light p-2 mt-3">Sign Up</button>
                                </div>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={2} className='box sign-up d-flex justify-content-center align-items-center flex-row-reverse w-75 m-2'>
                            {/* Registration Form */}
                            <Grid item xs={12} sm={7} sx={{ padding: '16px' }}>
                                <form onSubmit={handleFormSubmit}>
                                    <Typography className='ps-2' variant="h4">Create Account</Typography>
                                    <TextField
                                        className='textField'
                                        label="Name"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        error={validationErrors.name}
                                        helperText={validationErrors.name}
                                    />
                                    <TextField
                                        className='textField'
                                        label="Email"
                                        type="email"
                                        autoComplete="email"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={validationErrors.email}
                                        helperText={validationErrors.email}
                                    />
                                    <TextField
                                        type={showPassword ? 'text' : 'password'}
                                        label="Password"
                                        InputProps={{
                                            endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                onClick={handlePasswordVisibility}
                                                edge="end"
                                                >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                            ),
                                        }}
                                        className='textField'
                                        autoComplete="current-password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={validationErrors.password}
                                        helperText={validationErrors.password}
                                        />
                                    <button type="submit" variant="outlined" className="btn btn-outline-dark py-2 px-4 mt-2">Sign Up</button>
                                    {error && <Typography color="error">{error}</Typography>}
                                </form>
                            </Grid>
                            {/* Login Redirect */}
                            <Grid item xs={12} sm={5} className='text-left h-100 px-4'>
                                <div className="p-4 d-flex flex-column justify-content-center align-items-center">
                                    <Typography className='text-center' variant="h4">Welcome Back!</Typography>
                                    <Typography className='text-center' variant="body1">Enter your personal details to use all site features</Typography>
                                    <button onClick={toggleLoginRegister} variant="outlined" className="btn btn-outline-light p-2 mt-3">Sign In</button>
                                </div>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Container>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
                    Registration Successful!  Please Log in to Continue.
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default Login;