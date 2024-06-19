/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from "@mui/material";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from "../../redux/api/api";
import { toggleNotification } from "../../redux/reducers/misc";
import { resetNotification } from "../../redux/reducers/chat";

const Notifications = () => {
  const dispatch=useDispatch()

  const {isNotification}=useSelector(state=>state.misc)
  const {isLoading,data,isError,error}=useGetNotificationsQuery();
  const [acceptRequest,acceptRequestLoading]=useAsyncMutation(useAcceptFriendRequestMutation);

  const handleNotificationClose=()=>{
    dispatch(toggleNotification(false))
    dispatch(resetNotification());
  }

  const friendRequestHandler=async({_id,accept})=>{
    handleNotificationClose();
    acceptRequest(accept?"Accepting...":"Rejecting...",{requestId:_id,accept})
  }

  useErrors([{isError,error}]);

  return (
    <Dialog open={isNotification} onClose={handleNotificationClose}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle textAlign={"center"}>Notifications</DialogTitle>

        {isLoading?<Skeleton/>:<>
          {data?.allRequests?.length > 0 ? (
          data?.allRequests?.map((i) => (
            <NotificationItem
              key={i._id}
              sender={i.sender}
              _id={i._id}
              handler={friendRequestHandler}
              handlerIsLoading={acceptRequestLoading}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>No Notifications</Typography>
        )}
        </>}
      </Stack>
    </Dialog>
  );
}


export const NotificationItem=memo(({sender,_id,handler,handlerIsLoading})=>{
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={sender.avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          width={"100%"}
        >
          {`${sender.name} sent you a friend request`}
        </Typography>
        <Stack direction={{xs:"column",sm:"row"}}>
          <Button onClick={()=>handler({_id,accept:true})} disabled={handlerIsLoading}>Accept</Button>
          <Button color="error" onClick={()=>handler({_id,accept:false})} disabled={handlerIsLoading}>Decline</Button>
        </Stack>
      </Stack>
    </ListItem>
  );
})

export default Notifications