import { useDispatch } from 'react-redux';
import { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { usernameValidator } from "../utils/Validators";
import axios from "axios";
import { server } from "../constants/config";
import { userExists, userNotExists } from '../redux/reducers/auth';
import toast from 'react-hot-toast';

const Login = () => {
  const dispatch=useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading]=useState(false);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("",usernameValidator);
  const password = useStrongPassword();
  const avatar=useFileHandler("single");

  const handleLogin=async(e)=>{
    e.preventDefault();
    const toastId=toast.loading("Logging in...");

    setIsLoading(true);

    const config={
      withCredentials:true,
      headers:{
        "Content-Type":"application/json"
      }
    }

    try{
      const {data}=await axios.post(`${server}/api/v1/user/login`,{
        username:username.value,
        password:password.value
      },config);

      dispatch(userExists(data.user))
      toast.success(data.message,{id:toastId})
    }catch(err){
      dispatch(userNotExists());
      toast.error(err?.response?.data?.message||"Something went wrong",{id:toastId})
    }
    finally{
      setIsLoading(false);
    }
  } 


  const handleRegister=async(e)=>{
    e.preventDefault();
    const toastId=toast.loading("Registering...");
    setIsLoading(true);

    const formData=new FormData();
    formData.append("name",name.value);
    formData.append("bio",bio.value);
    formData.append("username",username.value);
    formData.append("password",password.value);
    formData.append("avatar",avatar.file);

    try{
      const {data}=await axios.post(`${server}/api/v1/user/new`,formData,{
        withCredentials:true,
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });

      dispatch(userExists(data.user))
      toast.success(data.message,{id:toastId})
    }catch(err){
      dispatch(userNotExists());
      toast.error(err?.response?.data?.message||"Something went wrong",{id:toastId})
    }
    finally{
      setIsLoading(false);
    }
  }

  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        {isLogin ? (
          <>

            <Typography variant="h5">Login</Typography>

            <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={handleLogin}>

              <TextField
                required="true"
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />


              <TextField
                required="true"
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />


              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginTop: "1rem" }}
                fullWidth
                disabled={isLoading}
              >
                Login
              </Button>

              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>

              <Button
                variant="text"
                fullWidth
                onClick={() => setIsLogin(false)}
                disabled={isLoading}
              >
                Sign Up Instead
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Sign Up</Typography>

            <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={handleRegister}>


              <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                <Avatar
                  sx={{ width: "10rem", height: "10rem", objectFit: "contain" }}
                  src={avatar.preview}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    color: "white",
                    bgcolor: "rgba(0,0,0,0.5)",
                    ":hover": {
                      bgColor: "rgba(0,0,0,0.7)",
                    },
                  }}
                  component="label"
                >
                  <>
                    <CameraAltIcon />
                    <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                  </>
                </IconButton>
              </Stack>


              { avatar.error &&
                <Typography width="fit-content" m={"1rem auto"} display={"block"} color={"error"} variant="caption">{avatar.error}</Typography>
              }

              <TextField
                required="true"
                fullWidth
                label="Name"
                margin="normal"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler}
              />

              <TextField
                required="true"
                fullWidth
                label="Bio"
                margin="normal"
                variant="outlined"
                value={bio.value}
                onChange={bio.changeHandler}
              />

              <TextField
                required="true"
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />

              { username.error &&
              <Typography color={"error"} variant="caption">{username.error}</Typography>
              }

              <TextField
                required="true"
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />

              { password.error &&
              <Typography color={"error"} variant="caption">{password.error}</Typography>
              }

              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginTop: "1rem" }}
                fullWidth
                disabled={isLoading}
              >
                Sign Up
              </Button>

              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>

              <Button variant="text" fullWidth onClick={() => setIsLogin(true)} disabled={isLoading}>
                Login Instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
