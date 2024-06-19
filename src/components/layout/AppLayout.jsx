/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import { Drawer, Grid, Skeleton } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from "../../constants/events";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { getOrSaveNewMessagesAlert } from "../../lib/features";
import { useMyChatsQuery } from "../../redux/api/api";
import { incrementNotification, setNewMessagesAlert } from "../../redux/reducers/chat";
import { setSelectedDeleteChat, toggleDeleteMenu, toggleMobileMenuFriend } from "../../redux/reducers/misc";
import { getSocket } from "../../socket";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import Header from "./Header";
import DeleteChatMenu from "../dialog/DeleteChatMenu";

const AppLayout = () => (WrappedComponent) => {


  return (props) => {
    const params = useParams(); 
    const navigate=useNavigate();
    const chatId=params.chatId;

    const dispatch=useDispatch();  
    const deleteMenuAnchor=useRef(null);

    const [onlineUsers,setOnlineUsers]=useState([]);

    const {isLoading,data,isError,error,refetch}=useMyChatsQuery("")

    const socket=getSocket();

    const {isMobileMenuFriend}=useSelector(state=>state.misc)
    const {newMessagesAlert}=useSelector(state=>state.chat)

    const handleDeleteChat=(e,chatId,groupChat)=>{
      dispatch(toggleDeleteMenu(true));
      dispatch(setSelectedDeleteChat({chatId, groupChat}))
      deleteMenuAnchor.current=e.currentTarget;
    }


    const handleCloseMobile=()=>{
      dispatch(toggleMobileMenuFriend(false))
    }

    useErrors([{isError,error}])


    const newMessageAlert=useCallback((data)=>{
      if(data.chatId!==chatId){
        dispatch(setNewMessagesAlert(data.chatId));
      }
    },[chatId]);


    const newRequest=useCallback(()=>{
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchChats=useCallback(()=>{
      refetch();
      navigate("/");
    }, [refetch,navigate]);

    const onlineUsersListener=useCallback((data)=>{
      setOnlineUsers(data);
    }, []);


    const eventHandlers = {
      [NEW_REQUEST]: newRequest,
      [NEW_MESSAGE_ALERT]: newMessageAlert,
      [REFETCH_CHATS]: refetchChats,
      [ONLINE_USERS]: onlineUsersListener,
    };


    useSocketEvents(socket, eventHandlers);

    useEffect(() => {
      getOrSaveNewMessagesAlert({key:NEW_MESSAGE_ALERT,value:newMessagesAlert,get:false});
    }, [newMessagesAlert])
    

    return isLoading?<Skeleton/>:(
      <>
        <Title />
        <Header />

        <DeleteChatMenu dispatch={dispatch} deleteOptionAnchor={deleteMenuAnchor.current}/>

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobileMenuFriend} onClose={handleCloseMobile}>
            <ChatList
              w="70vw"
              chats={data.chats}
              chatId={chatId}
              newMessagesAlert={newMessagesAlert}
              handleDeleteChat={handleDeleteChat}
              onlineUsers={onlineUsers}
            />
          </Drawer>
        )}

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{ display: { xs: "none", sm: "block" } }}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data.chats}
                chatId={chatId}
                newMessagesAlert={newMessagesAlert}
                handleDeleteChat={handleDeleteChat}
                onlineUsers={onlineUsers}
              />
            )}
          </Grid>

          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} />
          </Grid>

          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
            height={"100%"}
          >
            <Profile />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
