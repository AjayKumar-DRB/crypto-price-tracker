// LoginContext.jsx
import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({ ...prevFormData, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
        errors.name = 'Name is required';
    } else if (formData.name.trim().length < 3 || formData.name.trim().length > 30) {
        errors.name = 'Name must be between 3 and 30 characters';
    } else if (!/^[a-zA-Z\s]*$/.test(formData.name.trim())) {
        errors.name = 'Name can only contain letters and spaces';
    }

    if (!formData.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is not valid';
    }

    if (!formData.password.trim()) {
        errors.password = 'Password is required';
    } else if (formData.password.trim().length < 8 || formData.password.trim().length > 16) {
        errors.password = 'Password must be between 8 and 16 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
        errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to handle form submission
  const handleFormSubmit = (event) => {
      event.preventDefault();
      if (validateForm()) {
          handleSubmit(event);
      }
  };


  const serverURL = 'https://goldratecalculator-backend.onrender.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        };
        let response;
        if (isLogin) {
            // Login
            response = await fetch(`${serverURL}/loginUser`, options);
            const data = await response.json();
            if (response.status === 200) {
              // Redirect to '/intro' path after successful login
              localStorage.setItem('token', data.token); // Storing the JWT
              window.location.href = '/intro';
            } else {
              setError(data.error); // Set error message if login fails
            }
        } else {
            // Register
            response = await fetch(`${serverURL}/registerUser`, options); 
            const data = await response.json();
            if (response.status === 201) {
              setOpenSnackbar(true); // Set openSnackbar state to true when registration is successful
            } else {
              setError(data.error); // Set error message if registration fails
            }
        }
    } catch (err) {
        setError(err.message);
    }
  };

  const toggleLoginRegister = () => {
    setIsLogin(!isLogin)
    setError('')
    setFormData({ name: '', email: '', password: '' });
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };


  return (
    <LoginContext.Provider value={{ isLogin, toggleLoginRegister, showPassword, handlePasswordVisibility, error, handleFormSubmit, handleSubmit, formData, validationErrors, handleChange, openSnackbar, setOpenSnackbar, handleCloseSnackbar }}>
      {children}
    </LoginContext.Provider>
  );
};