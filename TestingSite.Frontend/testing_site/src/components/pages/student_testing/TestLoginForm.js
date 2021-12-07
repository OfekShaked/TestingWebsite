import React,{useState} from 'react';
import {Typography,Container,CssBaseline,Box,TextField,Button} from '@mui/material';
import './TestLoginForm.css';

const TestLoginForm = () =>{
    const [user,setUser] = useState({
        email:'',
        name:{
            first:'',
            last:''
        },
    })
    const handleSubmit = () =>{

    }
    const updateUserProperty = (keys, value) => {
        let testToUpdate = { ...test };
        let obj = testToUpdate;
        for (var i = 0; i < keys.length - 1; i++) {
          obj = obj[keys[i]];
        }
        obj[keys[i]] = value;
        setUser(testToUpdate);
      };
    

    return(
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="main-box">
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={user.email}
              onChange={(e)=>updateUserProperty(["email"],e.target.value)}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={user.name.first}
              onChange={(e)=>updateUserProperty(["name","first"],e.target.value)}
              name="firstname"
              label="First Name"
              type="text"
              id="firstname"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={user.name.last}
              onChange={(e)=>updateUserProperty(["name","last"],e.target.value)}
              name="lastname"
              label="Last Name"
              type="text"
              id="lastname"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    )
}

export default TestLoginForm;