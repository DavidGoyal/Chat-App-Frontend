/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { pink } from '../../constants/colors'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Suspense, lazy} from 'react';
import { server } from '../../constants/config';
import { userNotExists } from '../../redux/reducers/auth';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toggleMobileMenuFriend, toggleNewGroup, toggleNotification, toggleSearch } from '../../redux/reducers/misc';

const Search = lazy(()=>import('../specific/Search'));
const Notification = lazy(()=>import('../specific/Notifications'));
const NewGroup= lazy(()=>import('../dialog/NewGroups'));


const Header = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const {isSearch,isNotification,isNewGroup}=useSelector(state=>state.misc)
  const {notificationsCount}=useSelector(state=>state.chat);


  const menuHandler=()=>{
    dispatch(toggleMobileMenuFriend(true));
  }

  const searchHandler=()=>{
    dispatch(toggleSearch(true))
  }

  const addGroupHandler=()=>{
    dispatch(toggleNewGroup(true))
  }

  const groupHandler=()=>{
    navigate("/groups");
  }

  const notificationHandler=()=>{
    dispatch(toggleNotification(true))
  }


  const logoutHandler=async()=>{
    try {
      const {data}=await axios.get(`${server}/api/v1/user/logout`,{withCredentials:true})

      dispatch(userNotExists());
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }


  return (
    <>
    <Box sx={{flexGrow:1}} height={"4rem"}>
      <AppBar position='static' sx={{bgcolor:pink}}>
        <Toolbar>
          <Typography variant='h6' sx={{ display: { xs: "none", sm: "block" } }}>Chat App</Typography>

          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconBtn title={"Menu"} onClick={menuHandler} icon={<MenuIcon/>}/>
          </Box>

          <Box sx={{flexGrow:1}}></Box>

          <Box>
            <IconBtn title={"Search"} onClick={searchHandler} icon={<SearchIcon/>}/>
          </Box>

          <IconBtn title={"New Group"} onClick={addGroupHandler} icon={<AddIcon/>}/>

          <IconBtn title={"Manage Groups"} onClick={groupHandler} icon={<GroupIcon/>}/>

          <IconBtn title={"Notifications"} onClick={notificationHandler} icon={<NotificationsIcon/>} value={notificationsCount}/>

          <IconBtn title={"Logout"} onClick={logoutHandler} icon={<LogoutIcon/>}/>

        </Toolbar>
      </AppBar>
    </Box>

    {isSearch&&
      <Suspense fallback={<Backdrop open/>}>
        <Search/>
      </Suspense>
    }


    {isNewGroup&&
      <Suspense fallback={<Backdrop open/>}>
        <NewGroup/>
      </Suspense>
    }

    {isNotification&&
      <Suspense fallback={<Backdrop open/>}>
        <Notification/>
      </Suspense>
    }

    </>
  )
}

const IconBtn=({title,onClick,icon,value})=>(
  <Tooltip title={title}>
    <IconButton size='large' color='inherit' onClick={onClick}>
      {value?<Badge badgeContent={value} color='error'>{icon}</Badge>:icon}
    </IconButton>
  </Tooltip>
)


export default Header