import React,{useState} from 'react';
import {Typography,Container,CssBaseline,Box,TextField,Button} from '@mui/material';
import './TestLoginForm.css';

const TestLoginForm = (props) =>{
    const [user,setUser] = useState({
        email:'',
        name:{
            first:'',
            last:''
        },
    })
    const handleSubmit = () =>{
      //submit user values
      if(isUserValid()){
        props.setUser({...user})
      }
    }

    const isUserValid = () =>{
      //checks if user is valid and add error if not
      if(user.email===""){
        props.openNotification("Email cannot be empty");
        return false;
      }
      if(user.name.first===""){
        props.openNotification("First name cannot be empty");
        return false;
      }
      if(user.name.last===""){
        props.openNotification("Last name cannot be empty");
        return false;
      }
      return true;
    }

    const updateUserProperty = (keys, value) => {
      //updates specific property of user
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