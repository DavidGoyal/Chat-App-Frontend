/* eslint-disable react/prop-types */
import { Stack } from '@mui/material';
import ChatItem from '../shared/ChatItem';

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
      {
       chatId: "",
       count: 0 
      }
    ],
  handleDeleteChat,
}) => {
  return <Stack width={w} direction={'column'} overflow={"auto"} height={"100%"}>
    {chats&&chats.map((data,index)=>{
      
      const { _id, name, avatar, groupChat, members } = data;

      const newMessageAlert=newMessagesAlert.find((item)=>item.chatId===_id)

      const isOnline=members?.some((member)=>onlineUsers.includes(member))

      return (
        <ChatItem
          key={index}
          avatar={avatar}
          name={name}
          _id={_id}
          groupChat={groupChat}
          index={index}
          newMessageAlert={newMessageAlert}
          isOnline={isOnline}
          sameSender={chatId === _id}
          handleDeleteChat={handleDeleteChat}
        />
      );
    })}
  </Stack>;
};

export default ChatList