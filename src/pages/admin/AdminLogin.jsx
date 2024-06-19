import { useInputValidation } from '6pp';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useAdminLoginMutation } from '../../redux/api/api';
import { makeAdmin, removeAdmin } from '../../redux/reducers/auth';

const AdminLogin = () => {
    const dispatch=useDispatch();

    const secretKey=useInputValidation("");
    const [isLoading,setIsLoading]=useState(false);

    const {isAdmin}=useSelector(state=>state.auth)
    const [adminLogin]=useAdminLoginMutation();

    if(isAdmin) return <Navigate to={"/admin/dashboard"}/>

    const adminLoginHandler=async(e)=>{
      e.preventDefault();
      setIsLoading(true);
      const toastId=toast.loading("Logging in..." || "Updating Data...");
      try {
        const res=await adminLogin({secretKey:secretKey.value});

        if(res.data){
          toast.success(res.data.message || "Updated Data Successfully",{id:toastId});
          dispatch(makeAdmin());
        }else{
          toast.error(res?.error?.data?.message || "Something went wrong",{id:toastId});
          dispatch(removeAdmin());
        }
      } 
      catch (error) {
        toast.error(error?.response?.data?.message||"Something Went Wrong",{id:toastId});
        dispatch(removeAdmin());
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

            <Typography variant="h5">Admin Login</Typography>

            <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={adminLoginHandler}>

              <TextField
                required="true"
                fullWidth
                type='password'
                label="Secret Key"
                margin="normal"
                variant="outlined"
                value={secretKey.value}
                onChange={secretKey.changeHandler}
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
            </form>
        
      </Paper>
    </Container>
  )
}

export default AdminLogin