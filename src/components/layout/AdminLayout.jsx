import { useDispatch } from 'react-redux';
/* eslint-disable react/prop-types */
import CloseIcon from '@mui/icons-material/Close';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Drawer, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { gray } from "../../constants/colors";
import { adminTabs } from '../../constants/route';
import { useLazyAdminLogoutQuery } from '../../redux/api/api';
import { removeAdmin } from '../../redux/reducers/auth';
import { LinkComponent } from "../styles/StyledComponents";


const Sidebar=({w ="100%"})=>{
    const location=useLocation();
    const dispatch=useDispatch();

    const [logoutAdmin]=useLazyAdminLogoutQuery();

    const logoutHandler=()=>{
      logoutAdmin();
      dispatch(removeAdmin());
    }

    return (
      <Stack width={w} p={"3rem"} spacing={"3rem"}>
        <Typography
          textAlign={"center"}
          variant="h4"
          textTransform={"uppercase"}
        >
          Chat App
        </Typography>

        <Stack spacing={"1rem"}>
          {adminTabs.map((tab, i) => (
            <LinkComponent
              key={i}
              to={tab.path}
              sx={
                location.pathname === tab.path && {
                  bgcolor: "black",
                  color: "white",
                  "&:hover": { color:'GrayText',backgroundColor:"black"},
                }
              }
            >
              <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                <tab.icon />
                <Typography fontSize={"1.2rem"}>{tab.name}</Typography>
              </Stack>
            </LinkComponent>
          ))}

            <LinkComponent onClick={logoutHandler}>
              <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                <ExitToAppIcon />
                <Typography fontSize={"1.2rem"}>Logout</Typography>
              </Stack>
            </LinkComponent>

        </Stack>
      </Stack>
    );
}

const AdminLayout = ({children}) => {

    const [mobile,setMobile]=useState(false);

    const handleMobile=()=>{
        setMobile(prev=>!prev);
    }

  return (
    <Grid container minHeight={"100vh"}>
        <Box
          sx={{
            display:{
                xs:"block",
                md:"none"
            },
            position:"fixed",
            top:"1rem",
            right:"1rem"
          }}
        >
            <IconButton onClick={handleMobile}>
                {mobile?<CloseIcon/>:<MenuIcon/>}
            </IconButton>
        </Box>

        <Grid
         item
         md={4}
         lg={3}
         sx={{
            display:{
                xs:"none",
                md:"block"
            }
         }}
         >
            <Sidebar/>
         </Grid>
         
        <Grid item xs={12} md={8} lg={9} sx={{backgroundColor:gray}}>
            {children}
        </Grid>

        <Drawer open={mobile} onClose={handleMobile}>
            <Sidebar w={"50vw"}/>
        </Drawer>

    </Grid>
  )
}

export default AdminLayout