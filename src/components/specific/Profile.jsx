/* eslint-disable react/prop-types */
import { Avatar, Stack, Typography } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face';
import UserNameIcon from '@mui/icons-material/AccountCircle';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { transformImage } from '../../lib/features';

const Profile = () => {
  const {user}=useSelector(state=>state.auth)
  
  return (
    <Stack spacing={"2rem"} alignItems={"center"}>
      <Avatar 
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
        src={transformImage(user.avatar.url)}
      />
      <ProfileCard text={"Bio"} heading={user.bio} />
      <ProfileCard text={"Username"} heading={user.username} Icon={<UserNameIcon/>}/>
      <ProfileCard text={"Name"} heading={user.name} Icon={<FaceIcon/>} />
      <ProfileCard text={"Joined"} heading={moment(user.createdAt).fromNow()} Icon={<CalendarIcon/>} />
    </Stack>
  )
}

const ProfileCard=({text,Icon,heading})=>(
  <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} color={"white"} textAlign={"center"}>
    {Icon && Icon}

    <Stack>
      <Typography variant='body1'>{text}</Typography>
      <Typography color={"gray"} variant='caption'>{heading}</Typography>
    </Stack>

  </Stack>
)

export default Profile