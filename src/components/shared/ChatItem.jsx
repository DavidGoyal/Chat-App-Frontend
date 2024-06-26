/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { memo } from 'react'
import { LinkComponent } from '../styles/StyledComponents'
import AvatarCard from './AvatarCard'

const ChatItem = ({
  avatar=[],
  name,
  _id,
  groupChat=false,
  sameSender,
  isOnline,
  newMessageAlert,
  index=0,
  handleDeleteChat
}) => {
  return (
    <LinkComponent to={`/chat/${_id}`} onContextMenu={(e)=>handleDeleteChat(e,_id,groupChat)} sx={{padding:"0"}}>
      <motion.div
      initial={{opacity:0,y:"-100%"}}
      whileInView={{opacity:1,y:"0%"}}
      transition={{delay:index*0.1}}
       style={{
        display:"flex",
        alignItems:"center",
        gap:"1rem",
        padding:"1rem",
        backgroundColor:sameSender ? "black" : "unset",
        color:sameSender ? "white" : "unset",
        position:"relative"
      }}>

        <AvatarCard avatar={avatar}/>

        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert&&<Typography>{newMessageAlert.count} New Message</Typography>}
        </Stack>

        {isOnline&&<Box sx={{
          width:"10px",
          height:"10px",
          borderRadius:"50%",
          backgroundColor:"green",
          position:"absolute",
          top:"50%",
          right:"1rem",
          transform:"translateY(-50%)",
        }}></Box>}

      </motion.div>
    </LinkComponent>
  )
}

export default memo(ChatItem)