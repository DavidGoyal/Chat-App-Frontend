/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useInfiniteScrollTop } from "6pp";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, Skeleton, Stack } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import FileMenu from '../components/dialog/FileMenu';
import AppLayout from '../components/layout/AppLayout';
import { TypingLoader } from "../components/layout/Loaders.jsx";
import MessageComponent from '../components/shared/MessageComponent';
import { InputBox } from '../components/styles/StyledComponents';
import { gray, pink } from '../constants/colors';
import { ALERT, CHAT_JOINED, CHAT_LEFT, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/events';
import { useErrors, useSocketEvents } from '../hooks/hook.jsx';
import { useGetChatDetailsQuery, useGetMyMessagesQuery } from '../redux/api/api.js';
import { removeNewMessagesAlert } from '../redux/reducers/chat.js';
import { toggleFileMenu } from '../redux/reducers/misc.js';
import { getSocket } from '../socket';



const Chat = ({chatId}) => {
  const {user}=useSelector(state=>state.auth)
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const containerRef=useRef(null)
  const fileRef=useRef(null);
  const bottomRef=useRef(null);

  const socket=getSocket();

  const [message,setMessage]=useState("");
  const [messages,setMessages]=useState([]);
  const [page,setPage]=useState(1);

  const [IamTyping,setIamTyping]=useState(false);
  const [userTyping,setUserTyping]=useState(false);
  const typingTimeout=useRef(null);

  const chatDetails=useGetChatDetailsQuery({chatId,skip:!chatId})
  const oldMessagesChunk=useGetMyMessagesQuery({chatId,page})

  const errorsArrays = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members=chatDetails?.data?.chat?.members;


  const {data:oldMessages,setData:setOldMessages}=useInfiniteScrollTop(containerRef,oldMessagesChunk.data?.totalPages,page,setPage,oldMessagesChunk.data?.messages)

  const allMessages=[...oldMessages,...messages]

  const setMessageHandler=(e)=>{
    setMessage(e.target.value);

    if(!IamTyping){
      socket.emit(START_TYPING,{chatId, members});
      setIamTyping(true);
    }


    if(typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current=setTimeout(()=>{
        socket.emit(STOP_TYPING, {chatId, members});
        setIamTyping(false);
    },[2000])

  }

  const submitHandler=(e)=>{
    e.preventDefault();

    if(!message.trim()) return;

    socket.emit(NEW_MESSAGE,{chatId, members, message}) 
    setMessage("");
  }

  useErrors(errorsArrays);


  const newMessages=useCallback((data)=>{
    if(data.chatId!==chatId) return;
    setMessages((prev)=>[...prev, data.message]);
  },[chatId])


  const startTypingAlert=useCallback((data)=>{
    if(data.chatId!==chatId) return;
    setUserTyping(true);
  },[chatId])


  const stopTypingAlert=useCallback((data)=>{
    if(data.chatId!==chatId) return;
    setUserTyping(false);
  },[chatId])


  const alertListener=useCallback((data)=>{
    if(data.chatId!==chatId) return;

    const messageForAlert={
      content:data.message,
      sender:{
        _id:"ddwd",
        name:"Admin"
      },
      chat:chatId,
      createdAt:new Date().toISOString(),
    }

    setMessages((prev)=>[...prev, messageForAlert]);
  },[chatId])


  const eventHandlers={[NEW_MESSAGE]:newMessages,[START_TYPING]:startTypingAlert,[STOP_TYPING]:stopTypingAlert,[ALERT]:alertListener}


  useSocketEvents(socket, eventHandlers);

  useEffect(() => {
    socket.emit(CHAT_JOINED,{userId:user._id,members});
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessage("");
      setMessages([]);
      setPage(1);
      setOldMessages([]);
      socket.emit(CHAT_LEFT, {userId:user._id,members});
    }
  }, [chatId])


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  useEffect(()=>{
  if(chatDetails.isError) return navigate("/")
  },[chatDetails.isError,navigate])
  
  

  return chatDetails.isLoading?<Skeleton/>: (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        p={"1rem"}
        spacing={"1rem"}
        bgcolor={gray}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >

        {allMessages.map((message)=>(
          <MessageComponent key={message._id} message={message} user={user}/>
        ))}

        {userTyping && <TypingLoader/>}

        <div ref={bottomRef}/>

      </Stack>

      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          p={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton sx={{rotate:"30deg",position:"absolute",left:"1.5rem"}} ref={fileRef} onClick={()=>dispatch(toggleFileMenu(true))}>
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder="Message" value={message} onChange={setMessageHandler}/>

          <IconButton
            type="submit"
            sx={{ 
              backgroundColor: pink,
              color: "white", 
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                backgroundColor: "error.dark",
              },
              position:"absolute",
              right:"1.3rem"
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorEl={fileRef.current} chatId={chatId}/>
    </>
  );
}

export default AppLayout()(Chat)