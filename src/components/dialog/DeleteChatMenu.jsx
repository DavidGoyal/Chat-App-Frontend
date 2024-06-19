/* eslint-disable react/prop-types */
import { Menu, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { toggleDeleteMenu } from '../../redux/reducers/misc';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useAsyncMutation } from '../../hooks/hook';
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api';
import { useEffect } from 'react';

const DeleteChatMenu = ({dispatch,deleteOptionAnchor}) => {
    const {isDeleteMenu,selectedDeleteChat}=useSelector(state=>state.misc);
    const navigate=useNavigate();

    const [deleteChat,_,deleteChatData]=useAsyncMutation(useDeleteChatMutation);
    const [leaveGroup,__,leaveGroupData]=useAsyncMutation(useLeaveGroupMutation);

    const closeHandler=()=>{
        dispatch(toggleDeleteMenu(false));
        deleteOptionAnchor=null;
    }

    const leaveGroupHandler=()=>{
        closeHandler();
        leaveGroup("Leaving the group", selectedDeleteChat.chatId);
    }

    const deleteChatHandler=()=>{
        closeHandler();
        deleteChat("Deleting the chat",selectedDeleteChat.chatId);
    }

    useEffect(() => {
      if(deleteChatData){
        navigate("/");
      }

      if(leaveGroupData){
        navigate("/");
      }
    }, [deleteChatData,navigate,leaveGroupData])
    


  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteOptionAnchor}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "center", horizontal: "center" }}
    >
      <Stack
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={selectedDeleteChat.groupChat?leaveGroupHandler:deleteChatHandler}
      >
        {selectedDeleteChat.groupChat?<><ExitToAppIcon/> <Typography>Leave Group</Typography></>:<><DeleteIcon/> <Typography>Delete Chat</Typography></>}
      </Stack>
    </Menu>
  );
}

export default DeleteChatMenu